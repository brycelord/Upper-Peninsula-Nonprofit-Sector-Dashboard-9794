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
    <div className="min-h-screen bg-gray-50 py-4 md:py-6">
      <SectorGlossary isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 text-yellow-400 rounded-xl flex items-center justify-center shadow-md">
              <SafeIcon icon={FiPieChart} />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase">Sector Analysis</h1>
          </div>
          <button
            onClick={() => setIsGlossaryOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-[10px] font-black uppercase tracking-widest border border-gray-100 shadow-sm"
          >
            <SafeIcon icon={FiHelpCircle} className="text-yellow-500" /> NTEE Glossary
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-5 border border-gray-100">
              <h3 className="text-base font-black uppercase tracking-tighter mb-3">
                {filters.county === 'All' ? 'Regional' : filters.county} Mix (FY {filters.year})
              </h3>
              <QuickChart title="" type="pie" data={chartData} />
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-gray-900 rounded-2xl shadow-lg p-4 md:p-5 text-white h-full overflow-y-auto max-h-[560px]">
              <h3 className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-3">Sector Metrics</h3>
              <div className="space-y-3">
                {sectorData.map((sector) => (
                  <div key={sector.name} className="border-b border-gray-800 pb-2">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-xs text-gray-400">{sector.name}</span>
                      <span className="text-sm font-black">{sector.count} <span className="text-[9px] text-gray-500 uppercase">Orgs</span></span>
                    </div>
                    <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
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