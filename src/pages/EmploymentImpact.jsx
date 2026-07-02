import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import StatCard from '../components/StatCard';
import QuickChart from '../components/QuickChart';
import { getAggregates, getTrendData, getSectorAggregates, getCountyAggregates } from '../services/dataService';
import { useFilters } from '../context/FilterContext';
import * as FiIcons from 'react-icons/fi';

const { FiBriefcase, FiUsers, FiDollarSign, FiTrendingUp, FiActivity } = FiIcons;

const EmploymentImpact = () => {
  const { filters } = useFilters();
  const [selectedMetric, setSelectedMetric] = useState('trends');

  const currentStats = useMemo(() => getAggregates(filters), [filters]);
  const prevStats = useMemo(() => getAggregates({ ...filters, year: filters.year - 1 }), [filters]);

  const calculateChange = (current, prev) => {
    if (!prev || prev === 0) return '+0.0%';
    const pct = ((current - prev) / prev) * 100;
    return `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;
  };

  const employmentStats = [
    { 
      title: 'Sector Workforce', 
      value: currentStats.employment.toLocaleString(), 
      change: calculateChange(currentStats.employment, prevStats.employment), 
      changeType: currentStats.employment >= prevStats.employment ? 'positive' : 'negative', 
      icon: FiBriefcase, 
      description: 'Total Full-Time Equivalent (FTE) roles.' 
    },
    { 
      title: 'Economic Velocity', 
      value: `$${(currentStats.revenue * 1.32 / 1e6).toFixed(1)}M`, 
      change: calculateChange(currentStats.revenue, prevStats.revenue), 
      changeType: 'positive', 
      icon: FiTrendingUp, 
      description: 'Direct spend + estimated local multiplier.' 
    },
    { 
      title: 'Total Payroll', 
      value: `$${((currentStats.employment * currentStats.averageWage) / 1e6).toFixed(1)}M`, 
      change: calculateChange(currentStats.averageWage, prevStats.averageWage), 
      changeType: 'positive', 
      icon: FiDollarSign, 
      description: 'Estimated annual regional compensation.' 
    },
    { 
      title: 'Org Density', 
      value: currentStats.count, 
      change: calculateChange(currentStats.count, prevStats.count), 
      changeType: 'neutral', 
      icon: FiActivity, 
      description: 'Active entities in filtered scope.' 
    }
  ];

  const trendData = useMemo(() => getTrendData('employment', filters.county, filters.sector), [filters]);
  const sectorData = useMemo(() => getSectorAggregates(filters.year), [filters.year]);
  const countyData = useMemo(() => getCountyAggregates(filters.year), [filters.year]);

  const charts = {
    trends: {
      type: 'line',
      data: {
        labels: trendData.map(d => d.year),
        datasets: [{
          label: 'FTE Workforce',
          data: trendData.map(d => d.value),
          borderColor: '#095339',
          backgroundColor: 'rgba(9, 83, 57, 0.12)'
        }]
      }
    },
    sectors: {
      type: 'pie',
      data: {
        labels: sectorData.map(s => s.name),
        datasets: [{
          data: sectorData.map(s => s.employment),
          backgroundColor: ['#095339', '#ffc425', '#0d7a53', '#ffd966', '#053726', '#e5ac00', '#6b7280']
        }]
      }
    },
    counties: {
      type: 'bar',
      data: {
        labels: countyData.map(c => c.name.split(' ')[0]),
        datasets: [{
          data: countyData.map(c => c.employment),
          backgroundColor: '#ffc425'
        }]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-6">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase mb-1">Workforce Impact</h1>
          <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">
            {filters.county} • {filters.sector} • FY {filters.year} Analysis
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
          {employmentStats.map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 md:p-5 border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="text-base md:text-lg font-black uppercase tracking-tighter">Workforce Distribution</h3>
            <div className="flex bg-gray-100 p-1 rounded-xl gap-1">
              {['trends', 'sectors', 'counties'].map(v => (
                <button
                  key={v}
                  onClick={() => setSelectedMetric(v)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    selectedMetric === v ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72 md:h-80 lg:h-96">
            <QuickChart title="" type={charts[selectedMetric].type} data={charts[selectedMetric].data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploymentImpact;