import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import InteractiveMap from '../components/InteractiveMap';
import QuickChart from '../components/QuickChart';
import CountyTrendChart from '../components/CountyTrendChart';
import CountyDataGrid from '../components/CountyDataGrid';
import CountyComparisonTool from '../components/CountyComparisonTool';
import CountyEconomicSummary from '../components/CountyEconomicSummary';
import ImpactAnalysisMetrics from '../components/ImpactAnalysisMetrics';
import CountyDeepProfile from '../components/CountyDeepProfile';
import * as FiIcons from 'react-icons/fi';

const { FiMap, FiMapPin, FiBarChart3, FiUsers, FiTrendingUp, FiDollarSign, FiInfo, FiSearch, FiChevronDown, FiZap } = FiIcons;

const GeographicAnalysis = () => {
  const [selectedView, setSelectedView] = useState('density');
  const [selectedCountyName, setSelectedCountyName] = useState('Marquette');

  const countyData = [
    { name: 'Marquette', population: 66017, organizations: 387, density: 5.86, employment: 8245, baseWage: 38500 },
    { name: 'Houghton', population: 37361, organizations: 312, density: 8.35, employment: 6890, baseWage: 41200 },
    { name: 'Chippewa', population: 36785, organizations: 298, density: 8.10, employment: 5670, baseWage: 34500 },
    { name: 'Delta', population: 36903, organizations: 245, density: 6.64, employment: 4320, baseWage: 33200 },
    { name: 'Dickinson', population: 25947, organizations: 189, density: 7.28, employment: 3450, baseWage: 35800 },
    { name: 'Menominee', population: 23502, organizations: 156, density: 6.64, employment: 2890, baseWage: 32400 },
    { name: 'Gogebic', population: 14380, organizations: 134, density: 9.32, employment: 2340, baseWage: 31200 },
    { name: 'Iron', population: 11631, organizations: 98, density: 8.43, employment: 1780, baseWage: 30500 },
    { name: 'Mackinac', population: 10834, organizations: 87, density: 8.03, employment: 1560, baseWage: 29800 },
    { name: 'Baraga', population: 8158, organizations: 76, density: 9.31, employment: 1230, baseWage: 28900 },
    { name: 'Alger', population: 8842, organizations: 65, density: 7.35, employment: 980, baseWage: 27500 },
    { name: 'Schoolcraft', population: 8047, organizations: 54, density: 6.71, employment: 890, baseWage: 26800 },
    { name: 'Luce', population: 5339, organizations: 43, density: 8.05, employment: 650, baseWage: 25400 },
    { name: 'Ontonagon', population: 5816, organizations: 38, density: 6.53, employment: 540, baseWage: 26200 },
    { name: 'Keweenaw', population: 2046, organizations: 21, density: 10.26, employment: 280, baseWage: 24500 }
  ];

  const selectedCounty = useMemo(() => 
    countyData.find(c => c.name === selectedCountyName) || countyData[0]
  , [selectedCountyName]);

  const historicalData = useMemo(() => {
    const years = 10;
    const empTrend = [];
    const wageTrend = [];
    for (let i = 0; i < years; i++) {
      const growthFactor = 1 + (i * 0.02) + (Math.random() * 0.03);
      const covidImpact = i === 7 ? 0.95 : 1;
      empTrend.push(Math.round(selectedCounty.employment * growthFactor * covidImpact / 1.1));
      wageTrend.push(Math.round(selectedCounty.baseWage * (1 + (i * 0.04)) * (0.95 + Math.random() * 0.1)));
    }
    return { empTrend, wageTrend };
  }, [selectedCounty]);

  const densityData = {
    labels: countyData.map(c => c.name).slice(0, 8),
    datasets: [{
      data: countyData.map(c => c.density).slice(0, 8),
      backgroundColor: '#4CC0B0'
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-xl">
              <SafeIcon icon={FiMap} className="text-2xl text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase" style={{ fontFamily: 'futura-pt, sans-serif' }}>
                Geospatial Analysis
              </h1>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Regional Economic Mapping & Profiles</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl font-medium leading-relaxed">
            Select a county to dive deep into its nonprofit infrastructure, employment trends, and qualitative impact metrics.
          </p>
        </motion.div>

        {/* Main Selection & Map Control */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Side: Interactive Map & Controls */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[600px]">
              <div className="p-6 bg-gray-900 text-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                      <span className="font-black uppercase tracking-widest text-xs">Live Heatmap</span>
                   </div>
                </div>
                <div className="flex bg-gray-800 rounded-xl p-1">
                  {['density', 'volume'].map(view => (
                    <button 
                      key={view}
                      onClick={() => setSelectedView(view)}
                      className={`px-4 py-2 text-[10px] uppercase font-black rounded-lg transition-all ${selectedView === view ? 'bg-yellow-400 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-grow">
                <InteractiveMap onSelectCounty={setSelectedCountyName} />
              </div>
            </div>

            {/* Comparison Tool Integration */}
            <CountyComparisonTool data={countyData} />
          </div>

          {/* Right Side: Quick Stats & Trends */}
          <div className="lg:col-span-4 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedCountyName}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-2xl border-t-8 border-yellow-400">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-3xl font-black uppercase italic tracking-tighter">{selectedCountyName}</h2>
                      <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Snapshot</p>
                    </div>
                    <div className="p-2 bg-yellow-400 rounded-xl text-black">
                      <SafeIcon icon={FiZap} className="text-xl" />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <CountyTrendChart countyName={selectedCountyName} metric="Employment" data={historicalData.empTrend} color="#FFBD00" />
                    <CountyTrendChart countyName={selectedCountyName} metric="Avg Wages" data={historicalData.wageTrend} color="#4CC0B0" />
                  </div>
                </div>

                <ImpactAnalysisMetrics county={selectedCounty} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Deep Profile Section (Full Width) */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
             <div className="h-px flex-grow bg-gray-200" />
             <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">Deep Economic Profile</h3>
             <div className="h-px flex-grow bg-gray-200" />
          </div>
          <CountyDeepProfile county={selectedCounty} allCounties={countyData} />
        </div>

        {/* Supporting Data Grid */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">UP Data Matrix</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Comparative Tabular Data</p>
            </div>
          </div>
          <CountyDataGrid data={countyData} selectedCounty={selectedCountyName} onRowClick={setSelectedCountyName} />
        </div>

      </div>
    </div>
  );
};

export default GeographicAnalysis;