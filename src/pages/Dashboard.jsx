import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import StatCard from '../components/StatCard';
import TrendingMetrics from '../components/TrendingMetrics';
import InteractiveMap from '../components/InteractiveMap';
import TrendAlerts from '../components/TrendAlerts';
import CaseStudySection from '../components/CaseStudySection';
import { getAggregates } from '../services/dataService';
import { useFilters } from '../context/FilterContext';
import * as FiIcons from 'react-icons/fi';

const { FiDatabase, FiTrendingUp } = FiIcons;

const Dashboard = () => {
  const { filters } = useFilters();

  const currentStats = useMemo(() => getAggregates(filters), [filters]);
  const prevStats = useMemo(() => getAggregates({...filters, year: filters.year - 1}), [filters]);

  const calculateChange = (current, prev) => {
    if (!prev || prev === 0) return '+0.0%';
    const pct = ((current - prev) / prev) * 100;
    return `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;
  };

  const displayStats = [
    { title: 'Active Nonprofits', value: currentStats.count.toLocaleString(), change: calculateChange(currentStats.count, prevStats.count), changeType: currentStats.count >= prevStats.count ? 'positive' : 'negative', icon: FiIcons.FiUsers, description: `Total active entities in current view.` },
    { title: 'Sector Workforce', value: currentStats.employment.toLocaleString(), change: calculateChange(currentStats.employment, prevStats.employment), changeType: currentStats.employment >= prevStats.employment ? 'positive' : 'negative', icon: FiIcons.FiBriefcase, description: 'Full-time equivalent roles.' },
    { title: 'Annual Revenue', value: `$${(currentStats.revenue / 1e9).toFixed(2)}B`, change: calculateChange(currentStats.revenue, prevStats.revenue), changeType: currentStats.revenue >= prevStats.revenue ? 'positive' : 'negative', icon: FiIcons.FiDollarSign, description: 'Aggregate gross receipts.' },
    { title: 'Total Assets', value: `$${(currentStats.assets / 1e9).toFixed(2)}B`, change: calculateChange(currentStats.assets, prevStats.assets), changeType: currentStats.assets >= prevStats.assets ? 'positive' : 'negative', icon: FiIcons.FiTrendingUp, description: 'Cumulative holdings.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow py-4 md:py-6">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gray-900 text-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
                <SafeIcon icon={FiDatabase} className="text-lg" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter italic uppercase leading-none">Regional Intelligence</h1>
                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.25em] mt-1">
                  Interactive Data Core — {filters.county !== 'All' ? filters.county : 'Upper Peninsula'}
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3 px-4 py-2.5 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-1.5 bg-yellow-50 text-yellow-600 rounded-lg">
                <SafeIcon icon={FiTrendingUp} />
              </div>
              <div>
                <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">Growth Index</span>
                <span className="text-xs font-black text-gray-900">+{calculateChange(currentStats.revenue, prevStats.revenue)} Velocity</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
            {displayStats.map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 space-y-4">
              <TrendingMetrics filters={filters} />
              <CaseStudySection selectedCounty={filters.county} />
            </div>
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 h-80 md:h-96">
                <InteractiveMap activeCounty={filters.county === 'All' ? 'Marquette County' : filters.county} />
              </div>
              <TrendAlerts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;