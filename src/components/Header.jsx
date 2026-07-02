import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiHome, FiPieChart, FiBriefcase, FiMap, FiDollarSign, FiTrendingUp, FiSearch, FiTarget, FiShield } = FiIcons;

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: FiHome },
  { path: '/sector-overview', label: 'Sector Overview', icon: FiPieChart },
  { path: '/employment-impact', label: 'Employment', icon: FiBriefcase },
  { path: '/geographic-analysis', label: 'Geographic', icon: FiMap },
  { path: '/advocacy-portal', label: 'Advocacy', icon: FiShield },
  { path: '/compensation-insights', label: 'Compensation', icon: FiDollarSign },
  { path: '/data-explorer', label: 'Explorer', icon: FiSearch },
  { path: '/impact-calculator', label: 'Impact Calc', icon: FiTarget },
  { path: '/data-integrity', label: 'Integrity', icon: FiShield },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white border-b-[3px] border-[#ffc425] shadow-sm">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">

        <div className="flex justify-between items-center py-2">
          <Link to="/" className="flex items-center gap-0 group shrink-0" aria-label="Northern Michigan University — Home">
            <img
              src="/assets/images/NMU_Stack_Transparent.png"
              alt="Northern Michigan University"
              className="h-12 w-auto transition-opacity group-hover:opacity-90"
            />
            <div className="hidden sm:flex flex-col ml-3 pl-3 border-l-2 border-[#ffc425]">
              <span className="text-[9px] font-black uppercase tracking-[0.28em] text-[#095339] leading-tight">
                UP Nonprofit
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.28em] text-[#095339] leading-tight">
                Economic Intelligence
              </span>
            </div>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="xl:hidden p-2 rounded-lg bg-gray-50 text-[#095339] hover:text-white hover:bg-[#095339] transition-all shadow-sm"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-5 h-5" />
          </button>
        </div>

        <nav className="hidden xl:flex items-center justify-start space-x-0.5 py-1 border-t border-gray-100">
          {navigationItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${
                  active
                    ? 'text-white bg-[#095339] shadow-sm'
                    : 'text-gray-600 hover:text-[#095339] hover:bg-[#095339]/8'
                }`}
              >
                <SafeIcon
                  icon={item.icon}
                  className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#ffc425]' : 'text-gray-400'}`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden pb-4 pt-2 border-t border-gray-100"
          >
            <div className="grid grid-cols-1 gap-1">
              {navigationItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-colors ${
                      active
                        ? 'text-white bg-[#095339] border-l-4 border-[#ffc425]'
                        : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    <SafeIcon icon={item.icon} className={`w-5 h-5 ${active ? 'text-[#ffc425]' : 'text-gray-400'}`} />
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
