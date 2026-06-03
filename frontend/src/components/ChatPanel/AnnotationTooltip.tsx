import { AlertTriangle, Info, HelpCircle, CheckCircle } from 'lucide-react';

interface AnnotationTooltipProps {
  type: 'assumption' | 'statistic' | 'uncertain' | 'strong';
  tooltip: string;
}

export function AnnotationTooltip({ type, tooltip }: AnnotationTooltipProps) {
  const icons = {
    assumption: AlertTriangle,
    statistic: Info,
    uncertain: HelpCircle,
    strong: CheckCircle,
  };

  const colors = {
    assumption: 'bg-orange-100 border-orange-500 text-orange-900',
    statistic: 'bg-green-100 border-green-500 text-green-900',
    uncertain: 'bg-purple-100 border-purple-500 text-purple-900',
    strong: 'bg-green-100 border-green-500 text-green-900',
  };

  const Icon = icons[type];

  return (
    <div className={`absolute bottom-full left-0 mb-2 p-3 rounded-lg border-l-4 shadow-lg max-w-xs ${colors[type]}`}>
      <div className="flex items-start gap-2">
        <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p className="text-sm">{tooltip}</p>
      </div>
    </div>
  );
}
