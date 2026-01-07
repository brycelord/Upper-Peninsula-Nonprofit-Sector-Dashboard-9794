import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import SectorOverview from './pages/SectorOverview';
import SectorGrowthInsights from './pages/SectorGrowthInsights';
import EmploymentImpact from './pages/EmploymentImpact';
import GeographicAnalysis from './pages/GeographicAnalysis';
import CompensationInsights from './pages/CompensationInsights';
import HistoricalTrends from './pages/HistoricalTrends';
import DataExplorer from './pages/DataExplorer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sector-overview" element={<SectorOverview />} />
            <Route path="/sector-growth" element={<SectorGrowthInsights />} />
            <Route path="/employment-impact" element={<EmploymentImpact />} />
            <Route path="/geographic-analysis" element={<GeographicAnalysis />} />
            <Route path="/compensation-insights" element={<CompensationInsights />} />
            <Route path="/historical-trends" element={<HistoricalTrends />} />
            <Route path="/data-explorer" element={<DataExplorer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;