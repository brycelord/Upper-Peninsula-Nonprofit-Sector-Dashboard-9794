import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBriefcase, FiDollarSign, FiTrendingUp, FiUsers, FiSettings, FiCheck } = FiIcons;

const UserGuidedStats = ({ onMetricChange }) => {
  const [activeFocus, setActiveFocus] = useState('Overview');
  
  const focuses = [
    { id: 'Overview', icon: FiTrendingUp, label: 'General', color: 'bg-yellow-400' },
    { id: 'Employment', icon: FiBriefcase, label: 'Jobs', color: 'bg-blue-500' },
    { id: 'Compensation', icon: FiDollarSign, label: 'Wages', color: 'bg-teal-500' },
    { id: 'Growth', icon: FiUsers, label: 'Scale', color: 'bg-orange-500' }
  ];

  const handleFocusChange = (id) => {
    setActiveFocus(id);
    if (onMetricChange) onMetricChange(id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex items-center gap-2 mb-8 max-w-fit mx-auto">
      <div className="px-4 py-2 border-r border-gray-100 flex items-center gap-2">
        <SafeIcon icon={FiSettings} className="text-gray-400" />
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Analysis Focus</span>
      </div>
      <div className="flex gap-1">
        {focuses.map((f) => (
          <button
            key={f.id}
            onClick={() => handleFocusChange(f.id)}
            className={`relative px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all flex items-center gap-2 ${
              activeFocus === f.id ? 'text-white' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {activeFocus === f.id && (
              <motion.div
                layoutId="activeTab"
                className={`absolute inset-0 ${f.color} rounded-xl -z-10 shadow-lg shadow-opacity-20`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <SafeIcon icon={f.id === activeFocus ? FiCheck : f.icon} className="text-sm" />
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserGuidedStats;