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
          borderColor: '#ffc425',
          backgroundColor: 'rgba(255, 196, 37, 0.12)'
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
          backgroundColor: '#095339'
        }]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-6">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase mb-1">Compensation Intelligence</h1>
          <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">
            {filters.county} • {filters.sector} • FY {filters.year} Wage Data
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
          {compensationStats.map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base md:text-lg font-black uppercase tracking-tighter">Wage Longitudinal Study</h3>
                <div className="flex bg-gray-50 p-0.5 rounded-lg">
                  <button
                    onClick={() => setSelectedView('trends')}
                    className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase transition-all ${selectedView === 'trends' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
                  >
                    Trends
                  </button>
                  <button
                    onClick={() => setSelectedView('sectors')}
                    className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase transition-all ${selectedView === 'sectors' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
                  >
                    By Sector
                  </button>
                </div>
              </div>
              <div className="h-72 md:h-80 lg:h-96">
                <QuickChart title="" type={charts[selectedView].type} data={charts[selectedView].data} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-gray-900 rounded-2xl p-4 md:p-5 text-white h-full shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 p-5 opacity-5">
                 <SafeIcon icon={FiPieChart} className="text-[120px]" />
               </div>
               <h3 className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-3">Regional Analysis</h3>
               <div className="space-y-3 relative z-10">
                 <p className="text-xs text-gray-400 italic leading-relaxed">
                   "Nonprofit compensation in <b>{filters.county}</b> currently tracks at <b>91.4%</b> of the state urban median."
                 </p>
                 <div className="pt-3 border-t border-gray-800">
                    <div className="flex justify-between items-end mb-1.5">
                       <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Growth Velocity</span>
                       <span className="text-base font-black">{calculateChange(currentStats.averageWage, prevStats.averageWage)}</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
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