import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import QuickChart from '../components/QuickChart';
import * as FiIcons from 'react-icons/fi';

const { FiPieChart, FiBarChart3, FiFilter } = FiIcons;

const SectorOverview = () => {
  const [selectedView, setSelectedView] = useState('distribution');

  const sectorData = {
    labels: ['Healthcare & Medical', 'Education', 'Human Services', 'Arts & Culture', 'Environmental', 'Religious', 'Community Development', 'Other'],
    datasets: [{
      data: [28, 22, 18, 12, 8, 7, 3, 2],
      backgroundColor: ['#14364D', '#035056', '#4CC0B0', '#CFD25B', '#F79651', '#FEF2DA', '#FFBD00', '#666666']
    }]
  };

  const growthData = {
    labels: ['2018', '2019', '2020', '2021', '2022'],
    datasets: [{
      data: [2556, 2634, 2598, 2723, 2847],
      backgroundColor: '#4CC0B0'
    }]
  };

  const sectorDetails = [
    {
      name: 'Healthcare & Medical',
      count: 798,
      percentage: 28,
      growth: '+15.2%',
      description: 'Hospitals, clinics, medical research'
    },
    {
      name: 'Education',
      count: 626,
      percentage: 22,
      growth: '+8.7%',
      description: 'Schools, universities, training programs'
    },
    {
      name: 'Human Services',
      count: 512,
      percentage: 18,
      growth: '+12.1%',
      description: 'Social services, welfare organizations'
    },
    {
      name: 'Arts & Culture',
      count: 341,
      percentage: 12,
      growth: '+6.3%',
      description: 'Museums, theaters, cultural centers'
    },
    {
      name: 'Environmental',
      count: 228,
      percentage: 8,
      growth: '+18.9%',
      description: 'Conservation, environmental protection'
    },
    {
      name: 'Religious',
      count: 199,
      percentage: 7,
      growth: '+2.1%',
      description: 'Churches, religious organizations'
    },
    {
      name: 'Community Development',
      count: 85,
      percentage: 3,
      growth: '+25.4%',
      description: 'Housing, economic development'
    },
    {
      name: 'Other',
      count: 58,
      percentage: 2,
      growth: '+5.7%',
      description: 'Various other nonprofit activities'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'futura-pt, sans-serif' }}>
            Sector Overview
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the distribution and composition of nonprofit organizations across different sectors in Michigan's Upper Peninsula.
          </p>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow p-2 flex space-x-2">
            <button
              onClick={() => setSelectedView('distribution')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === 'distribution'
                  ? 'bg-yellow-400 text-black'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <SafeIcon icon={FiPieChart} className="w-4 h-4" />
              <span>Distribution</span>
            </button>
            <button
              onClick={() => setSelectedView('growth')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === 'growth'
                  ? 'bg-yellow-400 text-black'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <SafeIcon icon={FiBarChart3} className="w-4 h-4" />
              <span>Growth Trends</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Chart */}
          <div>
            {selectedView === 'distribution' ? (
              <QuickChart 
                title="Organizations by Sector (2022)"
                type="pie"
                data={sectorData}
              />
            ) : (
              <QuickChart 
                title="Total Organizations Growth (2018-2022)"
                type="bar"
                data={growthData}
              />
            )}
          </div>

          {/* Sector Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <SafeIcon icon={FiFilter} className="w-5 h-5" />
              <span>Sector Breakdown</span>
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {sectorDetails.map((sector, index) => (
                <motion.div
                  key={sector.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-4 border-yellow-400 pl-4 py-2"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-gray-900">{sector.name}</h4>
                    <span className="text-green-600 text-sm font-medium">{sector.growth}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-gray-900">{sector.count}</span>
                    <span className="text-sm text-gray-500">{sector.percentage}%</span>
                  </div>
                  <p className="text-sm text-gray-600">{sector.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fastest Growing</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Community Development</span>
                <span className="text-green-600 font-medium">+25.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Environmental</span>
                <span className="text-green-600 font-medium">+18.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Healthcare</span>
                <span className="text-green-600 font-medium">+15.2%</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Largest Sectors</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Healthcare & Medical</span>
                <span className="font-medium">798 orgs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Education</span>
                <span className="font-medium">626 orgs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Human Services</span>
                <span className="font-medium">512 orgs</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Healthcare dominates with 28% of organizations</li>
              <li>• Community development showing rapid growth</li>
              <li>• Environmental sector gaining momentum</li>
              <li>• Strong presence across all major sectors</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectorOverview;