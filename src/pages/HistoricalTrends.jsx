import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import VizFilterControls from '../components/VizFilterControls';
import DynamicMetricChart from '../components/DynamicMetricChart';
import TrajectoryEngine from '../components/TrajectoryEngine';
import { getTrendData, COUNTIES, SECTORS } from '../services/dataService';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiMapPin, FiLayers, FiInfo, FiTrendingUp, FiArrowRight } = FiIcons;

const HistoricalTrends = () => {
  const [filters, setFilters] = useState({ county: 'All', sector: 'All' });
  const [activeMetric, setActiveMetric] = useState('revenue');
  const [activeType, setActiveType] = useState('line');
  const [showBenchmarks, setShowBenchmarks] = useState(true);

  const trendData = useMemo(() => {
    return getTrendData(activeMetric, filters.county, filters.sector);
  }, [activeMetric, filters]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 text-yellow-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                <SafeIcon icon={FiCalendar} /> 2012 — 2022 Longitudinal Study
              </div>
              <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic uppercase">Historical Trends</h1>
              <p className="text-gray-500 font-medium mt-2 max-w-xl">
                Analyze a decade of economic evolution within the Upper Peninsula's social sector using our dynamic visualization sandbox.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Global Selectors */}
        <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-3xl shadow-lg border border-gray-100 mb-6">
          <div className="flex items-center gap-2 px-4 border-r border-gray-100">
            <SafeIcon icon={FiMapPin} className="text-yellow-500" />
            <select 
              value={filters.county} 
              onChange={(e) => setFilters(p => ({ ...p, county: e.target.value }))}
              className="bg-transparent border-none text-xs font-black uppercase tracking-widest outline-none cursor-pointer"
            >
              <option value="All">All 15 Counties</option>
              {COUNTIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 px-4">
            <SafeIcon icon={FiLayers} className="text-blue-500" />
            <select 
              value={filters.sector} 
              onChange={(e) => setFilters(p => ({ ...p, sector: e.target.value }))}
              className="bg-transparent border-none text-xs font-black uppercase tracking-widest outline-none cursor-pointer"
            >
              <option value="All">All NTEE Sectors</option>
              {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Dynamic Controls */}
        <VizFilterControls 
          activeMetric={activeMetric}
          setActiveMetric={setActiveMetric}
          activeType={activeType}
          setActiveType={setActiveType}
          showBenchmarks={showBenchmarks}
          setShowBenchmarks={setShowBenchmarks}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <DynamicMetricChart 
              metric={activeMetric}
              chartType={activeType}
              county={filters.county}
              sector={filters.sector}
              showBenchmarks={showBenchmarks}
            />
          </div>

          <div className="lg:col-span-4">
            <TrajectoryEngine data={trendData} metric={activeMetric} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalTrends;