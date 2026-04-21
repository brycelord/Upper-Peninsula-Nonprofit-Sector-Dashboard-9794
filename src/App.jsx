import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import GlobalFilterHeader from './components/GlobalFilterHeader';
import './App.css';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const SectorOverview = lazy(() => import('./pages/SectorOverview'));
const SectorDeepDive = lazy(() => import('./pages/SectorDeepDive'));
const EmploymentImpact = lazy(() => import('./pages/EmploymentImpact'));
const GeographicAnalysis = lazy(() => import('./pages/GeographicAnalysis'));
const AdvocacyPortal = lazy(() => import('./pages/AdvocacyPortal'));
const CompensationInsights = lazy(() => import('./pages/CompensationInsights'));
const HistoricalTrends = lazy(() => import('./pages/HistoricalTrends'));
const DataExplorer = lazy(() => import('./pages/DataExplorer'));
const ImpactCalculator = lazy(() => import('./pages/ImpactCalculator'));
const DataIntegrity = lazy(() => import('./pages/DataIntegrity'));

const RouteFallback = () => (
  <div className="flex items-center justify-center py-24">
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Loading</span>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="sticky top-0 z-50">
          <Header />
          <GlobalFilterHeader />
        </div>

        <main className="flex-grow">
          <Suspense fallback={<RouteFallback />}>
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
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
