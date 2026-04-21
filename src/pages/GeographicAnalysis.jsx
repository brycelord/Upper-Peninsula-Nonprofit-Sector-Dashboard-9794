import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import InteractiveMap from '../components/InteractiveMap';
import CountyDataGrid from '../components/CountyDataGrid';
import CountyComparisonTool from '../components/CountyComparisonTool';
import ImpactAnalysisMetrics from '../components/ImpactAnalysisMetrics';
import CountyDeepProfile from '../components/CountyDeepProfile';
import DataConfidenceBadge from '../components/DataConfidenceBadge';
import PrintableCountyReport from '../components/PrintableCountyReport';
import { getCountyAggregates } from '../services/dataService';
import { useFilters } from '../context/FilterContext';
import * as FiIcons from 'react-icons/fi';

const { FiMap, FiShield } = FiIcons;

const GeographicAnalysis = () => {
  const { filters, setFilters } = useFilters();
  const [searchParams] = useSearchParams();
  
  // Local state for the detail view, synchronized with global county filter
  const [selectedCountyName, setSelectedCountyName] = useState(filters.county === 'All' ? 'Marquette County' : filters.county);

  const countyData = useMemo(() => getCountyAggregates(filters.year), [filters.year]);

  // Synchronize local selection with global filter bar
  useEffect(() => {
    if (filters.county !== 'All' && filters.county !== selectedCountyName) {
      setSelectedCountyName(filters.county);
    }
  }, [filters.county]);

  // Handle map selection - optionally update the global filter too
  const handleCountySelection = (name) => {
    setSelectedCountyName(name);
    // If we want the map to drive the global filter:
    // setFilters(prev => ({ ...prev, county: name }));
  };

  const selectedCounty = useMemo(() => 
    countyData.find(c => c.name === selectedCountyName) || countyData[0],
    [selectedCountyName, countyData]
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-6">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-md">
                <SafeIcon icon={FiMap} className="text-xl text-yellow-400" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter italic uppercase">Geospatial Analysis</h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  FY {filters.year} Verified Data Reliability System
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PrintableCountyReport county={selectedCounty} />
              <div className="hidden md:flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm border border-gray-100">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-100 pr-2">Integrity</span>
                <div className="flex items-center gap-1 text-xs font-black text-green-600 uppercase">
                  <SafeIcon icon={FiShield} /> Verified
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-[480px] md:h-[540px]">
              <div className="px-4 py-2.5 bg-gray-900 text-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" />
                  <span className="font-black uppercase tracking-widest text-xs">Regional Heatmap: {selectedCountyName}</span>
                </div>
              </div>
              <div className="flex-grow">
                <InteractiveMap onSelectCounty={handleCountySelection} activeCounty={selectedCountyName} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div key={selectedCountyName} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="bg-gray-900 rounded-2xl p-4 md:p-5 text-white shadow-lg border-t-4 border-yellow-400">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter leading-none">{selectedCountyName}</h2>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Regional Profile</p>
                    </div>
                    <DataConfidenceBadge score={selectedCounty.confidence} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between border-b border-gray-800 pb-1.5">
                      <span className="text-xs text-gray-400">Annual Revenue</span>
                      <span className="text-sm font-black text-yellow-400">${(selectedCounty.revenue / 1e6).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Employee Base</span>
                      <span className="text-sm font-black text-teal-400">{selectedCounty.employment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <ImpactAnalysisMetrics county={selectedCounty} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mb-4">
          <CountyDeepProfile county={selectedCounty} allCounties={countyData} />
        </div>

        <CountyComparisonTool data={countyData} />

        <div className="mt-6">
          <CountyDataGrid data={countyData} selectedCounty={selectedCountyName} onRowClick={handleCountySelection} />
        </div>
      </div>
    </div>
  );
};

export default GeographicAnalysis;