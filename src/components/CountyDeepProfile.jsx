import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import QuickChart from './QuickChart';
import * as FiIcons from 'react-icons/fi';

const { FiAward, FiTrendingUp, FiUsers, FiPieChart, FiActivity } = FiIcons;

const CountyDeepProfile = ({ county, allCounties }) => {
  const rankings = useMemo(() => {
    if (!county || !allCounties) return { wageRank: 0, jobRank: 0, totalCounties: 0 };
    const sortedByWage = [...allCounties].sort((a, b) => b.baseWage - a.baseWage);
    const sortedByJobs = [...allCounties].sort((a, b) => b.employment - a.employment);
    return {
      wageRank: sortedByWage.findIndex(c => c.name === county.name) + 1,
      jobRank: sortedByJobs.findIndex(c => c.name === county.name) + 1,
      totalCounties: allCounties.length
    };
  }, [county, allCounties]);

  if (!county) return null;

  const sectorData = {
    labels: ['Healthcare', 'Education', 'Human Services', 'Other'],
    datasets: [{
      data: [
        Math.round(county.organizations * 0.35),
        Math.round(county.organizations * 0.25),
        Math.round(county.organizations * 0.20),
        Math.round(county.organizations * 0.20)
      ],
      backgroundColor: ['#095339', '#0d7a53', '#ffc425', '#ffd966']
    }]
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
      >
        <div className="bg-gray-900 p-8 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <SafeIcon icon={FiAward} className="text-[120px]" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-black shadow-lg">
                <span className="text-2xl font-black italic">{county.name.substring(0, 2).toUpperCase()}</span>
              </div>
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter italic" style={{ fontFamily: 'futura-pt, sans-serif' }}>
                  {county.name}
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="px-2 py-0.5 bg-yellow-400/20 text-yellow-400 text-[10px] font-black uppercase tracking-widest rounded border border-yellow-400/30">
                    Economic Profile 2022
                  </span>
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                    Population: {county.population.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Wage Ranking</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-yellow-400">#{rankings.wageRank}</span>
                  <span className="text-xs text-gray-500">of {rankings.totalCounties}</span>
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Job Creator Rank</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-blue-400">#{rankings.jobRank}</span>
                  <span className="text-xs text-gray-500">of {rankings.totalCounties}</span>
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Sector Density</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-teal-400">{county.density.toFixed(1)}</span>
                  <span className="text-xs text-gray-500">per 1k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <SafeIcon icon={FiUsers} className="text-blue-600" /> Workforce Specialization
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Healthcare Support', val: 42, color: 'bg-blue-600' },
                { label: 'Educational Services', val: 28, color: 'bg-teal-600' },
                { label: 'Social Advocacy', val: 15, color: 'bg-emerald-600' },
                { label: 'Arts & Environment', val: 15, color: 'bg-yellow-500' }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-tight text-gray-500 mb-1.5">
                    <span>{item.label}</span>
                    <span>{item.val}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${item.val}%` }} 
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      className={`h-full ${item.color} rounded-full`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <SafeIcon icon={FiPieChart} className="text-teal-600" /> Organizational Mix
            </h3>
            <div className="flex-grow min-h-[250px] relative">
              <QuickChart title="" type="pie" data={sectorData} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CountyDeepProfile;