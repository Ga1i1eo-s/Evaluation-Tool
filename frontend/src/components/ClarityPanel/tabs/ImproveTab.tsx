import { useStore } from '../../../store/useStore';

export function ImproveTab() {
  const { evaluation } = useStore();

  if (!evaluation) return null;

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold mb-4">Suggested Follow-up Prompts</h2>
      {evaluation.suggestedPrompts.map((prompt, index) => (
        <button
          key={index}
          className="w-full p-4 text-left bg-white border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
        >
          <p className="text-sm text-gray-700">{prompt}</p>
        </button>
      ))}
    </div>
  );
}
