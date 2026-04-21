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
    <div className="min-h-screen bg-gray-50 py-4 md:py-6">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-2 shadow-md shadow-blue-200">
                <SafeIcon icon={FiShield} /> Public Policy & Advocacy Engine
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter italic uppercase mb-1">Legislative Mapping</h1>
              <p className="text-gray-500 font-medium text-sm max-w-2xl">
                Connecting regional nonprofit economic data to Michigan's Legislative Districts.
              </p>
            </div>

            <div className="bg-white p-1 rounded-xl shadow-md border border-gray-100 flex gap-1">
              <button
                onClick={() => setDistrictType('house')}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${districtType === 'house' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                MI House
              </button>
              <button
                onClick={() => setDistrictType('senate')}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${districtType === 'senate' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                MI Senate
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4">
          {legislativeData.map((dist, idx) => (
            <LegislativeImpactCard key={dist.name} data={dist} type={districtType} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <div className="bg-gray-900 rounded-2xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 opacity-10">
                <SafeIcon icon={FiFileText} className="text-[240px]" />
              </div>
              <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter mb-2 text-yellow-400">Toolkit for Advocates</h2>
                <p className="text-gray-400 mb-4 max-w-xl font-medium leading-relaxed text-sm">
                  Download pre-formatted data sheets tailored for meetings with local representatives.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group">
                    <div className="text-left">
                      <div className="text-[10px] font-black text-yellow-500 uppercase mb-0.5">PDF Export</div>
                      <div className="text-xs font-bold">2023 UP Impact Summary</div>
                    </div>
                    <SafeIcon icon={FiDownload} className="text-lg group-hover:translate-y-1 transition-transform" />
                  </button>
                  <button className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group">
                    <div className="text-left">
                      <div className="text-[10px] font-black text-teal-400 uppercase mb-0.5">Deck</div>
                      <div className="text-xs font-bold">Workforce Briefing</div>
                    </div>
                    <SafeIcon icon={FiTarget} className="text-lg group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-100 shadow-md h-full">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                <SafeIcon icon={FiMessageCircle} className="text-blue-600" />
                Strategic Messaging
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-xs italic text-blue-900 leading-relaxed">
                    "The nonprofit sector in our district provides more than just services; it's a primary economic driver employing 1 in every 15 residents."
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                  <p className="text-xs italic text-yellow-900 leading-relaxed">
                    "For every $1 of public investment in our regional nonprofits, we see a $1.48 return in local economic activity."
                  </p>
                </div>
                <button className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-black uppercase text-[10px] tracking-widest shadow-md hover:bg-black">
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