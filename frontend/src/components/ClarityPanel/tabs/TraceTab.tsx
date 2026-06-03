import { useStore } from '../../../store/useStore';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export function TraceTab() {
  const { evaluation } = useStore();

  if (!evaluation) return null;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold mb-4">Evaluation Trace</h2>
      {evaluation.evaluationTrace.map((step, index) => (
        <div key={index} className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg">
          <div className="mt-0.5">
            {step.dimension === 'correctness' ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : step.dimension === 'reasoningQuality' ? (
              <Info className="w-5 h-5 text-blue-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-500" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{step.step}</p>
            <p className="text-sm text-gray-600 mt-1">{step.result}</p>
            <p className="text-xs text-gray-400 mt-1">Dimension: {step.dimension}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
