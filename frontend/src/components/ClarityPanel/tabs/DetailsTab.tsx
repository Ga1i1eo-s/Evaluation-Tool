import { useStore } from '../../../store/useStore';

export function DetailsTab() {
  const { evaluation } = useStore();

  if (!evaluation) return null;

  const dimensions = [
    { key: 'correctness', name: 'Correctness' },
    { key: 'completeness', name: 'Completeness' },
    { key: 'reasoningQuality', name: 'Reasoning Quality' },
    { key: 'usefulness', name: 'Usefulness' },
    { key: 'uncertainty', name: 'Uncertainty' },
  ];

  return (
    <div className="p-4 space-y-6">
      {dimensions.map((dim) => {
        const dimension = evaluation.dimensions[dim.key as keyof typeof evaluation.dimensions];
        return (
          <section key={dim.key} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">{dim.name}</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Score: {dimension.score}/5</p>
                <p className="text-sm text-gray-600">{dimension.summary}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Detailed Analysis</p>
                <p className="text-sm text-gray-600">{dimension.detail}</p>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
