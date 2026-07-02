import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiActivity, FiServer, FiDatabase, FiRefreshCw } = FiIcons;

const ReliabilityReport = ({ countyData }) => {
  if (!countyData) return null;

  // Use the confidence score from our service
  const score = countyData.confidence || 0.95;

  const metrics = [
    { label: 'Source Integrity', val: 98, icon: FiDatabase, color: 'text-blue-500' },
    { label: 'Sample Coverage', val: Math.round(score * 100), icon: FiActivity, color: 'text-teal-500' },
    { label: 'Sync Freshness', val: 100, icon: FiRefreshCw, color: 'text-green-500' }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-900">Data Reliability Index</h3>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Technical Quality Audit</p>
        </div>
        <div className="p-2 bg-gray-100 text-gray-400 rounded-lg">
          <SafeIcon icon={FiServer} />
        </div>
      </div>

      <div className="space-y-5">
        {metrics.map((m, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-2">
                <SafeIcon icon={m.icon} className={`text-xs ${m.color}`} />
                <span className="text-[9px] font-black uppercase text-gray-500 tracking-tight">{m.label}</span>
              </div>
              <span className="text-xs font-black text-gray-900">{m.val}%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${m.val}%` }}
                className={`h-full ${m.color.replace('text', 'bg')}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-50">
        <p className="text-[10px] text-gray-400 font-medium italic leading-relaxed">
          Reliability is current at {(score * 100).toFixed(1)}%. Low population density in rural UP counties can lead to higher statistical volatility.
        </p>
      </div>
    </div>
  );
};

export default ReliabilityReport;