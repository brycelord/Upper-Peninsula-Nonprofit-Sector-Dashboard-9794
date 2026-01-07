import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiSearch, FiFilter, FiDownload, FiTable, FiBarChart3, 
  FiMapPin, FiTrash2, FiChevronDown, FiInfo, FiLayers 
} = FiIcons;

const DataExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('All Counties');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [selectedYear, setSelectedYear] = useState('2022');
  const [viewMode, setViewMode] = useState('table');
  const [minEmployees, setMinEmployees] = useState(0);
  const [minWage, setMinWage] = useState(0);

  const counties = ['All Counties', 'Marquette', 'Houghton', 'Chippewa', 'Delta', 'Dickinson', 'Menominee', 'Gogebic', 'Iron', 'Mackinac', 'Baraga', 'Alger', 'Schoolcraft', 'Luce', 'Ontonagon', 'Keweenaw'];
  const sectors = ['All Sectors', 'Healthcare & Medical', 'Education', 'Human Services', 'Arts & Culture', 'Environmental', 'Religious', 'Community Development', 'Other'];
  const years = ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];

  const sampleData = [
    { id: 1, name: 'Marquette General Hospital Foundation', county: 'Marquette', sector: 'Healthcare & Medical', employees: 245, avgWage: 45200, year: 2022, impact: 'High' },
    { id: 2, name: 'Northern Michigan University', county: 'Marquette', sector: 'Education', employees: 1890, avgWage: 42100, year: 2022, impact: 'Critical' },
    { id: 3, name: 'Michigan Tech Foundation', county: 'Houghton', sector: 'Education', employees: 567, avgWage: 48300, year: 2022, impact: 'High' },
    { id: 4, name: 'Keweenaw Community Foundation', county: 'Houghton', sector: 'Community Development', employees: 34, avgWage: 38900, year: 2022, impact: 'Medium' },
    { id: 5, name: 'UP Health System', county: 'Marquette', sector: 'Healthcare & Medical', employees: 2340, avgWage: 46700, year: 2022, impact: 'Critical' },
    { id: 6, name: 'Sault Ste. Marie Community Foundation', county: 'Chippewa', sector: 'Community Development', employees: 28, avgWage: 35600, year: 2022, impact: 'Medium' },
    { id: 7, name: 'Escanaba Area Community Foundation', county: 'Delta', sector: 'Community Development', employees: 45, avgWage: 37200, year: 2022, impact: 'Medium' },
    { id: 8, name: 'Iron Mountain Community Foundation', county: 'Dickinson', sector: 'Community Development', employees: 23, avgWage: 36800, year: 2022, impact: 'Low' },
    { id: 9, name: 'Superior Watershed Partnership', county: 'Marquette', sector: 'Environmental', employees: 56, avgWage: 41000, year: 2022, impact: 'High' },
    { id: 10, name: 'Bay Cliff Health Camp', county: 'Marquette', sector: 'Healthcare & Medical', employees: 112, avgWage: 32500, year: 2022, impact: 'High' }
  ];

  const filteredData = useMemo(() => {
    return sampleData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCounty = selectedCounty === 'All Counties' || item.county === selectedCounty;
      const matchesSector = selectedSector === 'All Sectors' || item.sector === selectedSector;
      const matchesYear = item.year.toString() === selectedYear;
      const matchesEmployees = item.employees >= minEmployees;
      const matchesWage = item.avgWage >= minWage;
      return matchesSearch && matchesCounty && matchesSector && matchesYear && matchesEmployees && matchesWage;
    });
  }, [searchTerm, selectedCounty, selectedSector, selectedYear, minEmployees, minWage]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCounty('All Counties');
    setSelectedSector('All Sectors');
    setSelectedYear('2022');
    setMinEmployees(0);
    setMinWage(0);
  };

  const handleExport = () => {
    const csvContent = [
      ['Organization', 'County', 'Sector', 'Employees', 'Average Wage', 'Impact Tier', 'Year'].join(','),
      ...filteredData.map(item => [
        `"${item.name}"`, item.county, `"${item.sector}"`, item.employees, item.avgWage, item.impact, item.year
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `UP_Nonprofit_Export_${selectedYear}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2" style={{ fontFamily: 'futura-pt, sans-serif' }}>
                Data Explorer
              </h1>
              <p className="text-gray-600 font-medium">Advanced search and export utility for regional economic research.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg active:scale-95"
              >
                <SafeIcon icon={FiDownload} /> Export Dataset
              </button>
            </div>
          </div>
        </motion.div>

        {/* Search & Stats Ribbon */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4">
            <div className="flex-grow relative">
              <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input 
                type="text" 
                placeholder="Search by organization name or keyword..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-yellow-400 transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="h-8 w-px bg-gray-200 hidden md:block" />
            <div className="hidden md:flex items-center gap-2 px-4 whitespace-nowrap">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Found:</span>
              <span className="text-xl font-black text-gray-900">{filteredData.length}</span>
            </div>
          </div>
          
          <div className="bg-yellow-400 p-4 rounded-2xl shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/10 rounded-lg"><SafeIcon icon={FiLayers} /></div>
              <span className="font-bold text-black">Active Filters</span>
            </div>
            <button 
              onClick={resetFilters}
              className="p-2 hover:bg-black/10 rounded-lg transition-colors text-black"
              title="Reset all filters"
            >
              <SafeIcon icon={FiTrash2} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <SafeIcon icon={FiFilter} className="text-yellow-500" /> Filter Parameters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Region/County</label>
                  <select 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-yellow-400"
                    value={selectedCounty}
                    onChange={(e) => setSelectedCounty(e.target.value)}
                  >
                    {counties.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Nonprofit Sector</label>
                  <select 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-yellow-400"
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                  >
                    {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Fiscal Year</label>
                  <select 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-yellow-400"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Min. Employees ({minEmployees})</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="50"
                    className="w-full accent-yellow-400"
                    value={minEmployees}
                    onChange={(e) => setMinEmployees(parseInt(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Min. Avg Wage (${minWage.toLocaleString()})</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="60000" 
                    step="5000"
                    className="w-full accent-teal-500"
                    value={minWage}
                    onChange={(e) => setMinWage(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-900 rounded-2xl shadow-xl p-6 text-white text-sm">
              <div className="flex items-center gap-2 mb-3 text-yellow-400 font-bold">
                <SafeIcon icon={FiInfo} /> Methodology
              </div>
              <p className="text-blue-100 leading-relaxed">
                Data is aggregated from IRS Form 990 filings and QCEW employment reports. Average wages are calculated as total annual payroll divided by FTE count.
              </p>
            </div>
          </div>

          {/* Main Table Content */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white shadow-sm text-yellow-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <SafeIcon icon={FiTable} />
                  </button>
                  <button 
                    onClick={() => setViewMode('chart')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'chart' ? 'bg-white shadow-sm text-yellow-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <SafeIcon icon={FiBarChart3} />
                  </button>
                </div>
                <span className="text-xs font-bold text-gray-400">Viewing {filteredData.length} of {sampleData.length} records</span>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Organization</th>
                      <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">County</th>
                      <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Sector</th>
                      <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Employees</th>
                      <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Avg Wage</th>
                      <th className="px-6 py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">Impact</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-50">
                    <AnimatePresence>
                      {filteredData.length > 0 ? (
                        filteredData.map((item, idx) => (
                          <motion.tr 
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="hover:bg-yellow-50/30 transition-colors group cursor-default"
                          >
                            <td className="px-6 py-4">
                              <span className="text-sm font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">{item.name}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                <SafeIcon icon={FiMapPin} className="text-gray-300" /> {item.county}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase rounded-lg border border-blue-100">
                                {item.sector}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap">
                              <span className="text-sm font-bold text-gray-900">{item.employees.toLocaleString()}</span>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap">
                              <span className="text-sm font-black text-teal-600">${item.avgWage.toLocaleString()}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                                item.impact === 'Critical' ? 'bg-red-100 text-red-700' :
                                item.impact === 'High' ? 'bg-orange-100 text-orange-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {item.impact}
                              </span>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-20 text-center">
                            <div className="flex flex-col items-center gap-4">
                              <div className="p-4 bg-gray-50 rounded-full text-gray-300">
                                <SafeIcon icon={FiSearch} className="text-4xl" />
                              </div>
                              <p className="text-gray-500 font-bold">No organizations match your current filters.</p>
                              <button 
                                onClick={resetFilters}
                                className="text-yellow-600 font-black text-xs uppercase tracking-widest hover:underline"
                              >
                                Clear All Filters
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExplorer;