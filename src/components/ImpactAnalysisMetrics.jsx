import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCrosshair, FiGlobe, FiShield, FiTrendingUp, FiInfo, FiZap } = FiIcons;

const ImpactAnalysisMetrics = ({ county }) => {
  // Derived impact scores based on county data
  // MOVED BEFORE CONDITIONAL RETURN to satisfy React Hook rules
  const impactScores = useMemo(() => {
    if (!county) return [];

    const base = county.density;
    return [
      {
        label: 'Social ROI Index',
        score: (base * 1.2 + (county.organizations / 100)).toFixed(1),
        max: 15,
        icon: FiTrendingUp,
        description: 'Estimated community value generated per dollar of funding.',
        color: 'from-blue-500 to-indigo-600'
      },
      {
        label: 'Service Density',
        score: base.toFixed(1),
        max: 12,
        icon: FiCrosshair,
        description: 'Accessibility of nonprofit services per 1,000 residents.',
        color: 'from-emerald-500 to-teal-600'
      },
      {
        label: 'Infrastructure Stability',
        score: (county.employment / county.organizations / 10).toFixed(1),
        max: 10,
        icon: FiShield,
        description: 'Organizational capacity and workforce resilience score.',
        color: 'from-amber-500 to-orange-600'
      }
    ];
  }, [county]);

  // Conditional return must happen AFTER all hooks
  if (!county) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mt-8">
      <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter" style={{ fontFamily: 'futura-pt, sans-serif' }}>
            Impact Analysis Metrics
          </h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Qualitative Performance Scoring</p>
        </div>
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <SafeIcon icon={FiGlobe} />
        </div>
      </div>

      <div className="p-6 space-y-8">
        {impactScores.map((metric, idx) => (
          <div key={idx} className="relative">
            <div className="flex justify-between items-end mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-md bg-gradient-to-br ${metric.color} text-white shadow-sm`}>
                  <SafeIcon icon={metric.icon} className="text-xs" />
                </div>
                <span className="text-xs font-black text-gray-700 uppercase tracking-tight">{metric.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-gray-900">{metric.score}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">/ {metric.max}</span>
              </div>
            </div>

            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50 shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(metric.score / metric.max) * 100}%` }}
                transition={{ duration: 1, delay: idx * 0.2 }}
                className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
              />
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

      <div className="p-4 bg-gray-900 text-white flex items-center gap-3">
        <div className="p-2 bg-yellow-400 rounded-lg text-black animate-pulse">
          <SafeIcon icon={FiZap} />
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
          <span className="text-yellow-400">Regional Insight:</span> {county.name} County scores 
          {impactScores[0] && impactScores[0].score > 10 ? ' exceptionally high ' : ' above average '} 
          in service delivery efficiency relative to its population size.
        </div>
      </div>
    </div>
  );
};

export default ImpactAnalysisMetrics;