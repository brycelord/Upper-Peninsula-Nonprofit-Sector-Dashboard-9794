import React, { memo, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useFilters } from '../context/FilterContext';
import { COUNTIES, SECTORS } from '../services/dataService';

const { FiCalendar, FiMapPin, FiLayers, FiSettings, FiRotateCcw, FiChevronDown } = FiIcons;

const YEARS = Array.from({ length: 11 }, (_, i) => 2012 + i).reverse();

const FilterPill = ({ icon, label, value, onChange, options, accent }) => (
  <label className="group flex items-center gap-2 pl-3 pr-2 h-10 bg-white rounded-full border border-gray-200 hover:border-gray-900 transition-all cursor-pointer shadow-sm">
    <span
      className="flex items-center justify-center w-6 h-6 rounded-full text-white shrink-0"
      style={{ backgroundColor: accent }}
    >
      <SafeIcon icon={icon} className="text-[11px]" />
    </span>
    <div className="flex flex-col leading-none">
      <span className="text-[8px] font-black uppercase tracking-[0.18em] text-gray-400">
        {label}
      </span>
      <div className="flex items-center gap-1">
        <select
          value={value}
          onChange={onChange}
          className="bg-transparent border-none text-[11px] font-black uppercase tracking-wide text-gray-900 outline-none cursor-pointer pr-4 appearance-none"
        >
          {options}
        </select>
        <SafeIcon icon={FiChevronDown} className="text-gray-400 text-[10px] -ml-3 pointer-events-none" />
      </div>
    </div>
  </label>
);

const GlobalFilterHeader = () => {
  const { filters, updateFilters, resetFilters } = useFilters();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = useCallback((key, value) => {
    updateFilters({ [key]: value });
  }, [updateFilters]);

  const activeCount = useMemo(() => {
    let n = 0;
    if (filters.county !== 'All') n++;
    if (filters.sector !== 'All') n++;
    if (filters.verifiedOnly) n++;
    if (filters.revenueTier !== 'All') n++;
    if (filters.fteTier !== 'All') n++;
    return n;
  }, [filters.county, filters.sector, filters.verifiedOnly, filters.revenueTier, filters.fteTier]);

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 py-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 pl-2 pr-3 h-10 rounded-full bg-[#095339] text-[#ffc425] shadow-md mr-1">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ffc425] text-[#095339] font-black text-[10px]">
              UP
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.22em]">
              Filter Context
            </span>
          </div>

          <FilterPill
            icon={FiCalendar}
            label="Fiscal Year"
            accent="#095339"
            value={filters.year}
            onChange={(e) => updateFilter('year', parseInt(e.target.value))}
            options={YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          />

          <FilterPill
            icon={FiMapPin}
            label="County"
            accent="#c41230"
            value={filters.county}
            onChange={(e) => updateFilter('county', e.target.value)}
            options={[
              <option key="All" value="All">All UP Counties</option>,
              ...COUNTIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)
            ]}
          />

          <FilterPill
            icon={FiLayers}
            label="Sector"
            accent="#0d7a53"
            value={filters.sector}
            onChange={(e) => updateFilter('sector', e.target.value)}
            options={[
              <option key="All" value="All">All NTEE Sectors</option>,
              ...SECTORS.map((s) => <option key={s} value={s}>{s}</option>)
            ]}
          />

          <div className="flex-grow" />

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {activeCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={resetFilters}
                  className="flex items-center gap-2 h-10 px-4 bg-red-50 text-red-600 rounded-full text-[9px] font-black uppercase tracking-[0.18em] hover:bg-red-100 transition-all active:scale-95 border border-red-100"
                >
                  <SafeIcon icon={FiRotateCcw} />
                  Clear {activeCount}
                </motion.button>
              )}
            </AnimatePresence>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-2 h-10 px-4 rounded-full text-[9px] font-black uppercase tracking-[0.18em] transition-all ${
                showAdvanced
                  ? 'bg-[#ffc425] text-[#095339] shadow-md scale-105'
                  : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-900'
              }`}
            >
              <SafeIcon icon={FiSettings} className={showAdvanced ? 'animate-spin-slow' : ''} />
              {showAdvanced ? 'Hide' : 'Advanced'}
            </button>
          </div>
        </div>

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
                  <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Revenue Scale</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['All', 'Small', 'Mid-Size', 'Enterprise'].map(tier => (
                      <button
                        key={tier}
                        onClick={() => updateFilter('revenueTier', tier)}
                        className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-wide transition-all ${filters.revenueTier === tier ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">FTE Workforce</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['All', '1-20', '21-50', '51+'].map(tier => (
                      <button
                        key={tier}
                        onClick={() => updateFilter('fteTier', tier)}
                        className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-wide transition-all ${filters.fteTier === tier ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Integrity</h4>
                  <label className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-full cursor-pointer hover:bg-emerald-50 transition-all border border-transparent hover:border-emerald-200">
                    <input
                      type="checkbox"
                      checked={filters.verifiedOnly}
                      onChange={(e) => updateFilter('verifiedOnly', e.target.checked)}
                      className="w-3.5 h-3.5 accent-[#095339]"
                    />
                    <span className="text-[9px] font-black uppercase text-gray-600 tracking-wide">ProPublica Verified Only</span>
                  </label>
                </div>

                <div className="flex items-center">
                  <div className="px-4 py-3 bg-[#095339]/5 rounded-2xl border border-[#095339]/10 w-full">
                    <p className="text-[8px] text-[#095339] font-bold uppercase tracking-[0.18em] italic leading-relaxed">
                      Filters persist across every dashboard view to maintain research context.
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
