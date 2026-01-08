import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiInfo, FiX, FiHelpCircle } = FiIcons;

const SECTOR_DEFINITIONS = {
  'Arts & Culture': 'Museums, historical societies, performing arts, and media organizations.',
  'Education': 'Schools, universities, PTAs, and adult literacy programs.',
  'Environment & Animals': 'Wildlife preserves, botanical gardens, and animal shelters.',
  'Health Services': 'Hospitals, clinics, and specialized health treatment centers.',
  'Human Services': 'Food banks, housing shelters, youth sports, and family support.',
  'International Affairs': 'Foreign aid, peace exchange, and international relief.',
  'Public & Societal Benefit': 'Economic development, civil rights advocacy, and community foundations.',
  'Religion Related': 'Churches, synagogues, and religiously affiliated outreach.',
  'Mutual Benefit': 'Trade associations, professional societies, and social clubs.',
  'Other': 'Unclassified organizations or unique mission-driven entities.'
};

const SectorGlossary = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
      >
        <div className="p-6 bg-gray-900 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-400 rounded-lg text-black">
              <SafeIcon icon={FiHelpCircle} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter italic">NTEE Category Guide</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Standardized Sector Definitions</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <SafeIcon icon={FiX} className="text-xl" />
          </button>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto">
          {Object.entries(SECTOR_DEFINITIONS).map(([sector, definition]) => (
            <div key={sector} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-yellow-400 transition-colors">
              <h4 className="text-xs font-black text-gray-900 uppercase tracking-tight mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                {sector}
              </h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-medium italic">
                {definition}
              </p>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Source: National Center for Charitable Statistics (NCCS)
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SectorGlossary;