import React from 'react';
import { motion } from 'framer-motion';
import EconomicImpactCalculator from '../components/EconomicImpactCalculator';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiTrendingUp, FiActivity, FiGlobe } = FiIcons;

const ImpactCalculator = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <SafeIcon icon={FiGlobe} className="text-yellow-400" />
            Strategic Planning Tool
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic uppercase mb-4" style={{ fontFamily: 'futura-pt' }}>
            Economic Impact Calculator
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            Simulate the growth of Michigan's Upper Peninsula nonprofit infrastructure and visualize the resulting ripple effects on regional employment and financial velocity.
          </p>
        </motion.div>

        <EconomicImpactCalculator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <SafeIcon icon={FiTarget} className="text-xl" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-4">Local Sourcing</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Nonprofits are "sticky" economic anchors. Unlike corporate entities, they spend a higher percentage of their revenue on local vendors and regional workforce.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
              <SafeIcon icon={FiTrendingUp} className="text-xl" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-4">Indirect Job Creation</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Every job in the nonprofit sector generates demand for business services, accounting, and hospitality throughout the UP counties.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6">
              <SafeIcon icon={FiActivity} className="text-xl" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-4">Social Value Multiplier</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Beyond financial metrics, simulated ROI includes reduced public burden for social services and increased community health outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactCalculator;