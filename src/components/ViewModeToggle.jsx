import React from 'react';
import { motion } from 'framer-motion';
import { useViewMode } from '../context/ViewContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBarChart2, FiUsers, FiInfo } = FiIcons;

const ViewModeToggle = () => {
  const { viewMode, toggleViewMode } = useViewMode();

  return (
    <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-inner border border-gray-100">
      {/* SWAPPED BUTTON PLACEMENT: Public is now first */}
      <button 
        onClick={() => viewMode !== 'public' && toggleViewMode()}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
          viewMode === 'public' ? 'bg-yellow-400 text-black shadow-lg' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <SafeIcon icon={FiUsers} />
        Public
      </button>

      <button 
        onClick={() => viewMode !== 'analyst' && toggleViewMode()}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
          viewMode === 'analyst' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <SafeIcon icon={FiBarChart2} />
        Analyst
      </button>

      <div className="hidden md:block px-2 border-l border-gray-100 ml-1">
        <div className="group relative">
          <SafeIcon icon={FiInfo} className="text-gray-300 cursor-help" />
          <div className="invisible group-hover:visible absolute right-0 bottom-full mb-2 w-48 p-3 bg-gray-900 text-white text-[9px] rounded-xl shadow-2xl z-50 normal-case leading-relaxed">
            <p className="font-bold text-yellow-400 mb-1">View Mode Guide:</p>
            {viewMode === 'analyst' ? "Shows raw financial data and technical indicators." : "Translates numbers into community impact stories."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModeToggle;