import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiAlertTriangle, FiCheckCircle, FiInfo } = FiIcons;

const DataConfidenceBadge = ({ score, size = 'md' }) => {
  // Logic: 0.9-1.0 (High), 0.7-0.89 (Medium), <0.7 (Low/Caution)
  const getStatus = (s) => {
    if (s >= 0.9) return { label: 'Verified', color: 'text-green-600 bg-green-50', icon: FiCheckCircle };
    if (s >= 0.7) return { label: 'Stable', color: 'text-blue-600 bg-blue-50', icon: FiShield };
    return { label: 'Caution', color: 'text-amber-600 bg-amber-50', icon: FiAlertTriangle };
  };

  const status = getStatus(score);
  const isSmall = size === 'sm';

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-current/10 ${status.color} group relative cursor-help`}>
      <SafeIcon icon={status.icon} className={isSmall ? 'text-[10px]' : 'text-xs'} />
      <span className={`${isSmall ? 'text-[8px]' : 'text-[10px]'} font-black uppercase tracking-widest`}>
        {status.label}
      </span>
      
      {/* Tooltip */}
      <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-gray-900 text-white text-[9px] rounded-xl shadow-2xl z-50 normal-case leading-relaxed font-medium">
        <p className="font-black text-yellow-400 mb-1 uppercase tracking-widest">Data Integrity Report</p>
        Confidence Score: <span>{(score * 100).toFixed(0)}%</span>
        <br />
        <span className="text-gray-400 italic">
          Based on sample size, reporting frequency, and historical variance for this specific region.
        </span>
      </div>
    </div>
  );
};

export default DataConfidenceBadge;