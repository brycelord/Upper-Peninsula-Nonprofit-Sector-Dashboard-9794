import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCrosshair, FiGlobe, FiShield, FiTrendingUp, FiInfo, FiZap, FiHelpCircle } = FiIcons;

const ImpactAnalysisMetrics = ({ county }) => {
  const impactScores = useMemo(() => {
    if (!county) return [];
    const base = county.density;
    return [
      {
        label: 'Community Value Score',
        score: (base * 1.2 + (county.organizations / 100)).toFixed(1),
        max: 15,
        icon: FiTrendingUp,
        description: 'Estimated worth of services provided to every neighbor.',
        logic: 'We look at how much help is available and the size of the community to guess total value.',
        color: 'from-blue-500 to-indigo-600'
      },
      {
        label: 'Local Access Score',
        score: base.toFixed(1),
        max: 12,
        icon: FiCrosshair,
        description: 'How easy it is to find a nonprofit nearby.',
        logic: 'This shows the number of groups available for every 1,000 people in the county.',
        color: 'from-emerald-500 to-teal-600'
      },
      {
        label: 'Organizational Strength',
        score: (county.employment / county.organizations / 10).toFixed(1),
        max: 10,
        icon: FiShield,
        description: 'The stability and scale of our local groups.',
        logic: 'Higher scores mean groups have more full-time staff and long-term resources.',
        color: 'from-amber-500 to-orange-600'
      }
    ];
  }, [county]);

  if (!county) return null;

  return (
    <div className="bg-white rounded-[32px] shadow-xl border border-gray-100 overflow-hidden mt-8">
      <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter">Community Impact Score</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">How well the sector is serving you</p>
        </div>
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <SafeIcon icon={FiGlobe} />
        </div>
      </div>
      <div className="p-6 space-y-8">
        {impactScores.map((metric, idx) => (
          <div key={idx} className="relative group/tooltip">
            <div className="flex justify-between items-end mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-md bg-gradient-to-br ${metric.color} text-white shadow-sm`}>
                  <SafeIcon icon={metric.icon} className="text-xs" />
                </div>
                <span className="text-xs font-black text-gray-700 uppercase tracking-tight">{metric.label}</span>
                <SafeIcon icon={FiHelpCircle} className="text-gray-300 text-[10px] cursor-help" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-gray-900">{metric.score}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">/ {metric.max}</span>
              </div>
            </div>

            {/* Public-Friendly Tooltip */}
            <div className="absolute bottom-full left-0 mb-3 w-64 p-4 bg-gray-900 text-white text-[10px] rounded-2xl shadow-2xl opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all z-50 normal-case leading-relaxed font-medium">
              <p className="font-black text-yellow-400 mb-1 uppercase tracking-widest">About this score</p>
              <p className="text-gray-300 italic">{metric.logic}</p>
            </div>

            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50 shadow-inner">
              <motion.div initial={{ width: 0 }} animate={{ width: `${(metric.score / metric.max) * 100}%` }} transition={{ duration: 1, delay: idx * 0.2 }} className={`h-full bg-gradient-to-r ${metric.color} rounded-full`} />
            </div>
            <div className="mt-2 flex items-start gap-1.5">
              <SafeIcon icon={FiInfo} className="text-[10px] text-blue-400 mt-0.5" />
              <p className="text-[10px] text-gray-500 leading-tight font-medium">
                {metric.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactAnalysisMetrics;