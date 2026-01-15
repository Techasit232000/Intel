import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Brain, Activity, Zap, Radio } from 'lucide-react';
import { BrainWaveData } from '../../types';

const NeuralLink: React.FC = () => {
  const [data, setData] = useState<BrainWaveData[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'DISCONNECTED' | 'CONNECTING' | 'CONNECTED'>('CONNECTING');

  useEffect(() => {
    // Simulate connection delay
    setTimeout(() => setConnectionStatus('CONNECTED'), 1500);

    const interval = setInterval(() => {
      setData(prev => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' });
        
        // Generate simulated brain wave data
        const newPoint: BrainWaveData = {
          time: timeStr,
          alpha: 40 + Math.random() * 20, // Relaxed
          beta: 20 + Math.random() * 40,  // Active thinking
          theta: 10 + Math.random() * 10, // Drowsy/Meditative
          delta: 5 + Math.random() * 5    // Sleep
        };

        const newData = [...prev, newPoint];
        if (newData.length > 20) newData.shift();
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (connectionStatus !== 'CONNECTED') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-900 text-cyan-400">
        <Brain size={64} className="animate-pulse mb-4" />
        <h2 className="text-2xl font-light tracking-widest uppercase">Initializing Neural Link</h2>
        <p className="text-sm mt-2 text-gray-500">Establishing secure handshake...</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-900 text-white overflow-y-auto p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
            <Brain size={24} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Neural Link</h1>
            <p className="text-xs text-gray-400">Techasit Luanthon Protocol v1.0</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs text-green-500 font-mono">ONLINE</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-black/40 border border-gray-800 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Cognitive Load</span>
            <Activity size={16} className="text-purple-400" />
          </div>
          <div className="text-3xl font-light">
            {data.length > 0 ? Math.round(data[data.length - 1].beta) : 0}%
          </div>
          <div className="w-full bg-gray-800 h-1 mt-3 rounded-full overflow-hidden">
            <div 
              className="bg-purple-500 h-full transition-all duration-500" 
              style={{ width: `${data.length > 0 ? data[data.length - 1].beta : 0}%` }}
            />
          </div>
        </div>

        <div className="bg-black/40 border border-gray-800 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Focus Level</span>
            <Zap size={16} className="text-yellow-400" />
          </div>
          <div className="text-3xl font-light">
            {data.length > 0 ? Math.round(data[data.length - 1].alpha * 1.2) : 0}
          </div>
           <div className="w-full bg-gray-800 h-1 mt-3 rounded-full overflow-hidden">
            <div 
              className="bg-yellow-500 h-full transition-all duration-500" 
              style={{ width: `${data.length > 0 ? data[data.length - 1].alpha * 1.2 : 0}%` }}
            />
          </div>
        </div>

        <div className="bg-black/40 border border-gray-800 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Signal Integrity</span>
            <Radio size={16} className="text-green-400" />
          </div>
          <div className="text-3xl font-light">98.4%</div>
           <div className="w-full bg-gray-800 h-1 mt-3 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full w-[98%]"></div>
          </div>
        </div>
      </div>

      {/* Real-time Chart */}
      <div className="bg-black/40 border border-gray-800 p-4 rounded-xl h-80 mb-6">
        <h3 className="text-sm text-gray-400 mb-4 font-mono">REAL-TIME EEG MONITORING</h3>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBeta" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAlpha" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#444" tick={{fontSize: 10}} interval={5} />
            <YAxis stroke="#444" tick={{fontSize: 10}} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
              itemStyle={{ fontSize: '12px' }}
            />
            <Area type="monotone" dataKey="beta" stroke="#8884d8" fillOpacity={1} fill="url(#colorBeta)" name="Beta (Active)" />
            <Area type="monotone" dataKey="alpha" stroke="#82ca9d" fillOpacity={1} fill="url(#colorAlpha)" name="Alpha (Relaxed)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Control Panel (Visual Only) */}
      <div className="bg-black/40 border border-gray-800 p-4 rounded-xl">
        <h3 className="text-sm text-gray-400 mb-4 font-mono">INTERFACE CONTROLS</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gray-800 hover:bg-gray-700 py-3 rounded-lg text-sm text-gray-300 transition-colors border border-gray-700">
            Calibrate Sensor
          </button>
           <button className="bg-gray-800 hover:bg-gray-700 py-3 rounded-lg text-sm text-gray-300 transition-colors border border-gray-700">
            Run Diagnostics
          </button>
           <button className="bg-gray-800 hover:bg-gray-700 py-3 rounded-lg text-sm text-gray-300 transition-colors border border-gray-700">
            Sync To Hub
          </button>
           <button className="bg-red-500/20 hover:bg-red-500/30 py-3 rounded-lg text-sm text-red-400 transition-colors border border-red-500/30">
            Emergency Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeuralLink;