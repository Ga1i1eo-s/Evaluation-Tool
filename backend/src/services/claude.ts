import dotenv from 'dotenv';
dotenv.config();

import Groq from 'groq-sdk';
import { Message } from '../types';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function streamClaudeResponse(
  messages: Message[],
  onChunk: (chunk: string) => void
): Promise<string> {
  const fullResponse: string[] = [];

  const stream = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    })),
    stream: true,
    max_tokens: 4096,
  });

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content || '';
    if (text) {
      fullResponse.push(text);
      onChunk(text);
    }
  }

  return fullResponse.join('');
}

export async function getClaudeResponse(
  messages: Message[]
): Promise<string> {
  const response = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    })),
    max_tokens: 4096,
  });

  return response.choices[0]?.message?.content || '';
}
