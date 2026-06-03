import { useStore } from '../../store/useStore';

const tabs = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'details' as const, label: 'Details' },
  { id: 'trace' as const, label: 'Trace' },
  { id: 'improve' as const, label: 'Improve' },
];

export function TabNav() {
  const { activeTab, setActiveTab } = useStore();

  return (
    <div className="flex border-b border-gray-200 bg-white">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
