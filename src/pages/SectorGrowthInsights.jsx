import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import QuickChart from '../components/QuickChart';
import { getSectorAggregates } from '../services/dataService';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiPieChart, FiZap } = FiIcons;

const SectorGrowthInsights = () => {
  const sectorData = useMemo(() => getSectorAggregates(), []);

  const totalRevenue = sectorData.reduce((acc, s) => acc + s.revenue, 0);

  const chartData = {
    labels: sectorData.map(s => s.name),
    datasets: [{
      label: 'Revenue by Sector',
      data: sectorData.map(s => s.revenue),
      backgroundColor: ['#095339', '#ffc425', '#0d7a53', '#ffd966', '#053726', '#e5ac00']
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-black uppercase tracking-widest mb-4 border border-yellow-200">
            <SafeIcon icon={FiZap} /> Live Analytics
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: 'futura-pt, sans-serif' }}>
            Sector Financial Insights
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto border-b-2 border-yellow-400 pb-6">
            Financial distribution across industries based on current ProPublica data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">Revenue Distribution</h2>
              <SafeIcon icon={FiTrendingUp} className="text-yellow-500 text-2xl" />
            </div>
            <div className="h-[400px]">
              <QuickChart title="" type="bar" data={chartData} />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-8 text-white h-full">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <SafeIcon icon={FiPieChart} className="text-yellow-400" /> Market Share
              </h3>
              <div className="space-y-6">
                {sectorData.map((s, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-sm font-bold text-gray-400 uppercase">{s.name}</span>
                      <span className="text-lg font-black text-white">{((s.revenue / totalRevenue) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${(s.revenue / totalRevenue) * 100}%` }} 
                        className="h-full bg-yellow-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorGrowthInsights;