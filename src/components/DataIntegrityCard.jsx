import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiCheckCircle, FiAlertTriangle, FiInfo, FiDatabase } = FiIcons;

const DataIntegrityCard = ({ title, score, label, description, status }) => {
  const getColors = () => {
    if (status === 'optimal') return 'text-green-600 bg-green-50 border-green-100';
    if (status === 'warning') return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-blue-600 bg-blue-50 border-blue-100';
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-2xl ${getColors()} border`}>
          <SafeIcon icon={status === 'optimal' ? FiShield : FiDatabase} className="text-xl" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-black tracking-tighter">{score}%</div>
          <div className={`text-[8px] font-black uppercase tracking-widest ${getColors().split(' ')[0]}`}>
            {label}
          </div>
        </div>
      </div>
      
      <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-2">{title}</h3>
      <p className="text-[11px] text-gray-500 font-medium leading-relaxed mb-4">
        {description}
      </p>
      
      <div className="pt-4 border-t border-gray-50 flex items-center gap-2">
        <SafeIcon icon={FiInfo} className="text-gray-400 text-[10px]" />
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
          Verified via IRS BMF 2024-Q1
        </span>
      </div>
    </motion.div>
  );
};

export default DataIntegrityCard;