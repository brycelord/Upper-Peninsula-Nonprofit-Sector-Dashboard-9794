import React, { createContext, useContext, useState } from 'react';

const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  // SETTING 'public' AS THE DEFAULT STATE
  // Previously 'analyst'
  const [viewMode, setViewMode] = useState('public');

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'analyst' ? 'public' : 'analyst');
  };

  return (
    <ViewContext.Provider value={{ viewMode, toggleViewMode }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewContext);
  if (!context) throw new Error('useViewMode must be used within a ViewProvider');
  return context;
};