import React from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiExternalLink, FiDatabase } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://media-manager-c.questera.ai/greta-media/85b53f475632f0423b02412327ebfb5e3ce951b965e0a1f6893e4d68e1bffc084360793c9c005dd4c371e77ab4dbbf1f/images/aW1hZ2UvcG5n/6c632d9bca2223fdd50d7d9abb65b9c0.png"
                alt="NMU Logo"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
              <h3 className="text-lg font-bold ml-2" style={{ fontFamily: 'futura-pt, sans-serif' }}>
                Michigan Upper Peninsula Nonprofit Dashboard
              </h3>
            </div>
            <p className="text-gray-300 mb-4">
              A comprehensive platform analyzing the nonprofit sector's economic impact, employment trends, and organizational landscape across Michigan's Upper Peninsula from 2013-2022.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <SafeIcon icon={FiDatabase} className="w-4 h-4" />
              <span>Data updated annually | Last update: 2023</span>
            </div>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Data Sources</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiExternalLink} className="w-3 h-3" />
                <span className="text-sm">ProPublica Nonprofit Explorer</span>
              </li>
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiExternalLink} className="w-3 h-3" />
                <span className="text-sm">QCEW Employment Data</span>
              </li>
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiExternalLink} className="w-3 h-3" />
                <span className="text-sm">IRS Business Master File</span>
              </li>
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiExternalLink} className="w-3 h-3" />
                <span className="text-sm">Michigan Geographic Data</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <SafeIcon icon={FiMail} className="w-4 h-4" />
                <span className="text-sm">research@nmu.edu</span>
              </div>
              <p className="text-xs text-gray-400">
                Northern Michigan University<br />
                Research & Analytics Department
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Northern Michigan University. All rights reserved. | Data visualization for research and public policy purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;