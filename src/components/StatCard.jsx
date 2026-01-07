import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTrendingDown } = FiIcons;

const StatCard = ({ title, value, change, changeType, icon, description }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-400"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <SafeIcon icon={icon} className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          </div>
          
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">{value}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 ${
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              <SafeIcon 
                icon={changeType === 'positive' ? FiTrendingUp : FiTrendingDown} 
                className="w-4 h-4" 
              />
              <span className="text-sm font-medium">{change}</span>
            </div>
            <span className="text-sm text-gray-500">vs. previous year</span>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;