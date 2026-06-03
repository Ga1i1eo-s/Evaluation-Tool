import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { DimensionScore } from '../../types';
import { DotRating } from '../shared/DotRating';
import { LucideIcon, ChevronDown } from 'lucide-react';

interface DimensionRowProps {
  dimension: DimensionScore;
  name: string;
  description: string;
  icon: LucideIcon;
}

export function DimensionRow({ dimension, name, description, icon: Icon }: DimensionRowProps) {
  const { expandedDimensions, toggleDimension } = useStore();
  const isExpanded = expandedDimensions.includes(name);

  const color = dimension.label === 'High' ? 'green' : 
                dimension.label === 'Medium' ? 'amber' : 'red';

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => toggleDimension(name)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-gray-600" />
          <div className="text-left">
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${
            dimension.label === 'High' ? 'text-green-600' :
            dimension.label === 'Medium' ? 'text-amber-600' : 'text-red-600'
          }`}>
            {dimension.label}
          </span>
          <DotRating score={dimension.score} max={5} color={color} />
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-3 pb-3 pt-2 border-t border-gray-100">
          <p className="text-sm text-gray-700">{dimension.detail}</p>
        </div>
      )}
    </div>
  );
}
