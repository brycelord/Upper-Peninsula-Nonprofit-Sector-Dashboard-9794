import React, { memo, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useFilters } from '../context/FilterContext';
import { COUNTIES, SECTORS } from '../services/dataService';

const { FiFilter, FiCalendar, FiMapPin, FiLayers, FiSettings, FiRotateCcw } = FiIcons;

const YEARS = Array.from({ length: 11 }, (_, i) => 2012 + i);

const GlobalFilterHeader = () => {
  const { filters, updateFilters, resetFilters } = useFilters();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = useCallback((key, value) => {
    updateFilters({ [key]: value });
  }, [updateFilters]);

  const isActive = useMemo(() => (
    filters.county !== 'All' ||
    filters.sector !== 'All' ||
    filters.verifiedOnly ||
    filters.revenueTier !== 'All' ||
    filters.fteTier !== 'All'
  ), [filters.county, filters.sector, filters.verifiedOnly, filters.revenueTier, filters.fteTier]);

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-[72px] z-40 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 py-2">
        <div className="flex flex-wrap items-center gap-2">
          {/* Context Badge */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-yellow-400 rounded-xl mr-2 shadow-lg shadow-gray-200">
            <SafeIcon icon={FiFilter} className="text-[10px]" />
            <span className="text-[9px] font-black uppercase tracking-[0.15em]">Global Context</span>
          </div>

          {/* Year Selector */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
            <SafeIcon icon={FiCalendar} className="text-gray-400 text-xs group-hover:text-yellow-500 transition-colors" />
            <select 
              value={filters.year} 
              onChange={(e) => updateFilter('year', parseInt(e.target.value))}
              className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer"
            >
              {YEARS.map(y => (
                <option key={y} value={y}>{y} Fiscal Year</option>
              ))}
            </select>
          </div>

          {/* County Selector */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
            <SafeIcon icon={FiMapPin} className="text-gray-400 text-xs group-hover:text-red-500 transition-colors" />
            <select 
              value={filters.county} 
              onChange={(e) => updateFilter('county', e.target.value)}
              className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer min-w-[140px]"
            >
              <option value="All">All UP Counties</option>
              {COUNTIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          {/* Sector Selector */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
            <SafeIcon icon={FiLayers} className="text-gray-400 text-xs group-hover:text-blue-500 transition-colors" />
            <select 
              value={filters.sector} 
              onChange={(e) => updateFilter('sector', e.target.value)}
              className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer max-w-[180px]"
            >
              <option value="All">All NTEE Sectors</option>
              {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex-grow" />

          {/* Main Action Area */}
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {isActive && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-100 transition-all active:scale-95 border border-red-100"
                >
                  <SafeIcon icon={FiRotateCcw} />
                  Clear All
                </motion.button>
              )}
            </AnimatePresence>

            {/* Advanced Toggle */}
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${showAdvanced ? 'bg-yellow-400 text-black shadow-lg scale-105' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'}`}
            >
              <SafeIcon icon={FiSettings} className={showAdvanced ? 'animate-spin-slow' : ''} />
              {showAdvanced ? 'Hide Options' : 'Advanced Filters'}
            </button>
          </div>
        </div>

        {/* Advanced Drawer */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-3 pb-2 mt-2 border-t border-gray-100">
                <div>
                  <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Revenue Scale</h4>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Small', 'Mid-Size', 'Enterprise'].map(tier => (
                      <button
                        key={tier}
                        onClick={() => updateFilter('revenueTier', tier)}
                        className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${filters.revenueTier === tier ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">FTE Workforce</h4>
                  <div className="flex flex-wrap gap-2">
                    {['All', '1-20', '21-50', '51+'].map(tier => (
                      <button
                        key={tier}
                        onClick={() => updateFilter('fteTier', tier)}
                        className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${filters.fteTier === tier ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Integrity Filter</h4>
                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-teal-50 transition-all border border-transparent hover:border-teal-100">
                    <input 
                      type="checkbox" 
                      checked={filters.verifiedOnly} 
                      onChange={(e) => updateFilter('verifiedOnly', e.target.checked)}
                      className="w-3.5 h-3.5 accent-teal-600" 
                    />
                    <span className="text-[9px] font-black uppercase text-gray-600">ProPublica Verified Only</span>
                  </label>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-[8px] text-blue-800 font-bold uppercase tracking-widest italic leading-relaxed">
                      * Filter parameters persist across all dashboard views to maintain your research context.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default memo(GlobalFilterHeader);