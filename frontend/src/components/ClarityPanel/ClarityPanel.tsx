import { useStore } from '../../store/useStore';
import { ClarityHeader } from './ClarityHeader';
import { TabNav } from './TabNav';
import { OverviewTab } from './tabs/OverviewTab';
import { DetailsTab } from './tabs/DetailsTab';
import { TraceTab } from './tabs/TraceTab';
import { ImproveTab } from './tabs/ImproveTab';
import { SkeletonLoader } from './SkeletonLoader';

export function ClarityPanel() {
  const { activeTab, evaluation, isEvaluating, isStreaming, panelVisible } = useStore();

  if (!panelVisible) return null;

  return (
    <div className="flex flex-col h-full bg-gray-50 border-l border-gray-200">
      <ClarityHeader />
      <TabNav />
      
      <div className="flex-1 overflow-y-auto">
        {isStreaming ? (
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-4">Analyzing response...</p>
            <SkeletonLoader />
          </div>
        ) : isEvaluating ? (
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-4">Running evaluation...</p>
            <SkeletonLoader />
          </div>
        ) : evaluation ? (
          <>
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'details' && <DetailsTab />}
            {activeTab === 'trace' && <TraceTab />}
            {activeTab === 'improve' && <ImproveTab />}
          </>
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>Send a message to see evaluation results</p>
          </div>
        )}
      </div>
    </div>
  );
}
