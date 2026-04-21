import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const FilterContext = createContext();

const DEFAULT_FILTERS = {
  year: 2022,
  county: 'All',
  sector: 'All',
  revenueTier: 'All',
  fteTier: 'All',
  verifiedOnly: false,
  filingType: 'All',
  efficiencyTier: 'All'
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const updateFilters = useCallback((patch) => {
    setFilters(prev => {
      let changed = false;
      for (const k in patch) {
        if (prev[k] !== patch[k]) { changed = true; break; }
      }
      return changed ? { ...prev, ...patch } : prev;
    });
  }, []);

  const value = useMemo(
    () => ({ filters, setFilters, updateFilters, resetFilters }),
    [filters, updateFilters, resetFilters]
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilters = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilters must be used within a FilterProvider');
  return ctx;
};
