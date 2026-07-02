import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiExternalLink, FiMapPin, FiAward } = FiIcons;

const CASE_STUDIES = [
  {
    county: 'Marquette',
    name: "UP Children's Museum",
    impact: "Provides interactive learning for 35,000+ visitors annually.",
    tag: "Education",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=400"
  },
  {
    county: 'Houghton',
    name: "Copper Country Arts",
    impact: "Supports 150+ local artists and preserves regional heritage.",
    tag: "Arts",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=400"
  },
  {
    county: 'Chippewa',
    name: "United Way Eastern UP",
    impact: "Coordinated $1.2M in crisis relief for rural families last year.",
    tag: "Human Services",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=400"
  }
];

const CaseStudySection = ({ selectedCounty }) => {
  const filtered = selectedCounty === 'All' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(c => c.county === selectedCounty);

  if (filtered.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Regional Impact Spotlights</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Real Stories Behind the Data</p>
        </div>
        <div className="p-2 bg-red-100 text-red-600 rounded-lg">
          <SafeIcon icon={FiHeart} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((study, idx) => (
          <motion.div 
            key={study.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all"
          >
            <div className="h-32 w-full relative">
              <img src={study.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={study.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="px-2 py-0.5 bg-yellow-400 text-black text-[8px] font-black uppercase rounded">
                  {study.tag}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1 text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                <SafeIcon icon={FiMapPin} /> {study.county}
              </div>
              <h4 className="text-lg font-black text-gray-900 tracking-tighter leading-tight mb-2 uppercase">
                {study.name}
              </h4>
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed mb-4 italic">
                "{study.impact}"
              </p>
              <button className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800 transition-colors">
                View Impact Report <SafeIcon icon={FiExternalLink} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudySection;