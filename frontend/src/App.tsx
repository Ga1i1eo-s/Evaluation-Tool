import { useStore } from './store/useStore';
import { ChatPanel } from './components/ChatPanel/ChatPanel';
import { ClarityPanel } from './components/ClarityPanel/ClarityPanel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const { panelVisible, setPanelVisible } = useStore();

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`transition-all duration-300 ${panelVisible ? 'w-[65%]' : 'w-full'}`}>
        <ChatPanel />
      </div>
      
      {panelVisible && (
        <div className="w-[35%]">
          <ClarityPanel />
        </div>
      )}
      
      <button
        onClick={() => setPanelVisible(!panelVisible)}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 p-2 bg-white border border-gray-300 rounded-l shadow hover:bg-gray-50"
        style={{ right: panelVisible ? '35%' : '0' }}
      >
        {panelVisible ? (
          <ChevronRight className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </div>
  );
}

export default App;
