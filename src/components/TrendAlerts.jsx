import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import { getCountyAggregates } from '../services/dataService';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiAlertTriangle, FiZap, FiActivity, FiArrowRight, FiShield } = FiIcons;

const TrendAlerts = () => {
  const navigate = useNavigate();

  const alerts = useMemo(() => {
    const currentData = getCountyAggregates(2022);
    const prevData = getCountyAggregates(2021);
    const detectedAlerts = [];

    currentData.forEach(county => {
      const prev = prevData.find(p => p.name === county.name);
      if (!prev) return;

      // Logic 1: Revenue Surge (>15% growth)
      const revGrowth = ((county.revenue - prev.revenue) / prev.revenue) * 100;
      if (revGrowth > 15) {
        detectedAlerts.push({
          id: `rev-${county.name}`,
          type: 'growth',
          county: county.name,
          title: 'Revenue Explosion',
          message: `${county.name} saw a massive ${revGrowth.toFixed(1)}% jump in aggregate nonprofit revenue.`,
          icon: FiZap,
          color: 'text-yellow-600 bg-yellow-50 border-yellow-100',
          priority: 'high'
        });
      }

      // Logic 2: Employment Benchmark (Above Regional Avg)
      const avgEmp = currentData.reduce((acc, c) => acc + c.employment, 0) / 15;
      if (county.employment > avgEmp * 1.5) {
        detectedAlerts.push({
          id: `emp-${county.name}`,
          type: 'workforce',
          county: county.name,
          title: 'Employment Anchor',
          message: `${county.name} is now outperforming the UP average employment benchmark by 50%.`,
          icon: FiActivity,
          color: 'text-blue-600 bg-blue-50 border-blue-100',
          priority: 'medium'
        });
      }

      // Logic 3: Data Confidence Alert (Low confidence < 0.7)
      if (county.confidence < 0.7) {
        detectedAlerts.push({
          id: `conf-${county.name}`,
          type: 'integrity',
          county: county.name,
          title: 'Precision Warning',
          message: `Reporting volatility detected in ${county.name}. Recommend secondary verification for policy use.`,
          icon: FiAlertTriangle,
          color: 'text-red-600 bg-red-50 border-red-100',
          priority: 'critical'
        });
      }
    });

    return detectedAlerts.sort((a, b) => (a.priority === 'critical' ? -1 : 1)).slice(0, 5);
  }, []);

  const handleAnalyze = (countyName) => {
    // Navigate to Geographic Analysis with the county pre-selected via query param
    navigate(`/geographic-analysis?county=${encodeURIComponent(countyName)}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 italic">Regional Signals</h3>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Automated Trend Detection</p>
        </div>
        <div className="px-2 py-1 bg-gray-900 text-yellow-400 rounded text-[8px] font-black uppercase flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
          Live Audit
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, idx) => (
          <motion.div 
            key={alert.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 rounded-2xl border ${alert.color.split(' ').slice(1).join(' ')} group cursor-default`}
          >
            <div className="flex gap-4">
              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${alert.color.split(' ')[0]} bg-white shadow-sm group-hover:scale-110 transition-transform`}>
                <SafeIcon icon={alert.icon} className="text-lg" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{alert.title}</span>
                  <span className="text-[8px] font-black text-gray-400 uppercase">{alert.county}</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-tight font-medium italic">
                  {alert.message}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[8px] font-black uppercase text-gray-400">
                    <SafeIcon icon={FiShield} className="text-[10px]" />
                    Verified Scan
                  </div>
                  <button 
                    onClick={() => handleAnalyze(alert.county)}
                    className="text-[9px] font-black text-gray-900 uppercase flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Analyze <SafeIcon icon={FiArrowRight} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button 
        onClick={() => navigate('/historical-trends')}
        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-gray-900 hover:text-gray-900 transition-all flex items-center justify-center gap-2"
      >
        <SafeIcon icon={FiTrendingUp} />
        View Full Signal History
      </button>
    </div>
  );
};

export default TrendAlerts;