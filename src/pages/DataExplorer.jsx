import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { RAW_NONPROFIT_DATA, COUNTIES, SECTORS } from '../services/dataService';
import AdvancedFilterSidebar from '../components/AdvancedFilterSidebar';
import OrgDeepProfile from '../components/OrgDeepProfile';
import * as FiIcons from 'react-icons/fi';

const { 
  FiSearch, FiDownload, FiMapPin, FiCheckCircle, FiChevronLeft, 
  FiChevronRight, FiGrid, FiList, FiFileText, FiExternalLink, 
  FiEye, FiX, FiFilter, FiTrendingUp, FiArrowUp, FiArrowDown 
} = FiIcons;

const DataExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'revenue', direction: 'desc' });
  const [filters, setFilters] = useState({
    county: 'All',
    sector: 'All',
    revenueTier: 'All',
    fteTier: 'All',
    houseDist: 'All',
    verifiedOnly: false,
    filingType: 'All',
    efficiencyTier: 'All',
    locationSearch: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const filteredData = useMemo(() => {
    const currentYearData = RAW_NONPROFIT_DATA.filter(d => d.year === 2022);
    
    let filtered = currentYearData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.ein.includes(searchTerm);
      if (!matchesSearch) return false;

      // Basic Filters
      if (filters.county !== 'All' && item.county !== filters.county) return false;
      if (filters.sector !== 'All' && item.sector !== filters.sector) return false;
      if (filters.verifiedOnly && !item.is_verified) return false;
      if (filters.filingType !== 'All' && item.filing_type !== filters.filingType) return false;

      // House District Filter
      if (filters.houseDist !== 'All' && item.legislative?.house !== filters.houseDist) return false;

      // Location Search (City/Zip)
      if (filters.locationSearch) {
        const locMatch = item.city?.toLowerCase().includes(filters.locationSearch.toLowerCase()) || 
                        item.zip?.includes(filters.locationSearch);
        if (!locMatch) return false;
      }

      // Revenue Logic
      if (filters.revenueTier !== 'All') {
        const rev = item.revenue;
        if (filters.revenueTier === 'Grassroots' && rev >= 50000) return false;
        if (filters.revenueTier === 'Small' && (rev < 50000 || rev >= 250000)) return false;
        if (filters.revenueTier === 'Mid-Size' && (rev < 250000 || rev >= 1000000)) return false;
        if (filters.revenueTier === 'Enterprise' && rev < 1000000) return false;
      }

      // FTE Logic
      if (filters.fteTier !== 'All') {
        const emp = item.employees;
        if (filters.fteTier === '1-5' && emp > 5) return false;
        if (filters.fteTier === '6-20' && (emp < 6 || emp > 20)) return false;
        if (filters.fteTier === '21-50' && (emp < 21 || emp > 50)) return false;
        if (filters.fteTier === '51+' && emp < 51) return false;
      }

      // Efficiency Logic
      if (filters.efficiencyTier !== 'All') {
        const eff = (item.program_rev / item.revenue) * 100;
        if (filters.efficiencyTier === 'High' && eff < 85) return false;
        if (filters.efficiencyTier === 'Standard' && (eff < 70 || eff >= 85)) return false;
        if (filters.efficiencyTier === 'Low' && eff >= 70) return false;
      }

      return true;
    });

    // Handle Sorting
    return filtered.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  }, [searchTerm, filters, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const removeFilter = (key, defaultValue = 'All') => {
    setFilters(prev => ({ ...prev, [key]: defaultValue }));
  };

  const activeFilterCount = Object.entries(filters).filter(([key, val]) => {
    if (key === 'verifiedOnly') return val === true;
    return val !== 'All' && val !== '';
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatePresence>
          {selectedOrg && (
            <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm">
              <OrgDeepProfile org={selectedOrg} onClose={() => setSelectedOrg(null)} />
            </div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <SafeIcon icon={FiFileText} className="text-blue-500" />
                ProPublica Filing Type
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {['All', '990', '990EZ', '990PF'].map(type => (
                  <button 
                    key={type}
                    onClick={() => setFilters(f => ({ ...f, filingType: type }))}
                    className={`text-left px-3 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${
                      filters.filingType === type ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {type === 'All' ? 'All Forms' : `Form ${type}`}
                  </button>
                ))}
              </div>
            </div>

            <AdvancedFilterSidebar 
              filters={filters} 
              setFilters={setFilters} 
              onClear={() => setFilters({
                county: 'All', sector: 'All', revenueTier: 'All', fteTier: 'All',
                houseDist: 'All', verifiedOnly: false, filingType: 'All',
                efficiencyTier: 'All', locationSearch: ''
              })}
              resultsCount={filteredData.length}
            />
          </div>

          {/* Main List */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Search Bar & Active Filters */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-4">
                <div className="flex-grow relative w-full">
                  <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input 
                    type="text" 
                    placeholder="Deep search EIN, Organization Legal Name, or Form Type..." 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-yellow-400 transition-all font-medium text-sm"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                  />
                </div>
                <button className="px-6 py-3 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-lg">
                  <SafeIcon icon={FiDownload} />
                  Export Registry
                </button>
              </div>

              {/* Filter Chips Area */}
              <AnimatePresence>
                {activeFilterCount > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center gap-2"
                  >
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-full text-[9px] font-black text-yellow-400 uppercase tracking-widest">
                      <SafeIcon icon={FiFilter} />
                      {activeFilterCount} Active
                    </div>
                    
                    {filters.county !== 'All' && (
                      <Chip label={`County: ${filters.county}`} onRemove={() => removeFilter('county')} />
                    )}
                    {filters.sector !== 'All' && (
                      <Chip label={`Sector: ${filters.sector}`} onRemove={() => removeFilter('sector')} />
                    )}
                    {filters.revenueTier !== 'All' && (
                      <Chip label={`Rev: ${filters.revenueTier}`} onRemove={() => removeFilter('revenueTier')} />
                    )}
                    {filters.fteTier !== 'All' && (
                      <Chip label={`Staff: ${filters.fteTier}`} onRemove={() => removeFilter('fteTier')} />
                    )}
                    {filters.efficiencyTier !== 'All' && (
                      <Chip label={`ROI: ${filters.efficiencyTier}`} onRemove={() => removeFilter('efficiencyTier')} />
                    )}
                    {filters.locationSearch && (
                      <Chip label={`Loc: ${filters.locationSearch}`} onRemove={() => removeFilter('locationSearch', '')} />
                    )}
                    {filters.verifiedOnly && (
                      <Chip label="Verified Only" onRemove={() => removeFilter('verifiedOnly', false)} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-8 py-6 text-left">
                        <SortHeader label="Organization & EIN" active={sortConfig.key === 'name'} onClick={() => handleSort('name')} />
                      </th>
                      <th className="px-8 py-6 text-left">
                        <SortHeader label="Efficiency" active={sortConfig.key === 'program_rev'} onClick={() => handleSort('program_rev')} />
                      </th>
                      <th className="px-8 py-6 text-left">
                        <SortHeader label="Economic Capacity" active={sortConfig.key === 'revenue'} onClick={() => handleSort('revenue')} />
                      </th>
                      <th className="px-8 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {paginatedData.map((item) => (
                      <tr 
                        key={item.ein} 
                        className="hover:bg-gray-50 transition-colors group cursor-pointer"
                        onClick={() => setSelectedOrg(item)}
                      >
                        <td className="px-8 py-6">
                          <div className="text-sm font-black text-gray-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{item.name}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] font-bold text-gray-400 uppercase">EIN: {item.ein}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="text-[9px] font-bold text-gray-400 uppercase">{item.county} County</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-gray-900">
                              {((item.program_rev / item.revenue) * 100).toFixed(0)}% ROI
                            </span>
                            <div className="w-16 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                              <div 
                                className={`h-full ${item.program_rev/item.revenue > 0.8 ? 'bg-green-500' : 'bg-yellow-400'}`}
                                style={{ width: `${(item.program_rev / item.revenue) * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-gray-900">${(item.revenue / 1e6).toFixed(2)}M Rev</span>
                            <span className="text-[9px] font-bold text-teal-600 uppercase tracking-widest">{item.employees} Personnel</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button 
                            className="p-3 bg-gray-50 text-gray-400 hover:bg-gray-900 hover:text-yellow-400 rounded-2xl transition-all"
                            onClick={(e) => {e.stopPropagation(); setSelectedOrg(item);}}
                          >
                            <SafeIcon icon={FiEye} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Showing {(currentPage - 1) * itemsPerPage + 1} — {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} Records
                </span>
                <div className="flex items-center gap-4">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 disabled:opacity-50 hover:bg-gray-900 hover:text-white transition-all"
                  >
                    <SafeIcon icon={FiChevronLeft} />
                  </button>
                  <span className="text-xs font-black italic">{currentPage} / {totalPages}</span>
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 disabled:opacity-50 hover:bg-gray-900 hover:text-white transition-all"
                  >
                    <SafeIcon icon={FiChevronRight} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Helper Components
const Chip = ({ label, onRemove }) => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-lg shadow-sm"
  >
    <span className="text-[9px] font-black uppercase text-gray-500 tracking-tight">{label}</span>
    <button onClick={onRemove} className="text-gray-300 hover:text-red-500 transition-colors">
      <SafeIcon icon={FiX} className="text-[10px]" />
    </button>
  </motion.div>
);

const SortHeader = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 group text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
  >
    {label}
    <div className={`flex flex-col items-center leading-none ${active ? 'text-yellow-500' : 'text-gray-200 group-hover:text-gray-300'}`}>
      <SafeIcon icon={FiArrowUp} className="text-[8px]" />
      <SafeIcon icon={FiArrowDown} className="text-[8px] -mt-0.5" />
    </div>
  </button>
);

export default DataExplorer;