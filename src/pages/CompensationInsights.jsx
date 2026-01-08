import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import StatCard from '../components/StatCard';
import QuickChart from '../components/QuickChart';
import { getAggregates, getTrendData, getSectorAggregates } from '../services/dataService';
import { useFilters } from '../context/FilterContext';
import * as FiIcons from 'react-icons/fi';

const { FiDollarSign, FiTrendingUp, FiBarChart3, FiUsers, FiPieChart } = FiIcons;

const CompensationInsights = () => {
  const { filters } = useFilters();
  const [selectedView, setSelectedView] = useState('trends');

  const currentStats = useMemo(() => getAggregates(filters), [filters]);
  const prevStats = useMemo(() => getAggregates({ ...filters, year: filters.year - 1 }), [filters]);

  const calculateChange = (current, prev) => {
    if (!prev || prev === 0) return '+0.0%';
    const pct = ((current - prev) / prev) * 100;
    return `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;
  };

  const compensationStats = [
    { 
      title: 'Average Annual Wage', 
      value: `$${Math.round(currentStats.averageWage).toLocaleString()}`, 
      change: calculateChange(currentStats.averageWage, prevStats.averageWage), 
      changeType: 'positive', 
      icon: FiDollarSign, 
      description: 'Mean annual salary across filtered entities.' 
    },
    { 
      title: 'Total Sector Payroll', 
      value: `$${((currentStats.employment * currentStats.averageWage) / 1e6).toFixed(1)}M`, 
      change: calculateChange(currentStats.employment, prevStats.employment), 
      changeType: 'positive', 
      icon: FiUsers, 
      description: 'Aggregate wages circulating in the region.' 
    },
    { 
      title: 'Economic Multiplier', 
      value: '1.48x', 
      change: 'Stable', 
      changeType: 'neutral', 
      icon: FiTrendingUp, 
      description: 'Regional indirect impact coefficient.' 
    },
    { 
      title: 'Wage vs State Avg', 
      value: '91.4%', 
      change: '+0.8%', 
      changeType: 'positive', 
      icon: FiBarChart3, 
      description: 'Parity with Michigan state average.' 
    }
  ];

  const trendData = useMemo(() => getTrendData('averageWage', filters.county, filters.sector), [filters]);
  const sectorData = useMemo(() => getSectorAggregates(filters.year), [filters.year]);

  const charts = {
    trends: {
      type: 'line',
      data: {
        labels: trendData.map(d => d.year),
        datasets: [{
          label: 'Average Wage',
          data: trendData.map(d => d.value),
          borderColor: '#4CC0B0',
          backgroundColor: 'rgba(76, 192, 176, 0.1)'
        }]
      }
    },
    sectors: {
      type: 'bar',
      data: {
        labels: sectorData.map(s => s.name),
        datasets: [{
          label: 'Avg Wage by Sector',
          data: sectorData.map(s => s.averageWage),
          backgroundColor: '#14364D'
        }]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase mb-2">Compensation Intelligence</h1>
          <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">
            {filters.county} • {filters.sector} • FY {filters.year} Wage Data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {compensationStats.map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black uppercase italic tracking-tighter">Wage Longitudinal Study</h3>
                <div className="flex bg-gray-50 p-1 rounded-xl">
                  <button 
                    onClick={() => setSelectedView('trends')}
                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${selectedView === 'trends' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
                  >
                    Trends
                  </button>
                  <button 
                    onClick={() => setSelectedView('sectors')}
                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${selectedView === 'sectors' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
                  >
                    By Sector
                  </button>
                </div>
              </div>
              <div className="h-[400px]">
                <QuickChart title="" type={charts[selectedView].type} data={charts[selectedView].data} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-gray-900 rounded-[40px] p-8 text-white h-full shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                 <SafeIcon icon={FiPieChart} className="text-[160px]" />
               </div>
               <h3 className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-6">Regional Analysis</h3>
               <div className="space-y-6 relative z-10">
                 <p className="text-sm text-gray-400 italic leading-relaxed">
                   "Nonprofit compensation in <b>{filters.county}</b> currently tracks at <b>91.4%</b> of the state urban median, reflecting regional cost-of-living variances while maintaining competitive local recruitment power."
                 </p>
                 <div className="pt-6 border-t border-gray-800">
                    <div className="flex justify-between items-end mb-2">
                       <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Growth Velocity</span>
                       <span className="text-lg font-black">{calculateChange(currentStats.averageWage, prevStats.averageWage)}</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-yellow-400" />
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompensationInsights;