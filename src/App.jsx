import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import GlobalFilterHeader from './components/GlobalFilterHeader';
import Dashboard from './pages/Dashboard';
import SectorOverview from './pages/SectorOverview';
import SectorDeepDive from './pages/SectorDeepDive';
import EmploymentImpact from './pages/EmploymentImpact';
import GeographicAnalysis from './pages/GeographicAnalysis';
import AdvocacyPortal from './pages/AdvocacyPortal';
import CompensationInsights from './pages/CompensationInsights';
import HistoricalTrends from './pages/HistoricalTrends';
import DataExplorer from './pages/DataExplorer';
import ImpactCalculator from './pages/ImpactCalculator';
import DataIntegrity from './pages/DataIntegrity';
import Methodology from './pages/Methodology';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        {/* The Filter Bar is now global and sits below the main header */}
        <GlobalFilterHeader />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sector-overview" element={<SectorOverview />} />
            <Route path="/sector-deep-dive" element={<SectorDeepDive />} />
            <Route path="/employment-impact" element={<EmploymentImpact />} />
            <Route path="/geographic-analysis" element={<GeographicAnalysis />} />
            <Route path="/advocacy-portal" element={<AdvocacyPortal />} />
            <Route path="/compensation-insights" element={<CompensationInsights />} />
            <Route path="/historical-trends" element={<HistoricalTrends />} />
            <Route path="/data-explorer" element={<DataExplorer />} />
            <Route path="/impact-calculator" element={<ImpactCalculator />} />
            <Route path="/data-integrity" element={<DataIntegrity />} />
            <Route path="/methodology" element={<Methodology />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;