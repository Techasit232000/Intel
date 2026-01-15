import React from 'react';
import { AppID } from '../types';
import { Brain, MessageSquare, Mic, Settings, Calendar, Music, Camera, Map, Mail, Phone, Lock, Globe } from 'lucide-react';

interface AppGridProps {
  onLaunch: (app: AppID) => void;
}

const apps = [
  { id: AppID.NEURAL, name: 'Neural Link', icon: Brain, color: 'bg-cyan-600' },
  { id: AppID.HUB, name: 'BlackBerry Hub', icon: MessageSquare, color: 'bg-red-600' },
  { id: AppID.ASSISTANT, name: 'Assistant', icon: Mic, color: 'bg-indigo-600' },
  { id: AppID.SETTINGS, name: 'Settings', icon: Settings, color: 'bg-gray-600' },
  // Decorative dummy apps
  { id: 'CAL', name: 'Calendar', icon: Calendar, color: 'bg-green-600' },
  { id: 'MUSIC', name: 'Music', icon: Music, color: 'bg-orange-600' },
  { id: 'CAM', name: 'Camera', icon: Camera, color: 'bg-gray-800' },
  { id: 'MAPS', name: 'Maps', icon: Map, color: 'bg-yellow-600' },
  { id: 'MAIL', name: 'Work Mail', icon: Mail, color: 'bg-blue-600' },
  { id: 'PHONE', name: 'Phone', icon: Phone, color: 'bg-green-500' },
  { id: 'BROWSER', name: 'Browser', icon: Globe, color: 'bg-blue-400' },
  { id: 'PASS', name: 'Password', icon: Lock, color: 'bg-purple-600' },
];

const AppGrid: React.FC<AppGridProps> = ({ onLaunch }) => {
  return (
    <div className="p-6 grid grid-cols-4 gap-y-8 gap-x-4 animate-in fade-in duration-700">
      {apps.map((app) => (
        <div 
          key={app.id} 
          onClick={() => app.id in AppID || app.id === AppID.HUB ? onLaunch(app.id as AppID) : null}
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div className={`w-14 h-14 md:w-16 md:h-16 ${app.color} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-200 border border-white/10`}>
            <app.icon className="text-white w-7 h-7 md:w-8 md:h-8" />
          </div>
          <span className="text-xs text-center text-gray-300 font-medium group-hover:text-white truncate w-full">{app.name}</span>
        </div>
      ))}
    </div>
  );
};

export default AppGrid;