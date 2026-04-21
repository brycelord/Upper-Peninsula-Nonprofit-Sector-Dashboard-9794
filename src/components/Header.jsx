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
    <header className="bg-white shadow-lg border-b-4 border-[#ffc425] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center pt-6 pb-4">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 rounded-2xl bg-[#095339] flex items-center justify-center shadow-lg shadow-green-900/20 transition-transform group-hover:scale-105">
              <span className="font-display text-2xl font-black text-[#ffc425] tracking-tight">N</span>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#ffc425] border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black text-[#095339] leading-none tracking-tight uppercase transition-colors group-hover:text-[#0d7a53] font-display">
                Northern Michigan University
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="h-[2px] w-10 bg-[#ffc425]" />
                <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-[0.35em]">
                  UP Nonprofit Economic Intelligence
                </p>
              </div>
            </div>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-3 rounded-xl bg-gray-50 text-[#095339] hover:text-white hover:bg-[#095339] transition-all shadow-sm"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
          </button>
        </div>

        <nav className="hidden xl:flex items-center justify-start space-x-1 py-3 border-t border-gray-50">
          {navigationItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                  active
                    ? 'text-white bg-[#095339] shadow-md'
                    : 'text-gray-600 hover:text-[#095339] hover:bg-[#095339]/5'
                }`}
              >
                <SafeIcon icon={item.icon} className={`w-3.5 h-3.5 ${active ? 'text-[#ffc425]' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="xl:hidden pb-6 pt-2 border-t border-gray-100"
          >
            <div className="grid grid-cols-1 gap-2">
              {navigationItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors ${
                      active
                        ? 'text-white bg-[#095339] border-l-4 border-[#ffc425]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <SafeIcon icon={item.icon} className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header;