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
    <div className="min-h-screen bg-gray-50 py-4 md:py-6">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-md p-3 border border-gray-100 sticky top-24">
              <h3 className="px-3 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2">
                Sector Navigation
              </h3>
              <div className="space-y-0.5">
                {SECTORS.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSector(s)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-black uppercase tracking-tight transition-all flex items-center justify-between group ${selectedSector === s ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {s}
                    <SafeIcon icon={FiArrowRight} className={`transition-transform ${selectedSector === s ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:opacity-100'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-4">
            <motion.div
              key={selectedSector}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-4 md:p-5 shadow-md border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase">{selectedSector}</h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Verified Sector Intelligence v3.0</p>
                  </div>
                  <div className="p-2.5 bg-yellow-400 text-black rounded-xl shadow-md">
                    <SafeIcon icon={FiActivity} className="text-xl" />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
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

                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <SafeIcon icon={FiAward} className="text-yellow-500" />
                  Top Verified Performers (by Revenue)
                </h3>

                <div className="space-y-2">
                  {topOrgs.map((org, idx) => (
                    <div key={org.ein} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-100 hover:border-yellow-400 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 flex items-center justify-center bg-white rounded-md text-xs font-black shadow-sm group-hover:bg-yellow-400">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="text-xs font-black text-gray-900 uppercase tracking-tight">{org.name}</div>
                          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{org.county} County • {org.ein}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-black text-gray-900">${(org.revenue / 1e6).toFixed(1)}M</div>
                        <div className="text-[9px] font-bold text-teal-600 uppercase">{org.employees} Employees</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-md">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <SafeIcon icon={FiTrendingUp} className="text-blue-600" />
                    Wage Competitiveness
                  </h3>
                  <div className="h-56">
                    <QuickChart 
                      title="" 
                      type="bar" 
                      data={{
                        labels: topOrgs.map(o => o.name.substring(0, 15) + '...'),
                        datasets: [{ data: topOrgs.map(o => o.wage_avg), backgroundColor: '#095339' }]
                      }} 
                    />
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-md">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <SafeIcon icon={FiUsers} className="text-teal-600" />
                    Employment Density
                  </h3>
                  <div className="h-56">
                    <QuickChart 
                      title="" 
                      type="line" 
                      data={{
                        labels: topOrgs.map(o => o.name.substring(0, 15) + '...'),
                        datasets: [{ data: topOrgs.map(o => o.employees), borderColor: '#ffc425', backgroundColor: 'rgba(255,196,37,0.12)' }]
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