import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
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
import { LAST_UPDATED } from '../constants';

const { FiDatabase, FiTrendingUp, FiInfo, FiUsers, FiFilter, FiBarChart2, FiClock, FiBook } = FiIcons;

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
      <div className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Value Proposition Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gray-900 text-white rounded-[32px] px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 p-2.5 bg-yellow-400 text-gray-900 rounded-xl shrink-0">
                <SafeIcon icon={FiInfo} className="text-lg" />
              </div>
              <div>
                <p className="text-base font-bold leading-snug text-white">
                  This dashboard helps policymakers, grantmakers, researchers, and community leaders discover and explore economic data for the Upper Peninsula nonprofit sector — covering employment, revenue, and organizational trends across all 15 UP counties.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['Nonprofit Executives', 'Grantmakers', 'Researchers', 'Students', 'Public-Sector Partners'].map(a => (
                    <span key={a} className="inline-block px-3 py-1 bg-white/10 text-yellow-300 rounded-full text-[10px] font-black uppercase tracking-wider">{a}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest shrink-0">
              <SafeIcon icon={FiClock} />
              Last updated: {LAST_UPDATED}
            </div>
          </motion.div>

          {/* How to Use This Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-10 bg-yellow-50 border border-yellow-200 rounded-[28px] px-8 py-6"
          >
            <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-yellow-700 mb-3 flex items-center gap-2">
              <SafeIcon icon={FiBook} /> How to use this dashboard
            </h2>
            <ul className="space-y-2">
              {[
                { icon: FiFilter, text: 'Use the filter bar above to narrow data by county, sector, year, or organization size.' },
                { icon: FiBarChart2, text: 'Compare counties or sectors side-by-side on the Geographic Analysis and Sector Overview pages.' },
                { icon: FiTrendingUp, text: 'Explore multi-year trends and growth trajectories on the Historical Trends page.' },
                { icon: FiInfo, text: 'Review data sources, confidence scores, and methodology on the Integrity and Methodology pages.' },
              ].map(({ icon, text }, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-yellow-900 font-medium">
                  <SafeIcon icon={icon} className="shrink-0 mt-0.5 text-yellow-600" />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-900 text-yellow-400 rounded-3xl flex items-center justify-center shadow-2xl">
                <SafeIcon icon={FiDatabase} className="text-xl" />
              </div>
              <div>
                <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic uppercase leading-none">Regional Intelligence</h1>
                <p className="text-gray-400 font-bold text-[11px] uppercase tracking-[0.3em] mt-2">
                  Interactive Data Core — {filters.county !== 'All' ? filters.county : 'Upper Peninsula'}
                </p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-4 px-6 py-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-2 bg-yellow-50 text-yellow-600 rounded-xl">
                <SafeIcon icon={FiTrendingUp} />
              </div>
              <div>
                <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">Growth Index</span>
                <span className="text-sm font-black text-gray-900">+{calculateChange(currentStats.revenue, prevStats.revenue)} Velocity</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {displayStats.map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <TrendingMetrics filters={filters} />
              <CaseStudySection selectedCounty={filters.county} />
            </div>
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 h-[400px]">
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