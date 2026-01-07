import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import StatCard from '../components/StatCard';
import QuickChart from '../components/QuickChart';
import * as FiIcons from 'react-icons/fi';

const { FiDollarSign, FiTrendingUp, FiBarChart3, FiUsers } = FiIcons;

const CompensationInsights = () => {
  const [selectedView, setSelectedView] = useState('trends');

  const compensationStats = [
    {
      title: 'Average Wage',
      value: '$34,720',
      change: '+6.1%',
      changeType: 'positive',
      icon: FiDollarSign,
      description: 'Annual compensation per employee'
    },
    {
      title: 'Median Wage',
      value: '$31,450',
      change: '+5.8%',
      changeType: 'positive',
      icon: FiUsers,
      description: 'Middle point of wage distribution'
    },
    {
      title: 'Total Payroll',
      value: '$1.2B',
      change: '+15.2%',
      changeType: 'positive',
      icon: FiTrendingUp,
      description: 'Total wages paid annually'
    },
    {
      title: 'vs State Average',
      value: '92%',
      change: '+2.1%',
      changeType: 'positive',
      icon: FiBarChart3,
      description: 'Compared to Michigan average'
    }
  ];

  const wageTrends = {
    labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    datasets: [{
      label: 'Nonprofit Average',
      data: [28500, 29200, 30200, 30800, 31800, 32100, 32900, 33100, 33800, 34720],
      borderColor: '#4CC0B0',
      backgroundColor: 'rgba(76, 192, 176, 0.1)'
    }, {
      label: 'State Average',
      data: [32100, 32800, 33600, 34200, 35100, 35800, 36500, 36900, 37400, 37800],
      borderColor: '#14364D',
      backgroundColor: 'rgba(20, 54, 77, 0.1)'
    }]
  };

  const sectorWages = {
    labels: ['Healthcare', 'Education', 'Social Services', 'Arts & Culture', 'Environmental', 'Other'],
    datasets: [{
      data: [42500, 38200, 28900, 26800, 31200, 29500],
      backgroundColor: ['#14364D', '#035056', '#4CC0B0', '#CFD25B', '#F79651', '#666666']
    }]
  };

  const wageDistribution = {
    labels: ['<$25K', '$25-35K', '$35-45K', '$45-55K', '$55-65K', '>$65K'],
    datasets: [{
      data: [18, 32, 28, 15, 5, 2],
      backgroundColor: ['#FEF2DA', '#F79651', '#CFD25B', '#4CC0B0', '#035056', '#14364D']
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
            Compensation Insights
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze wage patterns, compensation trends, and salary distributions across the nonprofit sector in Michigan's Upper Peninsula.
          </p>
        </motion.div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {compensationStats.map((stat, index) => (
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

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow p-2 flex space-x-2">
            {[
              { key: 'trends', label: 'Wage Trends' },
              { key: 'sectors', label: 'By Sector' },
              { key: 'distribution', label: 'Distribution' }
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setSelectedView(option.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedView === option.key
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
            {selectedView === 'trends' && (
              <QuickChart 
                title="Wage Trends Comparison (2013-2022)"
                type="line"
                data={wageTrends}
              />
            )}
            {selectedView === 'sectors' && (
              <QuickChart 
                title="Average Wages by Sector (2022)"
                type="bar"
                data={sectorWages}
              />
            )}
            {selectedView === 'distribution' && (
              <QuickChart 
                title="Wage Distribution (% of employees)"
                type="pie"
                data={wageDistribution}
              />
            )}
          </div>

          {/* Compensation Analysis */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Wage Analysis</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Growth Rate Analysis</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">10-Year Growth</span>
                    <span className="text-green-600 font-medium">+21.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">5-Year Growth</span>
                    <span className="text-green-600 font-medium">+8.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Annual Average</span>
                    <span className="text-green-600 font-medium">+2.0%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sector Comparison</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Healthcare</span>
                    <span className="font-medium">$42,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Education</span>
                    <span className="font-medium">$38,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Environmental</span>
                    <span className="font-medium">$31,200</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Regional Context</h4>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    Nonprofit wages in the UP are 92% of the Michigan state average, 
                    reflecting regional cost of living differences while maintaining 
                    competitive compensation within the local market.
                  </p>
                </div>
              </div>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Highest Paying Sectors</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Healthcare</span>
                <span className="font-medium">$42,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Education</span>
                <span className="font-medium">$38,200</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Environmental</span>
                <span className="font-medium">$31,200</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Compensation</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Health Insurance</span>
                <span className="font-medium">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Retirement Plans</span>
                <span className="font-medium">72%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Professional Development</span>
                <span className="font-medium">65%</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Findings</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Steady wage growth over the decade</li>
              <li>• Healthcare leads in compensation</li>
              <li>• Competitive benefits packages</li>
              <li>• Regional wage parity maintained</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CompensationInsights;