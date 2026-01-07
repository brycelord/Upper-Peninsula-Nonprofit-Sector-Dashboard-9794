import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiHome, FiPieChart, FiBriefcase, FiMap, FiDollarSign, FiTrendingUp, FiSearch, FiZap } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: FiHome },
    { path: '/sector-overview', label: 'Sector Overview', icon: FiPieChart },
    { path: '/sector-growth', label: 'Growth Insights', icon: FiZap },
    { path: '/employment-impact', label: 'Employment Impact', icon: FiBriefcase },
    { path: '/geographic-analysis', label: 'Geographic Analysis', icon: FiMap },
    { path: '/compensation-insights', label: 'Compensation Insights', icon: FiDollarSign },
    { path: '/historical-trends', label: 'Historical Trends', icon: FiTrendingUp },
    { path: '/data-explorer', label: 'Data Explorer', icon: FiSearch }
  ];

  return (
    <header className="bg-white shadow-lg border-b-4 border-yellow-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-xl">UP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'futura-pt, sans-serif' }}>
                Michigan Upper Peninsula
              </h1>
              <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">Nonprofit Dashboard</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-black uppercase tracking-tighter transition-all ${
                  location.pathname === item.path
                    ? 'text-yellow-600 bg-yellow-50'
                    : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 rounded-md text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden pb-4"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-bold transition-colors ${
                  location.pathname === item.path
                    ? 'text-yellow-600 bg-yellow-50 border-l-4 border-yellow-400'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header;