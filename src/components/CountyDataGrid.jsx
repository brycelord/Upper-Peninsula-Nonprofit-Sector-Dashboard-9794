import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiChevronDown, FiChevronUp, FiFilter, FiActivity, FiUsers, FiDollarSign, FiMapPin } = FiIcons;

const CountyDataGrid = ({ data, onRowClick, selectedCounty }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'density', direction: 'desc' });

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name) => {
    if (sortConfig.key !== name) return <div className="w-3 h-3 opacity-0 group-hover:opacity-30">●</div>;
    return <SafeIcon icon={sortConfig.direction === 'asc' ? FiChevronUp : FiChevronDown} className="text-yellow-500" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="px-6 py-5 bg-gray-900 text-white flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-400 rounded-lg text-black">
                <SafeIcon icon={FiActivity} />
            </div>
            <div>
                <h3 className="text-lg font-bold" style={{ fontFamily: 'futura-pt, sans-serif' }}>County Economic Data Matrix</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Comparative Analysis Table</p>
            </div>
        </div>
        <div className="text-xs font-medium text-gray-400 flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg">
            <SafeIcon icon={FiFilter} />
            <span>Click headers to sort</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key: 'name', label: 'County', icon: FiMapPin, align: 'left' },
                { key: 'population', label: 'Population', icon: FiUsers, align: 'right' },
                { key: 'organizations', label: 'Nonprofits', icon: FiActivity, align: 'right' },
                { key: 'density', label: 'Density (per 1k)', icon: FiFilter, align: 'right' },
                { key: 'employment', label: 'Employment', icon: FiUsers, align: 'right' },
                { key: 'baseWage', label: 'Avg Wage', icon: FiDollarSign, align: 'right' },
              ].map((header) => (
                <th 
                  key={header.key}
                  onClick={() => requestSort(header.key)}
                  className={`px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest cursor-pointer hover:bg-gray-100 transition-colors group text-${header.align}`}
                >
                  <div className={`flex items-center gap-2 ${header.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                    {header.align === 'left' && getSortIcon(header.key)}
                    <span>{header.label}</span>
                    {header.align === 'right' && getSortIcon(header.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            <AnimatePresence>
              {sortedData.map((item, idx) => (
                <motion.tr 
                  key={item.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => onRowClick(item.name)}
                  className={`group cursor-pointer transition-all ${selectedCounty === item.name ? 'bg-yellow-50 border-l-4 border-yellow-400' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-bold ${selectedCounty === item.name ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {item.name}
                      </span>
                      {selectedCounty === item.name && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-yellow-200 text-yellow-800 uppercase tracking-tighter">Active</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-medium text-gray-500">{item.population.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-bold text-gray-900">{item.organizations}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                        <span className={`text-sm font-bold ${item.density > 8 ? 'text-green-600' : 'text-gray-700'}`}>{item.density.toFixed(2)}</span>
                        {item.density > 8 && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-medium text-gray-700">{item.employment.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`text-sm font-black ${selectedCounty === item.name ? 'text-teal-700' : 'text-teal-600'}`}>
                        ${item.baseWage.toLocaleString()}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
        <span>Displaying {data.length} Counties</span>
        <span>Data Source: 2022 IRS & QCEW Records</span>
      </div>
    </div>
  );
};

export default CountyDataGrid;