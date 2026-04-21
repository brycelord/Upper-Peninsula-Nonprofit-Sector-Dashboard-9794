import React, { memo, useRef, useEffect, useMemo } from 'react';
import * as echarts from 'echarts';
import { getMultiTrendData } from '../services/dataService';

const TrendingMetrics = ({ filters = {} }) => {
  const chartRef = useRef(null);
  const instanceRef = useRef(null);

  const trends = useMemo(
    () => getMultiTrendData(['organizations', 'employment', 'wages'], filters.county, filters.sector),
    [filters.county, filters.sector]
  );

  const option = useMemo(() => ({
    title: {
      text: 'Longitudinal Impact Analysis (2012-2022)',
      textStyle: { fontSize: 16, fontWeight: '900', color: '#111827', fontFamily: 'futura-pt' },
      subtext: `Filtered: ${filters.county} County | ${filters.sector} Sector`,
      left: 'center'
    },
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(0,0,0,0.8)', textStyle: { color: '#fff' } },
    legend: { data: ['Orgs', 'Jobs', 'Avg Wage'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: trends.organizations.map(d => d.year),
      axisLabel: { color: '#6B7280', fontWeight: 'bold' }
    },
    yAxis: [
      { type: 'value', name: 'Count', position: 'left', axisLabel: { color: '#6B7280' } },
      { type: 'value', name: 'Wage ($)', position: 'right', axisLabel: { color: '#6B7280' } }
    ],
    series: [
      { name: 'Orgs', type: 'line', data: trends.organizations.map(d => d.value), itemStyle: { color: '#14364D' }, lineStyle: { width: 4 }, smooth: true },
      { name: 'Jobs', type: 'line', data: trends.employment.map(d => d.value), itemStyle: { color: '#4CC0B0' }, lineStyle: { width: 4 }, smooth: true },
      { name: 'Avg Wage', type: 'line', yAxisIndex: 1, data: trends.wages.map(d => d.value), itemStyle: { color: '#FFBD00' }, lineStyle: { width: 4, type: 'dashed' }, smooth: true }
    ]
  }), [trends, filters.county, filters.sector]);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    instanceRef.current = chart;

    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(chartRef.current);

    return () => {
      ro.disconnect();
      chart.dispose();
      instanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (instanceRef.current) instanceRef.current.setOption(option, true);
  }, [option]);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      <div ref={chartRef} style={{ height: '400px' }} />
    </div>
  );
};

export default memo(TrendingMetrics);
