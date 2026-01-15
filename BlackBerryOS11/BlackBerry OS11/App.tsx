import React, { useState } from 'react';
import StatusBar from './components/StatusBar';
import AppGrid from './components/AppGrid';
import NeuralLink from './components/apps/NeuralLink';
import BlackBerryHub from './components/apps/BlackBerryHub';
import Assistant from './components/apps/Assistant';
import { AppID } from './types';
import { ChevronUp } from 'lucide-react';

const App: React.FC = () => {
  const [activeApp, setActiveApp] = useState<AppID | null>(null);

  const renderActiveApp = () => {
    switch (activeApp) {
      case AppID.NEURAL:
        return <NeuralLink />;
      case AppID.HUB:
        return <BlackBerryHub />;
      case AppID.ASSISTANT:
        return <Assistant />;
      default:
        return null;
    }
  };

  const closeApp = () => {
    setActiveApp(null);
  };

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Phone Frame for Desktop Viewing Experience */}
      <div className="relative w-full h-full md:w-[375px] md:h-[812px] bg-black md:rounded-[40px] md:border-8 md:border-gray-900 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Notch / Speaker (Desktop only) */}
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-900 rounded-b-2xl z-50"></div>

        <StatusBar />

        {/* OS Content */}
        <div className="flex-1 mt-8 relative">
          
          {/* Home Screen (App Grid) */}
          <div className={`absolute inset-0 transition-transform duration-500 ease-out ${activeApp ? 'scale-90 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}>
            <div className="mt-8 mb-4 px-6">
              <h1 className="text-4xl font-thin text-white">Thursday</h1>
              <h2 className="text-lg text-gray-400 font-light">October 24</h2>
            </div>
            <AppGrid onLaunch={setActiveApp} />
          </div>

          {/* Active App View */}
          <div 
            className={`absolute inset-0 bg-black transform transition-transform duration-300 ease-in-out ${activeApp ? 'translate-y-0' : 'translate-y-full'}`}
          >
            {activeApp && renderActiveApp()}
          </div>

        </div>

        {/* Gesture Area / Home Bar */}
        <div className="h-10 w-full flex items-center justify-center bg-transparent z-50 absolute bottom-0">
          <button 
            onClick={closeApp}
            className="w-32 h-1 bg-white/30 rounded-full hover:bg-white/60 transition-colors cursor-pointer active:scale-95"
          >
            {/* Gesture Bar Visual */}
          </button>
          {activeApp && (
            <div 
              className="absolute bottom-4 animate-bounce text-white/20 pointer-events-none"
              style={{ animationDuration: '2s' }}
            >
              <ChevronUp size={16} />
            </div>
          )}
        </div>

      </div>
      
      {/* Context info for desktop users */}
      <div className="hidden md:block absolute bottom-8 text-gray-500 text-xs font-mono text-center">
        BBOS 11 CONCEPT • NEURAL LINK PROTOCOL • TECHASIT LUANTHON
      </div>
    </div>
  );
};

export default App;