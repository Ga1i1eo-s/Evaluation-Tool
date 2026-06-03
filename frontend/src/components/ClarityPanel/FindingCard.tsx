import { ChevronRight } from 'lucide-react';

interface FindingCardProps {
  type: string;
  count: number;
  description: string;
  color: 'orange' | 'amber' | 'purple' | 'green';
}

export function FindingCard({ type, count, description, color }: FindingCardProps) {
  const colors = {
    orange: 'border-l-orange-500',
    amber: 'border-l-amber-500',
    purple: 'border-l-purple-500',
    green: 'border-l-green-500',
  };

  const labels = {
    assumptions: `${count} assumption${count !== 1 ? 's' : ''} detected`,
    gaps: `${count} information gap${count !== 1 ? 's' : ''}`,
    risks: `${count} potential risk${count !== 1 ? 's' : ''}`,
    strong: `${count} strong point${count !== 1 ? 's' : ''}`,
  };

  return (
    <div className={`p-3 bg-white border border-gray-200 rounded-lg border-l-4 ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900">{labels[type as keyof typeof labels]}</p>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}
