import dotenv from 'dotenv';
dotenv.config();

import Groq from 'groq-sdk';
import { EvaluationResult, Message } from '../types';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const EVALUATION_SYSTEM_PROMPT = `You are an expert AI output evaluator. Analyze the AI response below and return ONLY a valid JSON object with this exact structure:

{
  "overallConfidence": "High" | "Moderate" | "Low",
  "overallSummary": "one sentence summary",
  "dimensions": {
    "correctness": { 
      "score": 1-5, 
      "label": "High"|"Medium"|"Low",
      "summary": "brief one-line summary",
      "detail": "2-3 sentence detailed explanation"
    },
    "completeness": { same structure },
    "reasoningQuality": { same structure },
    "usefulness": { same structure },
    "uncertainty": { same structure }
  },
  "keyFindings": {
    "assumptions": [
      { 
        "text": "quote from response that is an assumption",
        "explanation": "why this is an assumption and its risk",
        "spanText": "exact substring from response to underline"
      }
    ],
    "informationGaps": [
      { "gap": "description of missing info", "importance": "High"|"Medium"|"Low" }
    ],
    "risks": [
      { "risk": "description", "mitigation": "what user should do" }
    ],
    "strongPoints": [
      { "point": "description", "spanText": "exact substring" }
    ]
  },
  "suggestedPrompts": [
    "Follow-up prompt 1 to fill a gap",
    "Follow-up prompt 2 to verify an assumption", 
    "Follow-up prompt 3 to get more detail"
  ],
  "evaluationTrace": [
    { "step": "Checked factual claims", "result": "3 unverified statistics found", "dimension": "correctness" },
    { "step": "Assessed logical flow", "result": "Reasoning is generally sound", "dimension": "reasoningQuality" }
  ],
  "inlineAnnotations": [
    {
      "spanText": "exact substring from response to annotate",
      "type": "assumption" | "statistic" | "uncertain" | "strong",
      "tooltip": "tooltip text to show on hover"
    }
  ]
}

The original prompt was: {{PROMPT}}
The AI response to evaluate: {{RESPONSE}}
`;

export async function evaluateResponse(
  prompt: string,
  response: string,
  conversationHistory: Message[]
): Promise<EvaluationResult> {
  const evaluationPrompt = EVALUATION_SYSTEM_PROMPT
    .replace('{{PROMPT}}', prompt)
    .replace('{{RESPONSE}}', response);

  const evaluationResponse = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: evaluationPrompt,
      },
    ],
  });

  const content = evaluationResponse.choices[0]?.message?.content;
  if (!content) {
    throw new Error('Evaluation response is empty');
  }

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not extract JSON from evaluation response');
  }

  const evaluation: EvaluationResult = JSON.parse(jsonMatch[0]);
  return evaluation;
}
