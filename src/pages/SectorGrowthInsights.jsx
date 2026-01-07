import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import QuickChart from '../components/QuickChart';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiPieChart, FiBarChart2, FiTarget, FiArrowUpRight, FiZap } = FiIcons;

const SectorGrowthInsights = () => {
  const sectors = [
    { id: 'hc', name: 'Healthcare', color: '#14364D', growth: 15.2, count: 798, cagr: 2.1, employment: 12567 },
    { id: 'edu', name: 'Education', color: '#035056', growth: 8.7, count: 626, cagr: 1.4, employment: 8934 },
    { id: 'hs', name: 'Human Services', color: '#4CC0B0', growth: 12.1, count: 512, cagr: 1.8, employment: 6789 },
    { id: 'arts', name: 'Arts & Culture', color: '#CFD25B', growth: 6.3, count: 341, cagr: 0.9, employment: 3245 },
    { id: 'env', name: 'Environmental', color: '#F79651', growth: 18.9, count: 228, cagr: 2.5, employment: 1890 },
    { id: 'cd', name: 'Comm. Development', color: '#FFBD00', growth: 25.4, count: 85, cagr: 3.2, employment: 1100 }
  ];

  // Growth Index Data (2013 = 100)
  const growthComparisonData = {
    labels: ['2013', '2015', '2017', '2019', '2021', '2022'],
    datasets: sectors.map(s => ({
      label: s.name,
      // Indexing growth from 100
      data: [
        100, 
        100 + (s.growth * 0.2), 
        100 + (s.growth * 0.45), 
        100 + (s.growth * 0.7), 
        100 + (s.growth * 0.9), 
        100 + s.growth
      ],
      borderColor: s.color,
      backgroundColor: 'transparent'
    }))
  };

  const performanceMatrix = {
    labels: sectors.map(s => s.name),
    datasets: [{
      label: 'Growth Rate (%)',
      data: sectors.map(s => s.growth),
      backgroundColor: sectors.map(s => s.color)
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-black uppercase tracking-widest mb-4 border border-yellow-200">
            <SafeIcon icon={FiZap} /> Deep Analytics
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: 'futura-pt, sans-serif' }}>
            Sector Growth Insights
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto border-b-2 border-yellow-400 pb-6">
            Longitudinal analysis of sector expansion, identifying high-growth emergence and economic stability across the UP nonprofit landscape.
          </p>
        </motion.div>

        {/* Top Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-xl border-l-8 border-orange-500">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Fastest Emerging</span>
              <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><SafeIcon icon={FiArrowUpRight} /></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Community Development</h3>
            <div className="text-3xl font-black text-orange-600 my-2">+25.4%</div>
            <p className="text-sm text-gray-500 font-medium">10-Year Growth Index</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-xl border-l-8 border-teal-600">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Most Stable</span>
              <div className="p-2 bg-teal-50 rounded-lg text-teal-600"><SafeIcon icon={FiTarget} /></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Healthcare Sector</h3>
            <div className="text-3xl font-black text-teal-600 my-2">2.1% CAGR</div>
            <p className="text-sm text-gray-500 font-medium">Consistent Annual Expansion</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-xl border-l-8 border-blue-900">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Economic Anchor</span>
              <div className="p-2 bg-blue-50 rounded-lg text-blue-900"><SafeIcon icon={FiBarChart2} /></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Education</h3>
            <div className="text-3xl font-black text-blue-900 my-2">8,934 Jobs</div>
            <p className="text-sm text-gray-500 font-medium">Total Sector Employment</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Growth Chart */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">Sector Growth Index (Base 100)</h2>
              <SafeIcon icon={FiTrendingUp} className="text-yellow-500 text-2xl" />
            </div>
            <div className="h-[400px]">
              <QuickChart title="" type="line" data={growthComparisonData} />
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-xs text-gray-500 leading-relaxed">
                <b>Note:</b> This index represents the normalized growth of each sector since 2013. A value of 125 indicates a 25% increase in organizational count since the baseline year.
              </p>
            </div>
          </div>

          {/* Performance Matrix Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gray-900 rounded-2xl shadow-xl p-8 text-white h-full">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <SafeIcon icon={FiPieChart} className="text-yellow-400" /> CAGR Analysis
              </h3>
              <div className="space-y-6">
                {sectors.map((s) => (
                  <div key={s.id} className="group cursor-default">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{s.name}</span>
                      <span className="text-lg font-black text-white">{s.cagr}%</span>
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(s.cagr / 3.5) * 100}%` }}
                        className="h-full rounded-full transition-all group-hover:brightness-125"
                        style={{ backgroundColor: s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800">
                <p className="text-xs text-gray-400 italic">
                  Compound Annual Growth Rate (CAGR) measures the mean annual growth rate over the 10-year period.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Growth Stats Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="px-8 py-6 bg-yellow-400 text-black flex items-center justify-between">
            <h3 className="text-xl font-black uppercase tracking-tight">Growth & Capacity Metrics by Sector</h3>
            <button className="text-xs bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition-all">
              Sector Comparison Report
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Sector', 'Orgs (2022)', '10Y Growth', 'CAGR', 'Employment', 'Economic Stability'].map(h => (
                    <th key={h} className="px-8 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {sectors.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                        <span className="text-sm font-bold text-gray-900">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-600 font-medium">{s.count}</td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
                        +{s.growth}%
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-900 font-black">{s.cagr}%</td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-600">{s.employment.toLocaleString()}</td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <div key={star} className={`w-2 h-2 rounded-full ${star <= (s.cagr > 2 ? 5 : 3) ? 'bg-yellow-400' : 'bg-gray-200'}`} />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorGrowthInsights;