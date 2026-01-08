import React, { useRef, useEffect, useMemo } from 'react';
import * as echarts from 'echarts';
import { getTrendData } from '../services/dataService';

const TrendingMetrics = ({ filters = {} }) => {
  const chartRef = useRef(null);
  
  const orgTrend = useMemo(() => getTrendData('organizations', filters.county, filters.sector), [filters]);
  const empTrend = useMemo(() => getTrendData('employment', filters.county, filters.sector), [filters]);
  const wageTrend = useMemo(() => getTrendData('wages', filters.county, filters.sector), [filters]);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    
    const option = {
      title: {
        text: `Longitudinal Impact Analysis (2012-2022)`,
        textStyle: { fontSize: 16, fontWeight: '900', color: '#111827', fontFamily: 'futura-pt' },
        subtext: `Filtered: ${filters.county} County | ${filters.sector} Sector`,
        left: 'center'
      },
      tooltip: { trigger: 'axis', backgroundColor: 'rgba(0,0,0,0.8)', textStyle: { color: '#fff' } },
      legend: { data: ['Orgs', 'Jobs', 'Avg Wage'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
      xAxis: { 
        type: 'category', 
        data: orgTrend.map(d => d.year),
        axisLabel: { color: '#6B7280', fontWeight: 'bold' } 
      },
      yAxis: [
        { type: 'value', name: 'Count', position: 'left', axisLabel: { color: '#6B7280' } },
        { type: 'value', name: 'Wage ($)', position: 'right', axisLabel: { color: '#6B7280' } }
      ],
      series: [
        {
          name: 'Orgs',
          type: 'line',
          data: orgTrend.map(d => d.value),
          itemStyle: { color: '#14364D' },
          lineStyle: { width: 4 },
          smooth: true
        },
        {
          name: 'Jobs',
          type: 'line',
          data: empTrend.map(d => d.value),
          itemStyle: { color: '#4CC0B0' },
          lineStyle: { width: 4 },
          smooth: true
        },
        {
          name: 'Avg Wage',
          type: 'line',
          yAxisIndex: 1,
          data: wageTrend.map(d => d.value),
          itemStyle: { color: '#FFBD00' },
          lineStyle: { width: 4, type: 'dashed' },
          smooth: true
        }
      ]
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [orgTrend, empTrend, wageTrend, filters]);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      <div ref={chartRef} style={{ height: '400px' }} />
    </div>
  );
};

export default TrendingMetrics;