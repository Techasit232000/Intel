import React from 'react';
import { Mail, MessageSquare, AlertTriangle, Bell, Search, Filter } from 'lucide-react';
import { Notification } from '../../types';

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', source: 'NEURAL', title: 'High Beta Wave Activity', preview: 'Anomalous spike detected in prefrontal cortex.', time: 'Now', read: false },
  { id: '2', source: 'BBM', title: 'Techasit Luanthon', preview: 'Did you check the latest kernel update for OS11?', time: '2m ago', read: false },
  { id: '3', source: 'EMAIL', title: 'System Admin', preview: 'Security patch applied successfully.', time: '15m ago', read: true },
  { id: '4', source: 'SYSTEM', title: 'Battery Optimizer', preview: 'Neural Link is consuming high power.', time: '1h ago', read: true },
  { id: '5', source: 'BBM', title: 'Group Chat: Devs', preview: 'When is the release date?', time: '2h ago', read: true },
  { id: '6', source: 'EMAIL', title: 'Project Manager', preview: 'Meeting rescheduled to 14:00.', time: '3h ago', read: true },
];

const BlackBerryHub: React.FC = () => {
  return (
    <div className="h-full bg-black text-white flex flex-col">
      {/* Hub Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold tracking-tight text-red-500">BlackBerry<span className="text-white font-light">Hub</span></h1>
        <div className="flex space-x-4">
          <Search className="text-gray-400 w-5 h-5" />
          <Filter className="text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Notification List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-900">
          {MOCK_NOTIFICATIONS.map((notif) => (
            <div 
              key={notif.id} 
              className={`flex items-start p-4 hover:bg-white/5 active:bg-white/10 transition-colors cursor-pointer ${notif.read ? 'opacity-70' : 'opacity-100'}`}
            >
              {/* Icon Source */}
              <div className="mr-4 mt-1">
                {notif.source === 'NEURAL' && <div className="p-2 bg-cyan-900/50 rounded-full text-cyan-400"><AlertTriangle size={18} /></div>}
                {notif.source === 'BBM' && <div className="p-2 bg-blue-900/50 rounded-full text-blue-400"><MessageSquare size={18} /></div>}
                {notif.source === 'EMAIL' && <div className="p-2 bg-yellow-900/50 rounded-full text-yellow-400"><Mail size={18} /></div>}
                {notif.source === 'SYSTEM' && <div className="p-2 bg-gray-800 rounded-full text-gray-400"><Bell size={18} /></div>}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`text-sm truncate ${notif.read ? 'font-medium' : 'font-bold'}`}>{notif.title}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{notif.time}</span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2">{notif.preview}</p>
              </div>
              
              {/* Unread Indicator */}
              {!notif.read && (
                <div className="ml-2 mt-2 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
        <div className="p-8 text-center text-gray-600 text-sm">
          No more notifications
        </div>
      </div>
    </div>
  );
};

export default BlackBerryHub;