import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as echarts from 'echarts';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiUsers, FiBriefcase, FiDollarSign, FiSave, FiTrash2, FiPlus, FiArrowRight, FiHelpCircle, FiRotateCcw } = FiIcons;

const JOB_MULTIPLIER = 1.48;
const SPEND_MULTIPLIER = 1.32;

const DEFAULTS = {
  name: 'Current Modeling',
  orgCount: 50,
  avgEmployees: 12,
  avgRevenue: 450000
};

const formatCurrency = (n) => {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n}`;
};

const EconomicImpactCalculator = () => {
  const [params, setParams] = useState(DEFAULTS);
  const [savedScenarios, setSavedScenarios] = useState([]);
  const chartRef = useRef(null);

  const calculations = useMemo(() => {
    const directJobs = params.orgCount * params.avgEmployees;
    const directRevenue = params.orgCount * params.avgRevenue;
    const indirectJobs = Math.round(directJobs * (JOB_MULTIPLIER - 1));
    const totalJobs = directJobs + indirectJobs;
    const totalImpact = directRevenue * SPEND_MULTIPLIER;
    return { directJobs, indirectJobs, totalJobs, directRevenue, totalImpact };
  }, [params]);

  const handleSave = () => {
    const entry = { ...params, ...calculations, id: Date.now() };
    setSavedScenarios((prev) => [...prev.slice(-2), entry]);
  };

  const handleReset = () => setParams(DEFAULTS);
  const handleClearSaved = () => setSavedScenarios([]);

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
      tooltip: { backgroundColor: 'rgba(0,0,0,0.85)', textStyle: { color: '#fff' } },
      legend: { bottom: 0, textStyle: { fontSize: 10, fontWeight: 'bold' } },
      radar: {
        indicator: [
          { name: 'Direct Jobs', max: 5000 },
          { name: 'Community Value ($)', max: 200000000 },
          { name: 'Group Count', max: 250 },
          { name: 'Revenue per Org ($)', max: 2000000 }
        ],
        shape: 'polygon',
        splitNumber: 4,
        axisName: { color: '#111827', fontWeight: 'bold', fontSize: 10 }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [calculations.directJobs, calculations.totalImpact, params.orgCount, params.avgRevenue],
            name: params.name,
            itemStyle: { color: '#ffc425' },
            lineStyle: { color: '#ffc425', width: 3 },
            areaStyle: { opacity: 0.4, color: '#ffc425' }
          },
          ...savedScenarios.map((s) => ({
            value: [s.directJobs, s.totalImpact, s.orgCount, s.avgRevenue],
            name: s.name,
            itemStyle: { color: '#095339' },
            lineStyle: { color: '#095339', width: 2, type: 'dashed' },
            areaStyle: { opacity: 0.15, color: '#095339' }
          }))
        ]
      }]
    };
    chart.setOption(option, true);
    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(chartRef.current);
    return () => { ro.disconnect(); chart.dispose(); };
  }, [calculations, savedScenarios, params.name, params.avgRevenue, params.orgCount]);

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      <div className="p-5 md:p-6 bg-gray-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">Community Impact Predictor</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Simulate sector growth and ripple effects</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#ffc425] text-[#095339] text-[10px] font-black uppercase tracking-widest hover:brightness-95 transition-all"
          >
            <SafeIcon icon={FiSave} /> Save Scenario
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all"
          >
            <SafeIcon icon={FiRotateCcw} /> Reset
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-5">
          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Scenario Label</label>
            <input
              type="text"
              value={params.name}
              onChange={(e) => setParams({ ...params, name: e.target.value })}
              className="w-full bg-gray-50 border-2 border-gray-100 focus:border-[#095339] p-3 rounded-xl font-black text-xs uppercase outline-none transition-colors"
            />
          </div>

          <div>
            <div className="flex items-end justify-between mb-1.5">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Number of Groups</label>
              <span className="text-base font-black text-gray-900">{params.orgCount}</span>
            </div>
            <input
              type="range"
              min="1"
              max="250"
              value={params.orgCount}
              onChange={(e) => setParams({ ...params, orgCount: parseInt(e.target.value) })}
              className="w-full accent-[#ffc425]"
            />
            <div className="flex justify-between text-[9px] text-gray-400 font-bold mt-0.5">
              <span>1</span><span>125</span><span>250</span>
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between mb-1.5">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Staff per Group</label>
              <span className="text-base font-black text-gray-900">{params.avgEmployees}</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={params.avgEmployees}
              onChange={(e) => setParams({ ...params, avgEmployees: parseInt(e.target.value) })}
              className="w-full accent-[#095339]"
            />
            <div className="flex justify-between text-[9px] text-gray-400 font-bold mt-0.5">
              <span>1</span><span>50</span><span>100</span>
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between mb-1.5">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Avg Revenue per Group</label>
              <span className="text-base font-black text-gray-900">{formatCurrency(params.avgRevenue)}</span>
            </div>
            <input
              type="range"
              min="50000"
              max="2000000"
              step="25000"
              value={params.avgRevenue}
              onChange={(e) => setParams({ ...params, avgRevenue: parseInt(e.target.value) })}
              className="w-full accent-[#c41230]"
            />
            <div className="flex justify-between text-[9px] text-gray-400 font-bold mt-0.5">
              <span>$50K</span><span>$1M</span><span>$2M</span>
            </div>
          </div>

          <div className="p-3 bg-[#095339]/5 rounded-xl border border-[#095339]/10">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#095339] mb-1">Applied Multipliers</p>
            <div className="space-y-1 text-[10px] text-gray-700 font-medium">
              <div className="flex justify-between"><span>Job Multiplier</span><span className="font-black">x{JOB_MULTIPLIER}</span></div>
              <div className="flex justify-between"><span>Spending Multiplier</span><span className="font-black">x{SPEND_MULTIPLIER}</span></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Direct Jobs</span>
              <div className="text-xl md:text-2xl font-black text-gray-900">{calculations.directJobs.toLocaleString()}</div>
              <p className="text-[9px] text-gray-500 font-medium mt-1">People hired by the groups</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 group/tooltip relative">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-500">Total Jobs w/ Ripple</span>
                <SafeIcon icon={FiHelpCircle} className="text-blue-300 text-[10px] cursor-help" />
              </div>
              <MultiplierTooltip
                title="Job Ripple Effect"
                logic="Each nonprofit job spurs ~0.48 additional jobs at local vendors, child-care, and service businesses that support the workforce."
              />
              <div className="text-xl md:text-2xl font-black text-blue-900">{calculations.totalJobs.toLocaleString()}</div>
              <p className="text-[9px] text-blue-700 font-medium mt-1">+{calculations.indirectJobs.toLocaleString()} indirect</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Direct Revenue</span>
              <div className="text-xl md:text-2xl font-black text-gray-900">{formatCurrency(calculations.directRevenue)}</div>
              <p className="text-[9px] text-gray-500 font-medium mt-1">Sector budget flowing in</p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100 group/tooltip relative">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-yellow-700">Community Value</span>
                <SafeIcon icon={FiHelpCircle} className="text-yellow-400 text-[10px] cursor-help" />
              </div>
              <MultiplierTooltip
                title="Spending Ripple Effect"
                logic="Each dollar a nonprofit spends locally recirculates ~1.32x through vendors, contractors, and paychecks before leaving the region."
              />
              <div className="text-xl md:text-2xl font-black text-yellow-900">{formatCurrency(calculations.totalImpact)}</div>
              <p className="text-[9px] text-yellow-700 font-medium mt-1">After {SPEND_MULTIPLIER}x recirculation</p>
            </div>
          </div>

          <div className="relative bg-gray-50 rounded-2xl border border-gray-100 p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-900">Scenario Radar</h4>
              {savedScenarios.length > 0 && (
                <button
                  onClick={handleClearSaved}
                  className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-widest hover:bg-red-100 transition-all"
                >
                  <SafeIcon icon={FiTrash2} className="text-[10px]" /> Clear {savedScenarios.length}
                </button>
              )}
            </div>
            <div ref={chartRef} className="h-[280px] md:h-[320px] w-full" />
            <p className="text-[9px] text-gray-500 font-medium italic text-center mt-1">
              Gold shape is your live scenario. Green dashed shapes are saved comparisons (up to 3).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicImpactCalculator;
