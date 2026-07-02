import React, { useRef, useEffect, useMemo } from 'react';
import * as echarts from 'echarts';
import { getTrendData, getBenchmarkTrends } from '../services/dataService';

const DynamicMetricChart = ({ 
  metric = 'revenue', 
  chartType = 'line', 
  county = 'All', 
  sector = 'All',
  showBenchmarks = true 
}) => {
  const chartRef = useRef(null);
  
  const rawData = useMemo(() => getTrendData(metric, county, sector), [metric, county, sector]);
  const benchmarks = useMemo(() => getBenchmarkTrends(metric), [metric]);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    const isScatter = chartType === 'scatter';
    
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        borderRadius: 12,
        padding: 16,
        textStyle: { color: '#fff', fontSize: 11, fontFamily: 'Roboto' },
        borderWidth: 0,
        axisPointer: { type: 'shadow' }
      },
      grid: { left: '4%', right: '4%', bottom: '10%', top: '15%', containLabel: true },
      xAxis: {
        type: 'category',
        data: rawData.map(d => d.year),
        axisLine: { lineStyle: { color: '#E5E7EB' } },
        axisLabel: { color: '#9CA3AF', fontWeight: 'bold', fontSize: 10 }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { type: 'dashed', color: '#F3F4F6' } },
        axisLabel: { 
          color: '#9CA3AF', 
          fontSize: 10,
          formatter: (value) => {
            if (metric === 'revenue' || metric === 'assets') return `$${(value / 1e6).toFixed(0)}M`;
            if (metric === 'averageWage') return `$${(value / 1e3).toFixed(0)}K`;
            return value.toLocaleString();
          }
        }
      },
      series: [
        {
          name: `${county} Data`,
          type: isScatter ? 'scatter' : chartType,
          data: rawData.map(d => d.value),
          smooth: true,
          symbolSize: isScatter ? 15 : 8,
          itemStyle: { color: '#095339' },
          areaStyle: chartType === 'line' ? {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(9, 83, 57, 0.25)' },
              { offset: 1, color: 'rgba(9, 83, 57, 0)' }
            ])
          } : undefined,
          lineStyle: { width: 4 },
          emphasis: { scale: true }
        },
        ...(showBenchmarks ? [
          {
            name: 'UP Average',
            type: 'line',
            data: benchmarks.map(b => b.upAverage),
            lineStyle: { width: 2, type: 'dotted', color: '#ffc425' },
            itemStyle: { color: '#ffc425' },
            symbol: 'none'
          }
        ] : [])
      ]
    };

    chart.setOption(option, true);
    
    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.dispose();
    };
  }, [rawData, benchmarks, chartType, metric, showBenchmarks, county]);

  return (
    <div className="w-full bg-white rounded-[32px] p-8 shadow-2xl border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900">
            {metric.replace(/([A-Z])/g, ' $1')} Velocity
          </h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
            {county} • {sector} • 10-Year Longitudinal Analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-[#095339] rounded-full" />
            <span className="text-[9px] font-black uppercase text-gray-500">Subject</span>
          </div>
          {showBenchmarks && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-[#ffc425] rounded-full" />
              <span className="text-[9px] font-black uppercase text-yellow-700">UP Benchmark</span>
            </div>
          )}
        </div>
      </div>
      <div ref={chartRef} className="h-[450px] w-full" />
    </div>
  );
};

export default DynamicMetricChart;