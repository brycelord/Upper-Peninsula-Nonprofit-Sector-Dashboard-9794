import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    year: 2022,
    county: 'All',
    sector: 'All',
    revenueTier: 'All',
    fteTier: 'All',
    verifiedOnly: false,
    filingType: 'All',
    efficiencyTier: 'All'
  });

  const resetFilters = () => {
    setFilters({
      year: 2022,
      county: 'All',
      sector: 'All',
      revenueTier: 'All',
      fteTier: 'All',
      verifiedOnly: false,
      filingType: 'All',
      efficiencyTier: 'All'
    });
  };

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