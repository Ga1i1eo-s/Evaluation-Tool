import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useChat } from '../../hooks/useChat';
import { Send, Copy, RotateCcw, ThumbsUp, ThumbsDown, User } from 'lucide-react';

export function ChatInput() {
  const [input, setInput] = useState('');
  const { addMessage, setCurrentResponse, clearCurrentResponse } = useStore();
  const { sendMessage } = useChat();

  const handleSend = async () => {
    if (!input.trim()) return;

    addMessage({
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    });

    const prompt = input;
    setInput('');
    clearCurrentResponse();

    await sendMessage(prompt);
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <button className="p-2 hover:bg-gray-100 rounded">
          <Copy className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded">
          <RotateCcw className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded">
          <ThumbsUp className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded">
          <ThumbsDown className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="flex items-end gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Reply to Claude..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <select className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
          <option>Claude 3.5 Sonnet ▾</option>
        </select>

        <button
          onClick={handleSend}
          className="p-3 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <User className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  );
}
