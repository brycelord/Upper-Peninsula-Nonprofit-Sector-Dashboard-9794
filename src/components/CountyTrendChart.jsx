import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { getBenchmarkTrends } from '../services/dataService';

const CountyTrendChart = ({ countyName, metric, data, color, showBenchmarks = true }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || !chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    
    // Map internal metric names to service metric names
    const serviceMetric = metric.toLowerCase().includes('wage') ? 'averageWage' : 
                         metric.toLowerCase().includes('revenue') ? 'revenue' : 
                         metric.toLowerCase().includes('employment') ? 'employment' : 'count';

    const benchmarks = getBenchmarkTrends(serviceMetric);

    const option = {
      title: {
        text: `${countyName}: ${metric} Trend`,
        left: 'left',
        textStyle: { fontSize: 12, fontWeight: '900', color: '#111827', fontFamily: 'futura-pt' }
      },
      tooltip: { 
        trigger: 'axis',
        backgroundColor: 'rgba(0,0,0,0.9)',
        textStyle: { color: '#fff' }
      },
      legend: {
        bottom: 0,
        right: 0,
        icon: 'rect',
        itemWidth: 10,
        itemHeight: 2,
        textStyle: { fontSize: 10, fontWeight: 'bold' }
      },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '20%', containLabel: true },
      xAxis: { 
        type: 'category', 
        data: ['2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'],
        axisLabel: { fontSize: 9, fontWeight: 'bold', color: '#9CA3AF' }
      },
      yAxis: { 
        type: 'value',
        splitLine: { lineStyle: { type: 'dashed', color: '#F3F4F6' } },
        axisLabel: { fontSize: 9, color: '#9CA3AF' }
      },
      series: [
        {
          name: countyName,
          data: data,
          type: 'line',
          smooth: true,
          symbolSize: 6,
          itemStyle: { color: color || '#FFBD00' },
          lineStyle: { width: 3 }
        },
        ...(showBenchmarks ? [
          {
            name: 'UP Average',
            data: benchmarks.map(b => b.upAverage),
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: { width: 2, type: 'dotted', color: '#94A3B8' }
          },
          {
            name: 'State Baseline',
            data: benchmarks.map(b => b.stateAverage),
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: { width: 1, type: 'dashed', color: '#CBD5E1' }
          }
        ] : [])
      ]
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [countyName, metric, data, color, showBenchmarks]);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div ref={chartRef} style={{ height: '240px', width: '100%' }} />
    </div>
  );
};

export default CountyTrendChart;