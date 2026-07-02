import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTarget, FiBriefcase, FiZap, FiAward } = FiIcons;

const CountyEconomicSummary = ({ county, allCounties }) => {
  if (!county) return null;

  // Calculate some derived rankings and stats
  const sortedByDensity = [...allCounties].sort((a, b) => b.density - a.density);
  const densityRank = sortedByDensity.findIndex(c => c.name === county.name) + 1;
  
  const totalUPJobs = allCounties.reduce((acc, c) => acc + c.employment, 0);
  const jobShare = ((county.employment / totalUPJobs) * 100).toFixed(1);

  const summaryMetrics = [
    {
      label: 'Regional Rank',
      value: `#${densityRank}`,
      sub: 'by org density',
      icon: FiAward,
      color: 'text-yellow-500'
    },
    {
      label: 'Job Share',
      value: `${jobShare}%`,
      sub: 'of UP NP sector',
      icon: FiTarget,
      color: 'text-blue-500'
    },
    {
      label: 'Impact Tier',
      value: county.organizations > 200 ? 'Tier 1' : county.organizations > 100 ? 'Tier 2' : 'Tier 3',
      sub: 'economic capacity',
      icon: FiZap,
      color: 'text-teal-500'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute -right-10 -top-10 opacity-10">
        <SafeIcon icon={FiBriefcase} className="text-[160px]" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
          <div className="p-2 bg-yellow-400 rounded-lg text-black">
            <SafeIcon icon={FiTrendingUp} />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase italic tracking-tighter" style={{ fontFamily: 'futura-pt, sans-serif' }}>
              Impact Summary: {county.name}
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Economic Contribution Profile</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {summaryMetrics.map((metric, idx) => (
            <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
              <div className={`mb-2 ${metric.color}`}>
                <SafeIcon icon={metric.icon} className="text-xl" />
              </div>
              <div className="text-2xl font-black">{metric.value}</div>
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">
                {metric.label}
              </div>
              <div className="text-[8px] text-gray-500 italic mt-0.5">
                {metric.sub}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl">
          <p className="text-xs text-yellow-100/80 leading-relaxed font-medium">
            <span className="text-yellow-400 font-black uppercase mr-1">Strategic Insight:</span>
            {county.name} County represents a {jobShare}% anchor of the regional nonprofit workforce. 
            Its organization density of {county.density.toFixed(2)} indicates a 
            {county.density > 8 ? ' highly concentrated ' : ' developing '} 
            social infrastructure relative to population.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CountyEconomicSummary;