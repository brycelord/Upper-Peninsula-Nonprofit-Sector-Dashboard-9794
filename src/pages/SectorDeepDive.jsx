import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import QuickChart from '../components/QuickChart';
import { getTopOrganizations, SECTORS, getAggregates } from '../services/dataService';
import * as FiIcons from 'react-icons/fi';

const { FiActivity, FiArrowRight, FiAward, FiDollarSign, FiUsers, FiTrendingUp } = FiIcons;

const SectorDeepDive = () => {
  const [selectedSector, setSelectedSector] = useState('Health Services');
  const topOrgs = useMemo(() => getTopOrganizations(selectedSector, 8), [selectedSector]);
  const aggregates = useMemo(() => getAggregates({ sector: selectedSector }), [selectedSector]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-3xl shadow-xl p-4 border border-gray-100 sticky top-24">
              <h3 className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-4">
                Sector Navigation
              </h3>
              <div className="space-y-1">
                {SECTORS.map(s => (
                  <button 
                    key={s}
                    onClick={() => setSelectedSector(s)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-tight transition-all flex items-center justify-between group ${selectedSector === s ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {s}
                    <SafeIcon icon={FiArrowRight} className={`transition-transform ${selectedSector === s ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:opacity-100'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-8">
            <motion.div 
              key={selectedSector}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic uppercase">{selectedSector}</h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2">Verified Sector Intelligence v3.0</p>
                  </div>
                  <div className="p-4 bg-yellow-400 text-black rounded-2xl shadow-xl">
                    <SafeIcon icon={FiActivity} className="text-2xl" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Active Orgs</span>
                    <div className="text-2xl font-black">{aggregates.count}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Sector Revenue</span>
                    <div className="text-2xl font-black text-blue-600">${(aggregates.revenue / 1e6).toFixed(1)}M</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Workforce FTE</span>
                    <div className="text-2xl font-black text-teal-600">{aggregates.employment.toLocaleString()}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Avg Wage</span>
                    <div className="text-2xl font-black text-yellow-600">${Math.round(aggregates.averageWage).toLocaleString()}</div>
                  </div>
                </div>

                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <SafeIcon icon={FiAward} className="text-yellow-500" />
                  Top Verified Performers (by Revenue)
                </h3>
                
                <div className="space-y-3">
                  {topOrgs.map((org, idx) => (
                    <div key={org.ein} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-yellow-400 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-xs font-black shadow-sm group-hover:bg-yellow-400">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="text-sm font-black text-gray-900 uppercase tracking-tight">{org.name}</div>
                          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{org.county} County • {org.ein}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-gray-900">${(org.revenue / 1e6).toFixed(1)}M</div>
                        <div className="text-[9px] font-bold text-teal-600 uppercase">{org.employees} Employees</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <SafeIcon icon={FiTrendingUp} className="text-blue-600" />
                    Wage Competitiveness
                  </h3>
                  <div className="h-[250px]">
                    <QuickChart 
                      title="" 
                      type="bar" 
                      data={{
                        labels: topOrgs.map(o => o.name.substring(0, 15) + '...'),
                        datasets: [{ data: topOrgs.map(o => o.wage_avg), backgroundColor: '#14364D' }]
                      }} 
                    />
                  </div>
                </div>
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <SafeIcon icon={FiUsers} className="text-teal-600" />
                    Employment Density
                  </h3>
                  <div className="h-[250px]">
                    <QuickChart 
                      title="" 
                      type="line" 
                      data={{
                        labels: topOrgs.map(o => o.name.substring(0, 15) + '...'),
                        datasets: [{ data: topOrgs.map(o => o.employees), borderColor: '#4CC0B0', backgroundColor: 'rgba(76,192,176,0.1)' }]
                      }} 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorDeepDive;