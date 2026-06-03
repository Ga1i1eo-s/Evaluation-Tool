import { useStore } from '../../../store/useStore';
import { Badge } from '../../shared/Badge';
import { DimensionRow } from '../DimensionRow';
import { FindingCard } from '../FindingCard';
import { ConfidenceCalibration } from '../ConfidenceCalibration';
import { ShieldCheck, Clipboard, Brain, Lightbulb, Gauge } from 'lucide-react';

export function OverviewTab() {
  const { evaluation, userConfidence } = useStore();

  if (!evaluation) return null;

  const dimensions = [
    { key: 'correctness', name: 'Correctness', description: 'Factual accuracy', icon: ShieldCheck },
    { key: 'completeness', name: 'Completeness', description: 'Coverage of topic', icon: Clipboard },
    { key: 'reasoningQuality', name: 'Reasoning Quality', description: 'Logical coherence', icon: Brain },
    { key: 'usefulness', name: 'Usefulness', description: 'Practical value', icon: Lightbulb },
    { key: 'uncertainty', name: 'Uncertainty', description: 'Confidence level', icon: Gauge },
  ];

  const confidenceColor = evaluation.overallConfidence === 'High' ? 'high' : 
                          evaluation.overallConfidence === 'Moderate' ? 'moderate' : 'low';

  return (
    <div className="p-4 space-y-6">
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Overall Assessment</h2>
          <Badge variant={confidenceColor}>{evaluation.overallConfidence} Confidence</Badge>
        </div>
        <p className="text-sm text-gray-600">{evaluation.overallSummary}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Dimension Scores</h2>
        <div className="space-y-2">
          {dimensions.map((dim) => (
            <DimensionRow
              key={dim.key}
              dimension={evaluation.dimensions[dim.key as keyof typeof evaluation.dimensions]}
              name={dim.name}
              description={dim.description}
              icon={dim.icon}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Key Findings</h2>
          <span className="text-sm text-purple-600 cursor-pointer">See all (6)</span>
        </div>
        <div className="space-y-2">
          <FindingCard
            type="assumptions"
            count={evaluation.keyFindings.assumptions.length}
            description="These could affect the validity of the conclusions"
            color="orange"
          />
          <FindingCard
            type="gaps"
            count={evaluation.keyFindings.informationGaps.length}
            description="Additional context would strengthen this response"
            color="amber"
          />
          <FindingCard
            type="risks"
            count={evaluation.keyFindings.risks.length}
            description="Consider this before taking action"
            color="purple"
          />
          <FindingCard
            type="strong"
            count={evaluation.keyFindings.strongPoints.length}
            description="Well-supported and useful insights"
            color="green"
          />
        </div>
      </section>

      {userConfidence !== null && (
        <section>
          <ConfidenceCalibration before={userConfidence} after={evaluation.dimensions.correctness.score} />
        </section>
      )}
    </div>
  );
}
