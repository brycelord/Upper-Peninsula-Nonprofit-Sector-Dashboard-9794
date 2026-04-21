import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import QuickChart from '../components/QuickChart';
import SectorGlossary from '../components/SectorGlossary';
import { getSectorAggregates } from '../services/dataService';
import { useFilters } from '../context/FilterContext';
import * as FiIcons from 'react-icons/fi';

const { FiPieChart, FiHelpCircle } = FiIcons;

const SectorOverview = () => {
  const { filters } = useFilters();
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const sectorData = useMemo(() => getSectorAggregates(filters.year), [filters.year]);
  const totalOrgs = sectorData.reduce((acc, s) => acc + s.count, 0);

  const chartData = {
    labels: sectorData.map(s => s.name),
    datasets: [{
      data: sectorData.map(s => s.count),
      backgroundColor: ['#095339', '#ffc425', '#0d7a53', '#ffd966', '#053726', '#e5ac00', '#1f2937', '#6b7280', '#9ca3af', '#d1d5db']
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SectorGlossary isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-900 text-yellow-400 rounded-2xl flex items-center justify-center shadow-xl">
              <SafeIcon icon={FiPieChart} />
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase">Sector Analysis</h1>
          </div>
          <button 
            onClick={() => setIsGlossaryOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100 shadow-sm"
          >
            <SafeIcon icon={FiHelpCircle} className="text-yellow-500" /> NTEE Glossary
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-8 italic">
                {filters.county === 'All' ? 'Regional' : filters.county} Mix (FY {filters.year})
              </h3>
              <QuickChart title="" type="pie" data={chartData} />
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 text-white h-full overflow-y-auto max-h-[600px]">
              <h3 className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-6">Sector Metrics</h3>
              <div className="space-y-6">
                {sectorData.map((sector) => (
                  <div key={sector.name} className="border-b border-gray-800 pb-4">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-gray-400">{sector.name}</span>
                      <span className="text-lg font-black">{sector.count} <span className="text-[10px] text-gray-500 uppercase">Orgs</span></span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${(sector.count / (totalOrgs || 1)) * 100}%` }} 
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

export default SectorOverview;