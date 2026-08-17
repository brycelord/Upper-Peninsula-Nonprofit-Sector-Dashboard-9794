import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

/**
 * Default filter state.
 * verifiedOnly defaults to TRUE so the dashboard always opens showing only
 * ProPublica-verified organizations. Users can disable this via the
 * Advanced Filters panel ("ProPublica Verified Only" checkbox) to include
 * sector-estimated data, which is clearly labeled in the UI.
 */
const DEFAULT_FILTERS = {
  year: 2022,
  county: 'All',
  sector: 'All',
  revenueTier: 'All',
  fteTier: 'All',
  verifiedOnly: true,   // CHANGED: was false — now defaults to verified orgs only
  filingType: 'All',
  efficiencyTier: 'All'
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, updateFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilters must be used within a FilterProvider');
  return context;
};
