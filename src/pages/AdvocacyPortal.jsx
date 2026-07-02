import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import LegislativeImpactCard from '../components/LegislativeImpactCard';
import { getLegislativeData } from '../services/dataService';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiFileText, FiTarget, FiMessageCircle, FiDownload } = FiIcons;

const AdvocacyPortal = () => {
  const [districtType, setDistrictType] = useState('house');
  const legislativeData = useMemo(() => getLegislativeData(districtType), [districtType]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4 shadow-lg shadow-blue-200">
                <SafeIcon icon={FiShield} /> Public Policy & Advocacy Engine
              </div>
              <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic uppercase mb-2">Legislative Mapping</h1>
              <p className="text-gray-500 font-medium max-w-2xl">
                Connecting regional nonprofit economic data to Michigan's Legislative Districts. 
                Equip yourself with the metrics needed for effective advocacy and policy briefings.
              </p>
            </div>
            
            <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex gap-2">
              <button 
                onClick={() => setDistrictType('house')}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${districtType === 'house' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                MI House Districts
              </button>
              <button 
                onClick={() => setDistrictType('senate')}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${districtType === 'senate' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                MI Senate Districts
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {legislativeData.map((dist, idx) => (
            <LegislativeImpactCard key={dist.name} data={dist} type={districtType} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-gray-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 opacity-10">
                <SafeIcon icon={FiFileText} className="text-[300px]" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4 text-yellow-400">Toolkit for Advocates</h2>
                <p className="text-gray-400 mb-8 max-w-xl font-medium leading-relaxed">
                  Download pre-formatted data sheets tailored for meetings with local representatives. 
                  These summaries translate raw 990 data into "Jobs Created" and "Regional Economic Velocity."
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                    <div className="text-left">
                      <div className="text-[10px] font-black text-yellow-500 uppercase mb-1">PDF Export</div>
                      <div className="text-sm font-bold">2023 UP Impact Summary</div>
                    </div>
                    <SafeIcon icon={FiDownload} className="text-xl group-hover:translate-y-1 transition-transform" />
                  </button>
                  <button className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                    <div className="text-left">
                      <div className="text-[10px] font-black text-teal-400 uppercase mb-1">Presentation Deck</div>
                      <div className="text-sm font-bold">NP Sector Workforce Briefing</div>
                    </div>
                    <SafeIcon icon={FiTarget} className="text-xl group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl h-full">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <SafeIcon icon={FiMessageCircle} className="text-blue-600" />
                Strategic Messaging
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-xs italic text-blue-900 leading-relaxed">
                    "The nonprofit sector in our district provides more than just services; it's a primary economic driver employing 1 in every 15 residents."
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                  <p className="text-xs italic text-yellow-900 leading-relaxed">
                    "For every $1 of public investment in our regional nonprofits, we see a $1.48 return in local economic activity."
                  </p>
                </div>
                <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-black">
                  Copy All Advocacy Scripts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvocacyPortal;