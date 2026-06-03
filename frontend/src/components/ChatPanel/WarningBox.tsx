import { AlertTriangle } from 'lucide-react';

export function WarningBox() {
  return (
    <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-orange-900">Assumption detected</p>
          <p className="text-xs text-orange-700 mt-1">
            Market growth rate will remain consistent over the next 5 years.
          </p>
        </div>
      </div>
    </div>
  );
}
