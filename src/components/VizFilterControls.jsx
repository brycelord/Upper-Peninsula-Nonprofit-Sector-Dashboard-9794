import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiBarChart2, FiActivity, FiTrendingUp, FiDollarSign, 
  FiUsers, FiLayers, FiZap, FiSettings, FiMaximize2 
} = FiIcons;

const VizFilterControls = ({ 
  activeMetric, 
  setActiveMetric, 
  activeType, 
  setActiveType,
  showBenchmarks,
  setShowBenchmarks 
}) => {
  const metrics = [
    { id: 'revenue', label: 'Revenue', icon: FiDollarSign, color: 'text-yellow-600' },
    { id: 'employment', label: 'Jobs', icon: FiUsers, color: 'text-blue-600' },
    { id: 'count', label: 'Orgs', icon: FiLayers, color: 'text-teal-600' },
    { id: 'averageWage', label: 'Wages', icon: FiActivity, color: 'text-purple-600' }
  ];

  const chartTypes = [
    { id: 'line', label: 'Area', icon: FiTrendingUp },
    { id: 'bar', label: 'Bar', icon: FiBarChart2 },
    { id: 'scatter', label: 'Scatter', icon: FiMaximize2 }
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 mb-8">
      {/* Metric Selector */}
      <div className="flex items-center gap-1.5 p-1 bg-gray-50 rounded-xl border border-gray-100">
        <div className="px-3 py-1.5 border-r border-gray-200 mr-1">
          <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Metric</span>
        </div>
        {metrics.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveMetric(m.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
              activeMetric === m.id 
                ? 'bg-gray-900 text-white shadow-lg' 
                : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            <SafeIcon icon={m.icon} className={activeMetric === m.id ? 'text-yellow-400' : m.color} />
            {m.label}
          </button>
        ))}
      </div>

      {/* Chart Type Selector */}
      <div className="flex items-center gap-1 p-1 bg-gray-50 rounded-xl border border-gray-100">
        {chartTypes.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveType(t.id)}
            className={`p-2.5 rounded-lg transition-all ${
              activeType === t.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
            title={t.label}
          >
            <SafeIcon icon={t.icon} />
          </button>
        ))}
      </div>

      <div className="flex-grow" />

      {/* Benchmark Toggle */}
      <button
        onClick={() => setShowBenchmarks(!showBenchmarks)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
          showBenchmarks 
            ? 'bg-blue-50 text-blue-700 border border-blue-200' 
            : 'bg-gray-50 text-gray-400 border border-transparent'
        }`}
      >
        <SafeIcon icon={FiZap} className={showBenchmarks ? 'animate-pulse' : ''} />
        {showBenchmarks ? 'Benchmarks: ON' : 'Benchmarks: OFF'}
      </button>
    </div>
  );
};

export default VizFilterControls;