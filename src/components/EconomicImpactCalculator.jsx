import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as echarts from 'echarts';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiUsers, FiBriefcase, FiDollarSign, FiSave, FiTrash2, FiPlus, FiArrowRight, FiHelpCircle } = FiIcons;

const EconomicImpactCalculator = () => {
  const [params, setParams] = useState({
    name: 'Current Modeling',
    orgCount: 50,
    avgEmployees: 12,
    avgRevenue: 450000
  });
  const [savedScenarios, setSavedScenarios] = useState([]);
  const chartRef = useRef(null);

  const calculations = useMemo(() => {
    const directJobs = params.orgCount * params.avgEmployees;
    const directRevenue = params.orgCount * params.avgRevenue;
    const totalJobs = Math.round(directJobs * 1.48); 
    const totalImpact = directRevenue * 1.32; 
    return { directJobs, totalJobs, directRevenue, totalImpact };
  }, [params]);

  const MultiplierTooltip = ({ title, logic }) => (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-gray-900 text-white text-[10px] rounded-2xl shadow-2xl opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all z-50 normal-case leading-relaxed font-medium">
      <p className="font-black text-yellow-400 mb-1 uppercase tracking-widest">{title}</p>
      <p className="text-gray-300 italic">{logic}</p>
    </div>
  );

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    const option = {
      radar: {
        indicator: [
          { name: 'People Hired', max: 5000 },
          { name: 'Community Value', max: 200000000 },
          { name: 'Group Count', max: 200 },
          { name: 'Spending Speed', max: 1.5 }
        ],
        shape: 'circle',
        splitNumber: 4
      },
      series: [{
        type: 'radar',
        data: [
          { value: [calculations.directJobs, calculations.totalImpact, params.orgCount, 1.32], name: params.name, itemStyle: { color: '#FFBD00' }, areaStyle: { opacity: 0.3 } },
          ...savedScenarios.map(s => ({ value: [s.directJobs, s.totalImpact, s.orgCount, 1.32], name: s.name, itemStyle: { color: '#14364D' }, areaStyle: { opacity: 0.1 } }))
        ]
      }]
    };
    chart.setOption(option);
    return () => chart.dispose();
  }, [calculations, savedScenarios, params.name]);

  return (
    <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden">
      <div className="p-8 bg-gray-900 text-white flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Community Impact Predictor</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">See what happens when our sector grows</p>
        </div>
      </div>
      <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-6">
            <input type="text" value={params.name} onChange={(e) => setParams({ ...params, name: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 p-3 rounded-xl font-black text-xs uppercase" />
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">Number of Groups</label>
              <input type="range" min="1" max="250" value={params.orgCount} onChange={(e) => setParams({ ...params, orgCount: parseInt(e.target.value) })} className="w-full accent-yellow-400" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">Staff per Group</label>
              <input type="range" min="1" max="100" value={params.avgEmployees} onChange={(e) => setParams({ ...params, avgEmployees: parseInt(e.target.value) })} className="w-full accent-blue-500" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 group/tooltip relative">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase text-blue-400 block">Total Local Jobs</span>
                <SafeIcon icon={FiHelpCircle} className="text-blue-200 text-xs cursor-help" />
              </div>
              <MultiplierTooltip 
                title="The Job Ripple Effect" 
                logic="When a nonprofit hires a person, it helps create more jobs in the community (like at nearby shops or services for those employees)."
              />
              <div className="text-3xl font-black text-blue-900">{calculations.totalJobs}</div>
            </div>
            <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100 group/tooltip relative">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase text-yellow-600 block">Total Community Value</span>
                <SafeIcon icon={FiHelpCircle} className="text-yellow-200 text-xs cursor-help" />
              </div>
              <MultiplierTooltip 
                title="The Spending Ripple Effect" 
                logic="For every dollar a nonprofit spends on its mission locally, it generates extra economic activity through local vendors and contractors."
              />
              <div className="text-3xl font-black text-yellow-900">${(calculations.totalImpact / 1e6).toFixed(1)}M</div>
            </div>
          </div>
          <div ref={chartRef} className="h-[300px] w-full" />
        </div>
      </div>
    </div>
  );
};

export default EconomicImpactCalculator;