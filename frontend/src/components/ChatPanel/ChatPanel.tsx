import { useStore } from '../../store/useStore';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { ConfidenceDots } from '../shared/ConfidenceDots';
import { Asterisk, Info } from 'lucide-react';

export function ChatPanel() {
  const { 
    messages, 
    currentResponse, 
    isStreaming, 
    userConfidence, 
    setUserConfidence,
    showAnnotations,
    setShowAnnotations 
  } = useStore();

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Asterisk className="w-5 h-5 text-orange-500" />
          <span className="font-semibold">Claude</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show reasoning texture</span>
          <button
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              showAnnotations ? 'bg-purple-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                showAnnotations ? 'translate-x-5' : ''
              }`}
            />
          </button>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <MessageList />
        
        {isStreaming && userConfidence === null && currentResponse && (
          <div className="px-4 py-4">
            <p className="text-xs text-gray-500 mb-2">How confident are you in this response?</p>
            <ConfidenceDots rating={userConfidence} onRate={setUserConfidence} />
          </div>
        )}
      </div>

      <ChatInput />
    </div>
  );
}
