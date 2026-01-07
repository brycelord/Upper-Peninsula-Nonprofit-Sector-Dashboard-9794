import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiInfo, FiArrowUpRight, FiTarget } = FiIcons;

const InsightFeed = () => {
  const insights = [
    {
      title: "Workforce Surge",
      text: "Marquette's nonprofit employment grew by 8.7% this fiscal year, exceeding state recovery averages.",
      tag: "Growth",
      icon: FiArrowUpRight,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "Wage Parity Gap",
      text: "Houghton's average wage is now 98% of the state median, a historic high for the Keweenaw region.",
      tag: "Economy",
      icon: FiTarget,
      color: "text-teal-500",
      bg: "bg-teal-50"
    },
    {
      title: "Service Density",
      text: "Keweenaw County maintains the highest per-capita nonprofit density despite population decline.",
      tag: "Impact",
      icon: FiZap,
      color: "text-yellow-600",
      bg: "bg-yellow-50"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Personalized Insights</h3>
        <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-bold text-gray-500 rounded uppercase">Live Feed</span>
      </div>
      {insights.map((insight, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-default"
        >
          <div className="flex gap-4">
            <div className={`shrink-0 w-10 h-10 ${insight.bg} ${insight.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <SafeIcon icon={insight.icon} className="text-lg" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black text-gray-900 uppercase tracking-tight">{insight.title}</span>
                <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${insight.bg} ${insight.color}`}>
                  {insight.tag}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                {insight.text}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
      <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-yellow-400 hover:text-yellow-600 transition-all">
        Explore More Insights
      </button>
    </div>
  );
};

export default InsightFeed;