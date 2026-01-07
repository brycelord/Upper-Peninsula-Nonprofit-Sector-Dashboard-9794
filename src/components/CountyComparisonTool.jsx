import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as echarts from 'echarts';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiRepeat, FiUsers, FiActivity, FiDollarSign, FiBarChart, FiMinus, FiPlus, FiChevronRight } = FiIcons;

const CountyComparisonTool = ({ data }) => {
  const [countyA, setCountyA] = useState(data[0].name);
  const [countyB, setCountyB] = useState(data[1].name);
  const chartRef = useRef(null);

  const statsA = useMemo(() => data.find(c => c.name === countyA), [countyA, data]);
  const statsB = useMemo(() => data.find(c => c.name === countyB), [countyB, data]);

  const metrics = [
    { key: 'organizations', label: 'Nonprofits', icon: FiActivity, format: (v) => v },
    { key: 'density', label: 'Density', icon: FiBarChart, format: (v) => v.toFixed(2) },
    { key: 'employment', label: 'Employment', icon: FiUsers, format: (v) => v.toLocaleString() },
    { key: 'baseWage', label: 'Avg Wage', icon: FiDollarSign, format: (v) => `$${v.toLocaleString()}` }
  ];

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    const option = {
      radar: {
        indicator: metrics.map(m => ({ name: m.label, max: Math.max(...data.map(d => d[m.key])) * 1.1 })),
        splitArea: { show: false },
        axisLine: { lineStyle: { color: '#E5E7EB' } }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: metrics.map(m => statsA[m.key]),
            name: countyA,
            itemStyle: { color: '#14364D' },
            areaStyle: { opacity: 0.3 }
          },
          {
            value: metrics.map(m => statsB[m.key]),
            name: countyB,
            itemStyle: { color: '#FFBD00' },
            areaStyle: { opacity: 0.3 }
          }
        ]
      }],
      legend: { bottom: 0, left: 'center' },
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

  const calculateVariance = (valA, valB) => {
    const diff = valA - valB;
    const pct = ((diff / valB) * 100).toFixed(1);
    return { diff, pct };
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mt-12">
      <div className="p-6 bg-gray-900 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-400 rounded-lg text-black">
            <SafeIcon icon={FiRepeat} />
          </div>
          <div>
            <h3 className="text-xl font-bold" style={{ fontFamily: 'futura-pt, sans-serif' }}>Side-by-Side Comparison</h3>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Regional Variance Analysis</p>
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Selection & Stats */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-5/12">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Subject A</label>
              <select 
                value={countyA} 
                onChange={(e) => setCountyA(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 p-3 rounded-xl font-black text-gray-900 outline-none focus:border-gray-900 transition-all"
              >
                {data.map(c => <option key={c.name} value={c.name}>{c.name} County</option>)}
              </select>
            </div>
            <div className="p-3 bg-gray-100 rounded-full text-gray-400 font-black italic">VS</div>
            <div className="w-full md:w-5/12">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Subject B</label>
              <select 
                value={countyB} 
                onChange={(e) => setCountyB(e.target.value)}
                className="w-full bg-gray-50 border-2 border-yellow-100 p-3 rounded-xl font-black text-gray-900 outline-none focus:border-yellow-400 transition-all"
              >
                {data.map(c => <option key={c.name} value={c.name}>{c.name} County</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((m) => {
              const variance = calculateVariance(statsA[m.key], statsB[m.key]);
              return (
                <div key={m.key} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <SafeIcon icon={m.icon} className="text-sm" />
                    <span className="text-xs font-bold uppercase tracking-widest">{m.label}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-gray-900">{m.format(statsA[m.key])}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{countyA}</span>
                    </div>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <div className="flex flex-col text-right">
                      <span className="text-2xl font-black text-gray-900">{m.format(statsB[m.key])}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{countyB}</span>
                    </div>
                  </div>
                  <div className={`mt-4 pt-4 border-t border-gray-200 flex items-center justify-between font-bold text-xs ${variance.diff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <span className="uppercase">Variance</span>
                    <span>{variance.diff > 0 ? '+' : ''}{variance.pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Comparison */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-full flex flex-col">
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 text-center">Performance Radar</h4>
            <div ref={chartRef} className="flex-grow min-h-[300px]" />
            <div className="mt-4 p-4 bg-white rounded-xl text-[10px] text-gray-500 italic leading-relaxed">
              Comparison based on normalized values across all UP counties. Larger area indicates broader economic impact.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountyComparisonTool;