import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import QuickChart from '../components/QuickChart';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiCalendar, FiBarChart3, FiActivity } = FiIcons;

const HistoricalTrends = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('full');
  const [selectedMetric, setSelectedMetric] = useState('organizations');

  const fullPeriodData = {
    organizations: {
      labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      datasets: [{
        label: 'Total Organizations',
        data: [2234, 2298, 2365, 2421, 2489, 2556, 2634, 2598, 2723, 2847],
        borderColor: '#4CC0B0',
        backgroundColor: 'rgba(76, 192, 176, 0.1)'
      }]
    },
    employment: {
      labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      datasets: [{
        label: 'Employment',
        data: [28450, 29120, 29890, 30456, 31234, 31890, 32567, 31234, 33456, 34562],
        borderColor: '#14364D',
        backgroundColor: 'rgba(20, 54, 77, 0.1)'
      }]
    },
    wages: {
      labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      datasets: [{
        label: 'Average Wage',
        data: [28500, 29200, 30200, 30800, 31800, 32100, 32900, 33100, 33800, 34720],
        borderColor: '#FFBD00',
        backgroundColor: 'rgba(255, 189, 0, 0.1)'
      }]
    }
  };

  const recentData = {
    organizations: {
      labels: ['2018', '2019', '2020', '2021', '2022'],
      datasets: [{
        label: 'Total Organizations',
        data: [2556, 2634, 2598, 2723, 2847],
        borderColor: '#4CC0B0',
        backgroundColor: 'rgba(76, 192, 176, 0.1)'
      }]
    },
    employment: {
      labels: ['2018', '2019', '2020', '2021', '2022'],
      datasets: [{
        label: 'Employment',
        data: [31890, 32567, 31234, 33456, 34562],
        borderColor: '#14364D',
        backgroundColor: 'rgba(20, 54, 77, 0.1)'
      }]
    },
    wages: {
      labels: ['2018', '2019', '2020', '2021', '2022'],
      datasets: [{
        label: 'Average Wage',
        data: [32100, 32900, 33100, 33800, 34720],
        borderColor: '#FFBD00',
        backgroundColor: 'rgba(255, 189, 0, 0.1)'
      }]
    }
  };

  const growthRates = [
    { period: '2013-2022', organizations: 27.4, employment: 21.5, wages: 21.8 },
    { period: '2018-2022', organizations: 11.4, employment: 8.4, wages: 8.2 },
    { period: '2021-2022', organizations: 4.6, employment: 3.3, wages: 2.7 }
  ];

  const currentData = selectedPeriod === 'full' ? fullPeriodData : recentData;

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
            Historical Trends
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track the evolution of Michigan's Upper Peninsula nonprofit sector from 2013-2022, analyzing long-term patterns and growth trajectories.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          {/* Period Selector */}
          <div className="bg-white rounded-lg shadow p-2 flex space-x-2">
            <button
              onClick={() => setSelectedPeriod('full')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === 'full'
                  ? 'bg-yellow-400 text-black'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <SafeIcon icon={FiCalendar} className="w-4 h-4" />
              <span>2013-2022</span>
            </button>
            <button
              onClick={() => setSelectedPeriod('recent')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === 'recent'
                  ? 'bg-yellow-400 text-black'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <SafeIcon icon={FiActivity} className="w-4 h-4" />
              <span>2018-2022</span>
            </button>
          </div>

          {/* Metric Selector */}
          <div className="bg-white rounded-lg shadow p-2 flex space-x-2">
            {[
              { key: 'organizations', label: 'Organizations', icon: FiBarChart3 },
              { key: 'employment', label: 'Employment', icon: FiTrendingUp },
              { key: 'wages', label: 'Wages', icon: FiActivity }
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setSelectedMetric(option.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedMetric === option.key
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <SafeIcon icon={option.icon} className="w-4 h-4" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Chart */}
        <div className="mb-8">
          <QuickChart 
            title={`${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Trends`}
            type="line"
            data={currentData[selectedMetric]}
          />
        </div>

        {/* Growth Rate Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Growth Rate Analysis</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Period</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Organizations</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Employment</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Average Wages</th>
                </tr>
              </thead>
              <tbody>
                {growthRates.map((rate, index) => (
                  <motion.tr
                    key={rate.period}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">{rate.period}</td>
                    <td className="py-3 px-4 text-green-600 font-medium">+{rate.organizations}%</td>
                    <td className="py-3 px-4 text-green-600 font-medium">+{rate.employment}%</td>
                    <td className="py-3 px-4 text-green-600 font-medium">+{rate.wages}%</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Milestones</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">2020</p>
                  <p className="text-sm text-gray-600">COVID-19 impact on employment</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">2021-2022</p>
                  <p className="text-sm text-gray-600">Strong recovery and growth</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">2013-2019</p>
                  <p className="text-sm text-gray-600">Steady sector expansion</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Analysis</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Consistent growth in organization count</li>
              <li>• Employment resilience during 2020</li>
              <li>• Wage growth outpacing inflation</li>
              <li>• Accelerated growth in recent years</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Future Outlook</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-900">Projected Growth</p>
                <p className="text-sm text-gray-600">3-5% annually through 2025</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Key Drivers</p>
                <p className="text-sm text-gray-600">Healthcare expansion, aging population</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Challenges</p>
                <p className="text-sm text-gray-600">Workforce recruitment, funding</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalTrends;