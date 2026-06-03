import { useStore } from '../../store/useStore';
import { Diamond, X } from 'lucide-react';
import { Badge } from '../shared/Badge';

export function ClarityHeader() {
  const { setPanelVisible } = useStore();

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2">
        <Diamond className="w-5 h-5 text-purple-500" />
        <span className="font-semibold text-gray-900">Clarity</span>
        <Badge variant="beta">BETA</Badge>
      </div>
      <button
        onClick={() => setPanelVisible(false)}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}
