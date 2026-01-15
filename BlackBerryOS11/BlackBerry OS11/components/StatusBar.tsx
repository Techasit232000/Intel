import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

const StatusBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 w-full bg-black/80 backdrop-blur-md flex items-center justify-between px-4 text-white text-xs select-none z-50 fixed top-0 left-0 border-b border-white/10">
      <div className="flex items-center space-x-2">
        <span>BBOS 11</span>
        <span className="text-gray-400">|</span>
        <Signal size={14} />
        <span>5G+</span>
      </div>
      <div className="font-semibold tracking-wider">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="flex items-center space-x-3">
        <Wifi size={14} />
        <div className="flex items-center space-x-1">
          <span>98%</span>
          <Battery size={14} className="fill-white" />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;