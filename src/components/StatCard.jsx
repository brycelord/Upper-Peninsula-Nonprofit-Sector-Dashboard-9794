import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { useViewMode } from '../context/ViewContext';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTrendingDown, FiMessageSquare, FiInfo, FiHelpCircle } = FiIcons;

const StatCard = ({ title, value, change, changeType, icon, description, publicStory }) => {
  const { viewMode } = useViewMode();

  const getMetricLogic = (title) => {
    switch (title) {
      case 'Active Nonprofits': 
        return 'This count comes from official IRS records. It includes all active charities and groups registered to help the community.';
      case 'Sector Workforce': 
        return 'We estimate this by looking at the number of employees reported by each group. It shows how many neighbors work in this sector.';
      case 'Annual Revenue': 
        return 'This is the total money these groups brought in through donations, grants, and services to fund their missions.';
      case 'Total Assets': 
        return 'This represents the value of everything the groups own, such as buildings, equipment, and emergency savings.';
      case 'Average Annual Wage': 
        return 'The typical yearly pay for someone working in a local nonprofit, compared to other jobs in Michigan.';
      default: 
        return 'Key community information based on verified local records.';
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }} 
      className={`group relative bg-white rounded-3xl p-6 shadow-xl border border-gray-100 transition-all ${viewMode === 'analyst' ? 'border-b-8 border-gray-900' : 'border-b-8 border-yellow-400'}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl ${viewMode === 'public' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
          <SafeIcon icon={icon} className="text-xl" />
        </div>
        <div className="flex items-center gap-2">
           <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${changeType === 'positive' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            <SafeIcon icon={changeType === 'positive' ? FiTrendingUp : FiTrendingDown} /> {change}
          </div>
          {/* Public-Friendly Tooltip */}
          <div className="relative group/tooltip">
            <SafeIcon icon={FiHelpCircle} className="text-gray-300 hover:text-gray-900 cursor-help text-xs transition-colors" />
            <div className="absolute bottom-full right-0 mb-3 w-56 p-4 bg-gray-900 text-white text-[10px] rounded-2xl shadow-2xl opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all z-50 normal-case leading-relaxed font-medium transform translate-y-2 group-hover/tooltip:translate-y-0">
              <p className="font-black text-yellow-400 mb-1 uppercase tracking-widest">What this means</p>
              {getMetricLogic(title)}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-gray-900 tracking-tighter italic uppercase">
            {value}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-50">
        {viewMode === 'public' ? (
          <p className="text-[11px] text-gray-500 font-medium italic leading-relaxed">
            {description}
          </p>
        ) : (
          <div className="flex items-start gap-2">
            <SafeIcon icon={FiMessageSquare} className="text-yellow-500 mt-1 shrink-0" />
            <p className="text-[11px] text-gray-900 font-black italic uppercase leading-tight tracking-tight">
              {publicStory || description}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;