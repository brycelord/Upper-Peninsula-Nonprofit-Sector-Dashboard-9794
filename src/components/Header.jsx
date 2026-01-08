import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiHome, FiPieChart, FiBriefcase, FiMap, FiDollarSign, FiTrendingUp, FiSearch, FiZap, FiTarget, FiShield } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: FiHome },
    { path: '/sector-overview', label: 'Sector Overview', icon: FiPieChart },
    { path: '/employment-impact', label: 'Employment', icon: FiBriefcase },
    { path: '/geographic-analysis', label: 'Geographic', icon: FiMap },
    { path: '/advocacy-portal', label: 'Advocacy', icon: FiShield },
    { path: '/compensation-insights', label: 'Compensation', icon: FiDollarSign },
    { path: '/data-explorer', label: 'Explorer', icon: FiSearch },
    { path: '/impact-calculator', label: 'Impact Calc', icon: FiTarget },
    { path: '/data-integrity', label: 'Integrity', icon: FiShield }
  ];

  return (
    <header className="bg-white shadow-lg border-b-4 border-yellow-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Title and Mobile Controls */}
        <div className="flex justify-between items-center pt-6 pb-4">
          <Link to="/" className="flex flex-col group">
            <h1 
              className="text-3xl sm:text-4xl font-black text-gray-900 leading-none tracking-tighter italic uppercase transition-colors group-hover:text-yellow-600" 
              style={{ fontFamily: 'futura-pt, sans-serif' }}
            >
              Michigan Upper Peninsula
            </h1>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="h-[2px] w-12 bg-yellow-400" />
              <p className="text-[10px] sm:text-xs text-gray-500 font-black uppercase tracking-[0.4em]">
                Nonprofit Economic Intelligence System
              </p>
            </div>
          </Link>

          {/* Mobile Menu Button - Only visible on small screens */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-3 rounded-xl bg-gray-50 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-all shadow-sm"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Section: Desktop Navigation Menu */}
        <nav className="hidden xl:flex items-center justify-start space-x-1 py-3 border-t border-gray-50">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all duration-200 ${
                location.pathname === item.path 
                  ? 'text-yellow-600 bg-yellow-50 shadow-inner' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <SafeIcon icon={item.icon} className={`w-3.5 h-3.5 ${location.pathname === item.path ? 'text-yellow-500' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="xl:hidden pb-6 pt-2 border-t border-gray-100"
          >
            <div className="grid grid-cols-1 gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-colors ${
                    location.pathname === item.path 
                      ? 'text-yellow-600 bg-yellow-50 border-l-4 border-yellow-400' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header;