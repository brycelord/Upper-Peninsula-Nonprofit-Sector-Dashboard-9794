import React from 'react';
import { motion } from 'framer-motion';
import EconomicImpactCalculator from '../components/EconomicImpactCalculator';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiTrendingUp, FiActivity, FiGlobe } = FiIcons;

const ImpactCalculator = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-6">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
            <SafeIcon icon={FiGlobe} className="text-yellow-400" />
            Strategic Planning Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter italic uppercase mb-2">
            Economic Impact Calculator
          </h1>
          <p className="text-gray-500 font-medium text-sm max-w-2xl mx-auto">
            Simulate the growth of UP nonprofit infrastructure and visualize ripple effects on employment and financial velocity.
          </p>
        </motion.div>

        <EconomicImpactCalculator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-md">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-2">
              <SafeIcon icon={FiTarget} className="text-lg" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-1.5">Local Sourcing</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Nonprofits are "sticky" economic anchors, spending higher percentages of revenue on local vendors and workforce.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-md">
            <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-2">
              <SafeIcon icon={FiTrendingUp} className="text-lg" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-1.5">Indirect Job Creation</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Every nonprofit job generates demand for business services, accounting, and hospitality throughout the UP counties.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-md">
            <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-2">
              <SafeIcon icon={FiActivity} className="text-lg" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-1.5">Social Value Multiplier</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              ROI includes reduced public burden for social services and increased community health outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactCalculator;