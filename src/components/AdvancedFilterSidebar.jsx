import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiDollarSign, FiUsers, FiMapPin, FiCheckCircle, 
  FiLayers, FiShield, FiX, FiActivity, FiSearch 
} = FiIcons;

const FilterSection = ({ title, icon, children }) => (
  <div className="mb-8">
    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
      <SafeIcon icon={icon} className="text-yellow-500" />
      {title}
    </h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const AdvancedFilterSidebar = ({ filters, setFilters, onClear, resultsCount }) => {
  const updateFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
        <div>
          <h2 className="text-xl font-black italic uppercase tracking-tighter">Registry Filter</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase">{resultsCount.toLocaleString()} Records Found</p>
        </div>
        <button 
          onClick={onClear}
          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
          title="Clear All"
        >
          <SafeIcon icon={FiX} />
        </button>
      </div>

      {/* Geolocation */}
      <FilterSection title="Target Geography" icon={FiMapPin}>
        <div>
          <label className="block text-[9px] font-black text-gray-400 uppercase mb-2 ml-1">City / Zip Search</label>
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-[10px]" />
            <input 
              type="text" 
              placeholder="e.g. Marquette" 
              value={filters.locationSearch || ''}
              onChange={(e) => updateFilter('locationSearch', e.target.value)}
              className="w-full pl-8 pr-3 py-2.5 bg-gray-50 border-none rounded-xl text-xs font-black text-gray-700 outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            />
          </div>
        </div>
      </FilterSection>

      {/* Financial Health */}
      <FilterSection title="Financial Scale" icon={FiDollarSign}>
        <div>
          <label className="block text-[9px] font-black text-gray-400 uppercase mb-2 ml-1">Revenue Tier</label>
          <select 
            value={filters.revenueTier} 
            onChange={(e) => updateFilter('revenueTier', e.target.value)}
            className="w-full p-3 bg-gray-50 border-none rounded-xl text-xs font-black text-gray-700 outline-none cursor-pointer hover:bg-gray-100"
          >
            <option value="All">All Sizes</option>
            <option value="Grassroots">Grassroots (&lt;$50k)</option>
            <option value="Small">Small ($50k - $250k)</option>
            <option value="Mid-Size">Mid-Size ($250k - $1M)</option>
            <option value="Enterprise">Enterprise ($1M+)</option>
          </select>
        </div>
        
        <div className="pt-2">
          <label className="block text-[9px] font-black text-gray-400 uppercase mb-2 ml-1">Program Efficiency</label>
          <select 
            value={filters.efficiencyTier || 'All'} 
            onChange={(e) => updateFilter('efficiencyTier', e.target.value)}
            className="w-full p-3 bg-gray-50 border-none rounded-xl text-xs font-black text-gray-700 outline-none cursor-pointer hover:bg-gray-100"
          >
            <option value="All">Any Efficiency</option>
            <option value="High">High ROI (85%+)</option>
            <option value="Standard">Standard (70-85%)</option>
            <option value="Low">Low (&lt;70%)</option>
          </select>
        </div>
      </FilterSection>

      {/* Workforce Capacity */}
      <FilterSection title="Workforce FTE" icon={FiUsers}>
        <div className="grid grid-cols-2 gap-2">
          {['1-5', '6-20', '21-50', '51+'].map(tier => (
            <button 
              key={tier}
              onClick={() => updateFilter('fteTier', filters.fteTier === tier ? 'All' : tier)}
              className={`py-2 rounded-lg text-[10px] font-black uppercase transition-all border ${
                filters.fteTier === tier 
                  ? 'bg-gray-900 text-white border-gray-900 shadow-lg' 
                  : 'bg-white text-gray-400 border-gray-100 hover:border-yellow-400'
              }`}
            >
              {tier} Staff
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Political Geography */}
      <FilterSection title="Legislative Map" icon={FiShield}>
        <div>
          <label className="block text-[9px] font-black text-gray-400 uppercase mb-2 ml-1">MI House District</label>
          <select 
            value={filters.houseDist} 
            onChange={(e) => updateFilter('houseDist', e.target.value)}
            className="w-full p-3 bg-gray-50 border-none rounded-xl text-xs font-black text-gray-700 outline-none cursor-pointer hover:bg-gray-100"
          >
            <option value="All">All Districts</option>
            <option value="107th">107th District</option>
            <option value="108th">108th District</option>
            <option value="109th">109th District</option>
            <option value="110th">110th District</option>
          </select>
        </div>
      </FilterSection>

      {/* Data Integrity */}
      <FilterSection title="Data Source" icon={FiCheckCircle}>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer group hover:bg-yellow-50 transition-all">
            <input 
              type="checkbox" 
              checked={filters.verifiedOnly}
              onChange={(e) => updateFilter('verifiedOnly', e.target.checked)}
              className="w-4 h-4 accent-yellow-400 border-none rounded"
            />
            <span className="text-[10px] font-black uppercase text-gray-600 group-hover:text-gray-900">ProPublica Verified</span>
          </label>
        </div>
      </FilterSection>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 italic text-[10px] text-blue-700 leading-relaxed">
          <SafeIcon icon={FiLayers} className="mb-2 text-sm" />
          <b>Pro Tip:</b> Combine <b>High ROI</b> with <b>Enterprise</b> revenue to find the region's most efficient large-scale social actors.
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilterSidebar;