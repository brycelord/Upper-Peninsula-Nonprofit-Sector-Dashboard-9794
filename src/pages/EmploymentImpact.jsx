import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import StatCard from '../components/StatCard';
import QuickChart from '../components/QuickChart';
import * as FiIcons from 'react-icons/fi';

const { FiBriefcase, FiUsers, FiDollarSign, FiTrendingUp } = FiIcons;

const EmploymentImpact = () => {
  const [selectedMetric, setSelectedMetric] = useState('employment');

  const employmentStats = [
    {
      title: 'Total Employment',
      value: '34,562',
      change: '+8.7%',
      changeType: 'positive',
      icon: FiBriefcase,
      description: 'Full-time equivalent positions'
    },
    {
      title: 'Sector Share',
      value: '18.2%',
      change: '+1.3%',
      changeType: 'positive',
      icon: FiUsers,
      description: 'Of total UP employment'
    },
    {
      title: 'Total Payroll',
      value: '$1.2B',
      change: '+15.2%',
      changeType: 'positive',
      icon: FiDollarSign,
      description: 'Annual wages paid'
    },
    {
      title: 'Economic Impact',
      value: '$2.1B',
      change: '+12.8%',
      changeType: 'positive',
      icon: FiTrendingUp,
      description: 'Total economic contribution'
    }
  ];

  const employmentByCounty = {
    labels: ['Marquette', 'Houghton', 'Chippewa', 'Delta', 'Dickinson', 'Menominee', 'Gogebic', 'Others'],
    datasets: [{
      data: [8245, 6890, 5670, 4320, 3450, 2890, 2340, 757],
      backgroundColor: ['#14364D', '#035056', '#4CC0B0', '#CFD25B', '#F79651', '#FEF2DA', '#FFBD00', '#666666']
    }]
  };

  const employmentTrends = {
    labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    datasets: [{
      label: 'Nonprofit Employment',
      data: [28450, 29120, 29890, 30456, 31234, 31890, 32567, 31234, 33456, 34562],
      borderColor: '#4CC0B0',
      backgroundColor: 'rgba(76, 192, 176, 0.1)'
    }, {
      label: 'Total UP Employment',
      data: [156000, 159000, 162000, 165000, 168000, 171000, 174000, 169000, 185000, 190000],
      borderColor: '#14364D',
      backgroundColor: 'rgba(20, 54, 77, 0.1)'
    }]
  };

  const sectorEmployment = {
    labels: ['Healthcare', 'Education', 'Social Services', 'Arts & Culture', 'Environmental', 'Other'],
    datasets: [{
      data: [12567, 8934, 6789, 3245, 1890, 1137],
      backgroundColor: ['#14364D', '#035056', '#4CC0B0', '#CFD25B', '#F79651', '#666666']
    }]
  };

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
            Employment Impact
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze the employment contributions and economic impact of the nonprofit sector across Michigan's Upper Peninsula.
          </p>
        </motion.div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {employmentStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Metric Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow p-2 flex space-x-2">
            {[
              { key: 'employment', label: 'Employment Trends' },
              { key: 'counties', label: 'By County' },
              { key: 'sectors', label: 'By Sector' }
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setSelectedMetric(option.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedMetric === option.key
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            {selectedMetric === 'employment' && (
              <QuickChart 
                title="Employment Trends (2013-2022)"
                type="line"
                data={employmentTrends}
              />
            )}
            {selectedMetric === 'counties' && (
              <QuickChart 
                title="Employment by County (2022)"
                type="bar"
                data={employmentByCounty}
              />
            )}
            {selectedMetric === 'sectors' && (
              <QuickChart 
                title="Employment by Sector (2022)"
                type="pie"
                data={sectorEmployment}
              />
            )}
          </div>

          {/* Employment Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Breakdown</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-medium text-gray-900">Direct Employment</h4>
                <p className="text-2xl font-bold text-gray-900">34,562</p>
                <p className="text-sm text-gray-600">Full-time equivalent positions</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900">Indirect Jobs Supported</h4>
                <p className="text-2xl font-bold text-gray-900">18,450</p>
                <p className="text-sm text-gray-600">Through economic multiplier effects</p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-medium text-gray-900">Total Economic Impact</h4>
                <p className="text-2xl font-bold text-gray-900">53,012</p>
                <p className="text-sm text-gray-600">Direct + indirect employment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Employers</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Healthcare Systems</span>
                <span className="font-medium">12,567</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Educational Institutions</span>
                <span className="font-medium">8,934</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Social Services</span>
                <span className="font-medium">6,789</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Rates</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">10-Year Average</span>
                <span className="text-green-600 font-medium">+2.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">5-Year Average</span>
                <span className="text-green-600 font-medium">+3.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">2022 Growth</span>
                <span className="text-green-600 font-medium">+8.7%</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Economic Multiplier</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">1.53x</div>
              <p className="text-sm text-gray-600 mb-4">
                Every nonprofit job supports 0.53 additional jobs in the economy
              </p>
              <div className="text-sm text-gray-500">
                Based on regional input-output analysis
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EmploymentImpact;