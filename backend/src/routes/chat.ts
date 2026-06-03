import { Router, Request, Response } from 'express';
import { streamClaudeResponse, getClaudeResponse } from '../services/claude';
import { evaluateResponse } from '../services/evaluator';
import { ChatRequest, ConfidenceRequest, Message } from '../types';

const router = Router();

router.post('/chat', async (req: Request, res: Response) => {
  const { prompt, conversationHistory }: ChatRequest = req.body;

  console.log('Received chat request:', { prompt, conversationHistoryLength: conversationHistory?.length });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const messages: Message[] = [
    ...conversationHistory,
    {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: Date.now(),
    },
  ];

  try {
    console.log('Starting to stream response from Groq...');
    const fullResponse = await streamClaudeResponse(messages, (chunk) => {
      console.log('Sending chunk:', chunk.substring(0, 50));
      res.write(`event: chunk\ndata: ${JSON.stringify(chunk)}\n\n`);
    });

    console.log('Full response received:', fullResponse.substring(0, 100));
    res.write(`event: done\ndata: ${JSON.stringify({ fullResponse })}\n\n`);

    console.log('Starting evaluation...');
    const evaluation = await evaluateResponse(prompt, fullResponse, conversationHistory);
    console.log('Evaluation completed');
    res.write(`event: evaluation\ndata: ${JSON.stringify(evaluation)}\n\n`);

    res.end();
  } catch (error) {
    console.error('Chat error:', error);
    res.write(`event: error\ndata: ${JSON.stringify({ message: 'Failed to process request', error: String(error) })}\n\n`);
    res.end();
  }
});

router.post('/confidence', (req: Request, res: Response) => {
  const { rating, responseId }: ConfidenceRequest = req.body;
  
  // Store in memory for now (no database)
  console.log(`User confidence rating: ${rating} for response ${responseId}`);
  
  res.json({ success: true, rating, responseId });
});

export default router;
