import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTrendingDown, FiZap, FiActivity, FiClock, FiTarget, FiAlertCircle, FiHelpCircle } = FiIcons;

const TrajectoryEngine = ({ data, metric }) => {
  const analysis = useMemo(() => {
    if (!data || data.length < 2) return null;
    const values = data.map(d => d.value);
    const startValue = values[0];
    const endValue = values[values.length - 1];
    const n = values.length - 1;

    // Growth Speed (Simplified CAGR)
    const cagr = startValue > 0 ? (Math.pow(endValue / startValue, 1 / n) - 1) * 100 : 0;
    
    // Stability (Simplified Volatility)
    const growthRates = [];
    for (let i = 1; i < values.length; i++) {
      growthRates.push((values[i] - values[i-1]) / (values[i-1] || 1));
    }
    const avgGrowth = growthRates.reduce((a, b) => a + b, 0) / growthRates.length;
    const variance = growthRates.reduce((a, b) => a + Math.pow(b - avgGrowth, 2), 0) / growthRates.length;
    const volatility = Math.sqrt(variance) * 100;

    // Simple Linear Projection (Predict 2027)
    const sumX = data.reduce((acc, _, i) => acc + i, 0);
    const sumY = values.reduce((acc, v) => acc + v, 0);
    const sumXY = values.reduce((acc, v, i) => acc + (v * i), 0);
    const sumXX = data.reduce((acc, _, i) => acc + (i * i), 0);
    const slope = (n + 1 * sumXY - sumX * sumY) / ((n + 1) * sumXX - sumX * sumX);
    const projection2027 = endValue + (slope * 5);

    const recentGrowth = growthRates.length > 0 ? growthRates[growthRates.length - 1] : 0;
    const momentum = recentGrowth > avgGrowth * 2 ? 'Gaining Speed' : 'Steady';
    
    return { cagr, volatility, projection2027, momentum, slope };
  }, [data, metric]);

  const MetricTooltip = ({ title, logic }) => (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-gray-900 text-white text-[10px] rounded-2xl shadow-2xl opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all z-50 normal-case leading-relaxed font-medium">
      <p className="font-black text-yellow-400 mb-1 uppercase tracking-widest">{title}</p>
      <p className="text-gray-300 italic">{logic}</p>
    </div>
  );

  if (!analysis) return null;

  const formatValue = (val) => {
    if (metric === 'revenue' || metric === 'assets') return `$${(val / 1e6).toFixed(1)}M`;
    if (metric === 'averageWage') return `$${(val / 1e3).toFixed(1)}K`;
    return Math.round(val).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 rounded-[32px] p-8 text-white shadow-2xl border-t-8 border-yellow-400 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 opacity-10">
          <SafeIcon icon={FiZap} className="text-[120px]" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Growth Outlook</span>
            <div className="px-2 py-0.5 bg-yellow-400 text-black text-[8px] font-black uppercase rounded">
              {analysis.momentum}
            </div>
          </div>
          <div className="space-y-6">
            <div className="group/tooltip relative">
              <div className="flex items-center gap-2 mb-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase block">Average Yearly Growth</label>
                <SafeIcon icon={FiHelpCircle} className="text-gray-600 text-[10px] cursor-help" />
              </div>
              <MetricTooltip 
                title="Yearly Growth Speed" 
                logic="This shows how much the sector grew on average each year over the last decade."
              />
              <div className="flex items-center gap-2">
                <span className="text-4xl font-black text-white">
                  {analysis.cagr >= 0 ? '+' : ''}{analysis.cagr.toFixed(1)}%
                </span>
                <SafeIcon icon={analysis.cagr >= 0 ? FiTrendingUp : FiTrendingDown} className={analysis.cagr >= 0 ? 'text-green-400' : 'text-red-400'} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group/tooltip relative">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black text-gray-500 uppercase block">Consistency</span>
                  <SafeIcon icon={FiHelpCircle} className="text-gray-700 text-[10px] cursor-help" />
                </div>
                <MetricTooltip 
                  title="Stability Score" 
                  logic="A higher percentage here means growth was steady. A lower percentage means it was a bit of a roller coaster."
                />
                <div className="text-lg font-black">{Math.max(0, (100 - analysis.volatility)).toFixed(0)}%</div>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-[9px] font-black text-gray-500 uppercase block mb-1">Data Health</span>
                <div className="text-lg font-black">High</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl group/tooltip relative">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <SafeIcon icon={FiTarget} className="text-blue-500" /> 2027 Estimated Future
          <SafeIcon icon={FiHelpCircle} className="text-gray-300 text-[10px] cursor-help" />
        </h3>
        <MetricTooltip 
          title="Future Look-Ahead" 
          logic="We use current trends to guess what these numbers might look like in 5 years if things keep going the same way."
        />
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-3xl font-black text-gray-900 tracking-tighter">
              {formatValue(analysis.projection2027)}
            </div>
          </div>
          <div className={`text-xs font-black ${analysis.slope >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {analysis.slope >= 0 ? 'Trending Up' : 'Trending Down'}
          </div>
        </div>
        <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden flex">
          <div className="h-full bg-blue-500" style={{ width: '70%' }} />
          <div className="h-full bg-blue-200 animate-pulse" style={{ width: '30%' }} />
        </div>
      </motion.div>
    </div>
  );
};

export default TrajectoryEngine;