import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import StatCard from '../components/StatCard';
import QuickChart from '../components/QuickChart';
import InteractiveMap from '../components/InteractiveMap';
import TrendingMetrics from '../components/TrendingMetrics';
import UserGuidedStats from '../components/UserGuidedStats';
import InsightFeed from '../components/InsightFeed';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiBriefcase, FiDollarSign, FiTrendingUp, FiArrowRight, FiZap, FiStar } = FiIcons;

const Dashboard = () => {
  const [activeFocus, setActiveFocus] = useState('Overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const statsMap = {
    Overview: [
      { title: 'Total Nonprofits', value: '2,847', change: '+12.3%', changeType: 'positive', icon: FiUsers, description: 'Active organizations in 2022' },
      { title: 'Total Employment', value: '34,562', change: '+8.7%', changeType: 'positive', icon: FiBriefcase, description: 'Full-time equivalent jobs' },
      { title: 'Total Wages', value: '$1.2B', change: '+15.2%', changeType: 'positive', icon: FiDollarSign, description: 'Annual compensation paid' },
      { title: 'Economic Impact', value: '$2.1B', change: '+10.4%', changeType: 'positive', icon: FiTrendingUp, description: 'Total sector contribution' }
    ],
    Employment: [
      { title: 'Direct Jobs', value: '34,562', change: '+8.7%', changeType: 'positive', icon: FiBriefcase, description: 'Direct sector employees' },
      { title: 'Indirect Jobs', value: '18,450', change: '+4.2%', changeType: 'positive', icon: FiUsers, description: 'Multiplier effect estimate' },
      { title: 'Growth Index', value: '114.2', change: '+2.1%', changeType: 'positive', icon: FiTrendingUp, description: 'Employment baseline growth' },
      { title: 'Sector Retain', value: '92%', change: '+0.5%', changeType: 'positive', icon: FiZap, description: 'Employee retention rate' }
    ],
    Compensation: [
      { title: 'Average Wage', value: '$34,720', change: '+6.1%', changeType: 'positive', icon: FiDollarSign, description: 'Annual salary per FTE' },
      { title: 'Total Payroll', value: '$1.2B', change: '+15.2%', changeType: 'positive', icon: FiBriefcase, description: 'Cumulative wage payout' },
      { title: 'Wage Parity', value: '92%', change: '+1.8%', changeType: 'positive', icon: FiTrendingUp, description: 'vs Michigan State Average' },
      { title: 'Benefit Index', value: '7.8', change: '+0.4%', changeType: 'positive', icon: FiStar, description: 'Comp package rating' }
    ],
    Growth: [
      { title: 'New Entities', value: '+124', change: '+4.6%', changeType: 'positive', icon: FiTrendingUp, description: 'Net organization growth' },
      { title: 'Density Index', value: '8.43', change: '+1.2%', changeType: 'positive', icon: FiUsers, description: 'Orgs per 1,000 residents' },
      { title: 'Sector CAGR', value: '2.8%', change: '+0.2%', changeType: 'positive', icon: FiZap, description: 'Annual growth rate' },
      { title: 'Impact Tier', value: 'Tier 1', change: 'Stable', changeType: 'positive', icon: FiStar, description: 'Economic capacity rank' }
    ]
  };

  const currentStats = useMemo(() => statsMap[activeFocus] || statsMap.Overview, [activeFocus]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full mb-4" 
        />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 animate-pulse">Personalizing Experience</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User-Centric Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-900 text-yellow-400 rounded-2xl flex items-center justify-center shadow-xl">
                <SafeIcon icon={FiZap} className="text-2xl" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase" style={{ fontFamily: 'futura-pt, sans-serif' }}>
                  Your Dashboard
                </h1>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Regional Economic Intelligence</p>
              </div>
            </div>
            <p className="text-gray-600 max-w-xl font-medium leading-relaxed">
              Welcome back. We've updated the Upper Peninsula nonprofit metrics with the latest 2022 IRS filings and labor statistics.
            </p>
          </motion.div>
          
          <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-right">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Status</div>
              <div className="text-sm font-black text-green-600 flex items-center gap-2 justify-end">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Sector Growing
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Metric Focus Control */}
        <UserGuidedStats onMetricChange={setActiveFocus} />

        {/* Key Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <AnimatePresence mode="wait">
            {currentStats.map((stat, index) => (
              <motion.div 
                key={`${activeFocus}-${stat.title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Main Interface Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Central Analytics */}
          <div className="lg:col-span-8 space-y-8">
            <TrendingMetrics />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <QuickChart 
                  title="Regional Growth Velocity" 
                  type="bar" 
                  data={{
                    labels: ['Marquette', 'Houghton', 'Chippewa', 'Delta', 'Dickinson'],
                    datasets: [{
                      data: [12.4, 8.2, 7.5, 6.1, 5.8],
                      backgroundColor: ['#14364D', '#035056', '#4CC0B0', '#CFD25B', '#F79651']
                    }]
                  }} 
               />
               <QuickChart 
                  title="Wage Momentum (2018-2022)" 
                  type="line" 
                  data={{
                    labels: ['2018', '2019', '2020', '2021', '2022'],
                    datasets: [{
                      label: 'Avg Wage',
                      data: [32100, 32900, 33100, 33800, 34720],
                      borderColor: '#FFBD00',
                      backgroundColor: 'rgba(255,189,0,0.1)'
                    }]
                  }} 
               />
            </div>
          </div>

          {/* User Sidebar: Insights & Map */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
               <div className="p-4 bg-gray-900 text-white font-black uppercase text-[10px] tracking-widest flex items-center justify-between">
                  <span>Geospatial Hotspots</span>
                  <Link to="/geographic-analysis" className="text-yellow-400 hover:underline">Full Map</Link>
               </div>
               <div className="h-[280px]">
                  <InteractiveMap />
               </div>
            </div>

            <InsightFeed />
          </div>
        </div>

        {/* Navigation Quick Access */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Sector', path: '/sector-overview', icon: FiZap, color: 'text-blue-500' },
            { title: 'Growth', path: '/sector-growth', icon: FiTrendingUp, color: 'text-orange-500' },
            { title: 'Wages', path: '/compensation-insights', icon: FiDollarSign, color: 'text-teal-500' },
            { title: 'Explorer', path: '/data-explorer', icon: FiUsers, color: 'text-gray-900' }
          ].map((link, i) => (
            <Link 
              key={i} 
              to={link.path}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className={`w-10 h-10 mb-4 rounded-xl flex items-center justify-center bg-gray-50 ${link.color} group-hover:scale-110 transition-transform`}>
                <SafeIcon icon={link.icon} className="text-xl" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-1">{link.title}</h3>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 group-hover:text-yellow-600 transition-colors">
                View Report <SafeIcon icon={FiArrowRight} />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;