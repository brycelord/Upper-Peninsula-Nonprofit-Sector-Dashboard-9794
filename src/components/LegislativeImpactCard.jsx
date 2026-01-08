import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiMap, FiActivity, FiUsers, FiDollarSign } = FiIcons;

const LegislativeImpactCard = ({ data, type }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all group"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-900 text-yellow-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-yellow-400 group-hover:text-black transition-colors">
            <SafeIcon icon={FiMap} />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none">{data.name} District</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">MI {type === 'house' ? 'House of Reps' : 'State Senate'}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-black uppercase text-gray-400 mb-1">District Rep</div>
          <div className="text-xs font-black text-gray-900 flex items-center gap-1 justify-end">
            <SafeIcon icon={FiUser} className="text-blue-500" />
            {data.rep}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <SafeIcon icon={FiActivity} className="text-blue-500 mb-2" />
          <div className="text-lg font-black">{data.count}</div>
          <div className="text-[8px] font-bold text-gray-400 uppercase">Nonprofits</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <SafeIcon icon={FiUsers} className="text-teal-500 mb-2" />
          <div className="text-lg font-black">{data.employment.toLocaleString()}</div>
          <div className="text-[8px] font-bold text-gray-400 uppercase">Jobs</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <SafeIcon icon={FiDollarSign} className="text-yellow-600 mb-2" />
          <div className="text-lg font-black">${(data.revenue / 1e6).toFixed(1)}M</div>
          <div className="text-[8px] font-bold text-gray-400 uppercase">Revenue</div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Economic Multiplier: 1.48x</span>
        <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
          Generate Policy Brief <SafeIcon icon={FiIcons.FiArrowRight} />
        </button>
      </div>
    </motion.div>
  );
};

export default LegislativeImpactCard;