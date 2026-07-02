import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiX, FiMapPin, FiDollarSign, FiActivity, FiFileText, FiCopy 
} = FiIcons;

const OrgDeepProfile = ({ org, onClose }) => {
  if (!org) return null;

  const overheadRatio = (((org.revenue - org.program_rev) / (org.revenue || 1)) * 100).toFixed(1);
  const liabilityCoverage = (org.assets / (org.liabilities || 1)).toFixed(2);

  const copyEin = () => {
    navigator.clipboard.writeText(org.ein);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[100] overflow-y-auto border-l border-gray-100"
    >
      {/* Sticky Header */}
      <div className="sticky top-0 bg-gray-900 text-white p-6 flex justify-between items-center z-10 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-black">
            <SafeIcon icon={FiFileText} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black uppercase tracking-tighter">EIN: {org.ein}</h2>
              <button onClick={copyEin} className="p-1 hover:bg-white/20 rounded-md transition-colors" title="Copy EIN">
                <SafeIcon icon={FiCopy} className="text-[10px]" />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">
              Regional Economic Registry Record
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <SafeIcon icon={FiX} className="text-xl" />
        </button>
      </div>

      <div className="p-8 space-y-8">
        {/* Title & Sector */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${org.is_verified ? 'bg-blue-600' : 'bg-gray-400'} text-white`}>
              {org.is_verified ? 'Verified Entity' : 'Registry Record'}
            </span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">In {org.county} County</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4 leading-[0.95]">
            {org.name}
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase rounded-full border border-blue-100">
              Form {org.filing_type}
            </span>
            <span className="px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-black uppercase rounded-full border border-teal-100">
              {org.sector}
            </span>
            <span className="px-3 py-1 bg-gray-900 text-white text-[10px] font-black uppercase rounded-full">
              FY {org.year}
            </span>
          </div>
        </section>

        {/* Financial Core Object */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
            <SafeIcon icon={FiDollarSign} className="text-green-600" /> Economic Snapshot
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-[9px] font-black text-gray-400 uppercase mb-1">Total Revenue</div>
              <div className="text-xl font-black text-gray-900">${Math.round(org.revenue).toLocaleString()}</div>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-[9px] font-black text-gray-400 uppercase mb-1">Total Expenses</div>
              <div className="text-xl font-black text-gray-900">${Math.round(org.expenses).toLocaleString()}</div>
            </div>
            <div className="p-5 bg-blue-50/30 rounded-2xl border border-blue-100">
              <div className="text-[9px] font-black text-blue-400 uppercase mb-1">Net Assets</div>
              <div className="text-xl font-black text-blue-900">${Math.round(org.assets - org.liabilities).toLocaleString()}</div>
            </div>
            <div className="p-5 bg-blue-50/30 rounded-2xl border border-blue-100">
              <div className="text-[9px] font-black text-blue-400 uppercase mb-1">Total Liabilities</div>
              <div className="text-xl font-black text-red-600">${Math.round(org.liabilities).toLocaleString()}</div>
            </div>
          </div>
        </section>

        {/* Sustainability Audit */}
        <section className="bg-gray-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <SafeIcon icon={FiActivity} className="text-[140px]" />
          </div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-yellow-400 mb-6">Internal Sustainability Audit</h3>
          <div className="grid grid-cols-2 gap-8 relative z-10">
            <div>
              <div className="text-[9px] font-black text-gray-400 uppercase mb-2">Program Efficiency</div>
              <div className="text-3xl font-black">{(100 - overheadRatio)}%</div>
              <p className="text-[8px] text-gray-500 mt-1 uppercase font-bold">Direct Service Allocation</p>
            </div>
            <div>
              <div className="text-[9px] font-black text-gray-400 uppercase mb-2">Liability Coverage</div>
              <div className="text-3xl font-black">{liabilityCoverage}x</div>
              <p className="text-[8px] text-gray-500 mt-1 uppercase font-bold">Assets vs Debt Ratio</p>
            </div>
          </div>
        </section>

        {/* Registration Context */}
        <section className="pt-8 border-t border-gray-100">
          <div className="flex items-start gap-3 p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <SafeIcon icon={FiMapPin} className="text-gray-400 mt-1" />
            <div>
              <div className="text-[9px] font-black text-gray-400 uppercase mb-1">Registry Location Data</div>
              <p className="text-xs text-gray-800 uppercase leading-tight">
                {org.address}<br />
                {org.city}, MI {org.zip}
              </p>
              <div className="mt-3 text-[9px] text-gray-400 italic">
                Verified via regional filings as of FY {org.year}.
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default OrgDeepProfile;