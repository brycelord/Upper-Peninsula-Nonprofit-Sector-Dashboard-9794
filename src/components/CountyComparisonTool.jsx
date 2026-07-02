import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as echarts from 'echarts';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiRepeat, FiUsers, FiActivity, FiDollarSign, 
  FiBarChart, FiChevronRight, FiTrendingUp, FiTrendingDown,
  FiInfo, FiSearch, FiZap
} = FiIcons;

const CountyComparisonTool = ({ data }) => {
  const [countyA, setCountyA] = useState(data[0].name);
  const [countyB, setCountyB] = useState(data[1].name);
  const chartRef = useRef(null);

  const statsA = useMemo(() => data.find(c => c.name === countyA), [countyA, data]);
  const statsB = useMemo(() => data.find(c => c.name === countyB), [countyB, data]);

  const metrics = [
    { 
      key: 'organizations', 
      label: 'Nonprofits', 
      icon: FiActivity, 
      format: (v) => v,
      desc: 'Total active 501(c)(3) entities'
    },
    { 
      key: 'density', 
      label: 'Density', 
      icon: FiBarChart, 
      format: (v) => v.toFixed(2),
      desc: 'Orgs per 1,000 residents'
    },
    { 
      key: 'employment', 
      label: 'Employment', 
      icon: FiUsers, 
      format: (v) => v.toLocaleString(),
      desc: 'Sector-specific FTE workforce'
    },
    { 
      key: 'baseWage', 
      label: 'Avg Wage', 
      icon: FiDollarSign, 
      format: (v) => `$${v.toLocaleString()}`,
      desc: 'Annual mean compensation'
    }
  ];

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    
    const option = {
      radar: {
        indicator: metrics.map(m => ({ 
          name: m.label, 
          max: Math.max(...data.map(d => d[m.key])) * 1.1 
        })),
        splitArea: { show: false },
        axisLine: { lineStyle: { color: '#E5E7EB' } },
        splitLine: { lineStyle: { color: '#F3F4F6' } }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: metrics.map(m => statsA[m.key]),
            name: countyA,
            itemStyle: { color: '#14364D' },
            areaStyle: { opacity: 0.25, color: '#14364D' },
            lineStyle: { width: 3 }
          },
          {
            value: metrics.map(m => statsB[m.key]),
            name: countyB,
            itemStyle: { color: '#FFBD00' },
            areaStyle: { opacity: 0.35, color: '#FFBD00' },
            lineStyle: { width: 3 }
          }
        ]
      }],
      tooltip: { trigger: 'item' }
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [statsA, statsB, data]);

  const handleSwap = () => {
    const temp = countyA;
    setCountyA(countyB);
    setCountyB(temp);
  };

  const calculateVariance = (valA, valB) => {
    const diff = valA - valB;
    const pct = ((diff / (valB || 1)) * 100).toFixed(1);
    return { diff, pct: parseFloat(pct) };
  };

  const getInsight = () => {
    const wageGap = calculateVariance(statsA.baseWage, statsB.baseWage).pct;
    const jobGap = calculateVariance(statsA.employment, statsB.employment).pct;
    
    if (Math.abs(wageGap) > 15) {
      return `${countyA} shows a significant compensation ${wageGap > 0 ? 'lead' : 'deficit'} of ${Math.abs(wageGap)}% compared to ${countyB}.`;
    }
    if (Math.abs(jobGap) > 20) {
      return `${countyA} serves as a much larger employment anchor (${Math.abs(jobGap)}% delta) for the regional sector.`;
    }
    return `These counties show high structural parity across core nonprofit economic indicators.`;
  };

  return (
    <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 mt-12">
      <div className="p-8 bg-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-black shadow-xl shadow-yellow-900/20">
            <SafeIcon icon={FiRepeat} className="text-2xl" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Subject Comparison</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Regional Variance & Delta Analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10">
          <SafeIcon icon={FiZap} className="text-yellow-400 ml-2" />
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mr-4">Auto-Insights Active</span>
        </div>
      </div>

      <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Selection & Analysis */}
        <div className="lg:col-span-7 space-y-10">
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Primary Subject</label>
              <select 
                value={countyA} 
                onChange={(e) => setCountyA(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl font-black text-gray-900 outline-none focus:border-gray-900 transition-all appearance-none cursor-pointer hover:bg-gray-100"
              >
                {data.map(c => <option key={c.name} value={c.name}>{c.name} County</option>)}
              </select>
            </div>

            <button 
              onClick={handleSwap}
              className="mt-6 p-4 bg-gray-900 text-yellow-400 rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all group"
              title="Swap subjects"
            >
              <SafeIcon icon={FiRepeat} className="text-xl group-hover:rotate-180 transition-transform duration-500" />
            </button>

            <div className="flex-1 text-right">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 mr-1 text-right">Comparison Baseline</label>
              <select 
                value={countyB} 
                onChange={(e) => setCountyB(e.target.value)}
                className="w-full bg-gray-50 border-2 border-yellow-100 p-4 rounded-2xl font-black text-gray-900 outline-none focus:border-yellow-400 transition-all appearance-none cursor-pointer hover:bg-yellow-50 text-right"
              >
                {data.map(c => <option key={c.name} value={c.name}>{c.name} County</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((m) => {
              const varResult = calculateVariance(statsA[m.key], statsB[m.key]);
              return (
                <motion.div 
                  key={m.key}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 rounded-[32px] p-6 border border-gray-100 relative group overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                       <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-gray-900 group-hover:text-white transition-colors">
                        <SafeIcon icon={m.icon} className="text-sm" />
                       </div>
                       <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">{m.label}</span>
                    </div>
                    <div className="group/info relative">
                      <SafeIcon icon={FiInfo} className="text-gray-300 cursor-help" />
                      <div className="invisible group-hover/info:visible absolute bottom-full right-0 mb-2 w-48 p-3 bg-gray-900 text-white text-[9px] rounded-xl shadow-2xl z-50 normal-case leading-relaxed font-medium">
                        {m.desc}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-gray-900 tracking-tighter italic uppercase">{m.format(statsA[m.key])}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-2xl font-black text-gray-400 tracking-tighter italic uppercase">{m.format(statsB[m.key])}</span>
                    </div>
                  </div>

                  {/* Visual Swing Bar */}
                  <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: '50%' }}
                      animate={{ width: `${50 + (varResult.pct / 4)}%` }} // Scaling factor for visual
                      className={`h-full ${varResult.pct > 0 ? 'bg-green-500' : 'bg-red-500'} rounded-full`}
                    />
                    <div className="absolute left-1/2 top-0 w-0.5 h-full bg-white/50 -translate-x-1/2" />
                  </div>

                  <div className={`mt-3 flex items-center justify-between font-black text-[9px] uppercase tracking-widest ${varResult.pct > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    <span>{varResult.pct > 0 ? <SafeIcon icon={FiTrendingUp} /> : <SafeIcon icon={FiTrendingDown} />} Variance</span>
                    <span>{varResult.pct > 0 ? '+' : ''}{varResult.pct}%</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Radar & Summary */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-gray-900 rounded-[32px] p-8 text-white h-full flex flex-col shadow-2xl relative overflow-hidden">
             <div className="absolute -right-10 -top-10 opacity-5">
              <SafeIcon icon={FiBarChart} className="text-[180px]" />
            </div>
            
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-yellow-400 flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" /> Performance Radar
            </h4>
            
            <div className="flex-grow min-h-[320px] bg-white/5 rounded-3xl p-4 backdrop-blur-sm border border-white/10">
              <div ref={chartRef} className="h-full w-full" />
            </div>

            <div className="mt-8 p-6 bg-white/5 rounded-[24px] border border-white/10">
               <div className="flex items-center gap-2 mb-3">
                <SafeIcon icon={FiZap} className="text-yellow-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">AI-Synthesized Delta</span>
              </div>
              <p className="text-xs font-medium text-gray-400 leading-relaxed italic">
                "{getInsight()}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountyComparisonTool;