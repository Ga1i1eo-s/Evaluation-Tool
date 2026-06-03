import { useCallback } from 'react';
import { useStore } from '../store/useStore';
import { Message } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function useChat() {
  const {
    messages,
    addMessage,
    setCurrentResponse,
    setEvaluation,
    setIsStreaming,
    setIsEvaluating,
    clearCurrentResponse,
  } = useStore();

  const sendMessage = useCallback(
    async (prompt: string) => {
      setIsStreaming(true);
      setIsEvaluating(false);
      clearCurrentResponse();

      try {
        const response = await fetch(`${API_URL}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            conversationHistory: messages,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error('No reader available');
        }

        let fullResponse = '';
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('event: chunk')) {
              const nextLine = lines[i + 1]?.trim();
              if (nextLine?.startsWith('data: ')) {
                const data = JSON.parse(nextLine.slice(6));
                fullResponse += data;
                setCurrentResponse(fullResponse);
              }
            } else if (line.startsWith('event: evaluation')) {
              const nextLine = lines[i + 1]?.trim();
              if (nextLine?.startsWith('data: ')) {
                const evaluation = JSON.parse(nextLine.slice(6));
                setEvaluation(evaluation);
              }
            } else if (line.startsWith('event: done')) {
              setIsStreaming(false);
              setIsEvaluating(true);
            }
          }
        }

        addMessage({
          id: Date.now().toString(),
          role: 'assistant',
          content: fullResponse,
          timestamp: Date.now(),
        });

        setIsEvaluating(false);
      } catch (error) {
        console.error('Error sending message:', error);
        setIsStreaming(false);
        setIsEvaluating(false);
      }
    },
    [messages, addMessage, setCurrentResponse, setEvaluation, setIsStreaming, setIsEvaluating, clearCurrentResponse]
  );

  return { sendMessage, messages };
}
