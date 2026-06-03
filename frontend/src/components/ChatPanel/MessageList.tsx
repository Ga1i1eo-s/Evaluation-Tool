import { useStore } from '../../store/useStore';
import { AnnotatedResponse } from './AnnotatedResponse';

export function MessageList() {
  const { messages, currentResponse, showAnnotations, evaluation } = useStore();

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {messages.map((message) => (
        <div key={message.id} className="mb-6">
          {message.role === 'user' ? (
            <div>
              <p className="text-xs text-gray-500 mb-1">PROMPT</p>
              <p className="text-gray-900">{message.content}</p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-gray-500 mb-1">CLAUDE RESPONSE</p>
              <AnnotatedResponse 
                content={message.content} 
                showAnnotations={showAnnotations}
                annotations={evaluation?.inlineAnnotations || []}
              />
            </div>
          )}
        </div>
      ))}

      {currentResponse && (
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-1">CLAUDE RESPONSE</p>
          <AnnotatedResponse 
            content={currentResponse} 
            showAnnotations={showAnnotations}
            annotations={evaluation?.inlineAnnotations || []}
          />
        </div>
      )}
    </div>
  );
}
