import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const CountyTrendChart = ({ countyName, metric, data, color }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || !chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    
    const option = {
      title: {
        text: `${countyName}: ${metric} Trend (2013-2022)`,
        left: 'center',
        textStyle: {
          fontSize: 14,
          fontWeight: '600',
          color: '#374151'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const val = params[0].value;
          return `${params[0].name}<br/>${metric}: <b>${metric.includes('Wage') ? '$' + val.toLocaleString() : val.toLocaleString()}</b>`;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '20%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        axisLine: { lineStyle: { color: '#D1D5DB' } },
        axisLabel: { color: '#6B7280' }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisLabel: { color: '#6B7280' },
        splitLine: { lineStyle: { type: 'dashed', color: '#E5E7EB' } }
      },
      series: [{
        data: data,
        type: 'line',
        smooth: true,
        symbolSize: 8,
        itemStyle: { color: color || '#FFBD00' },
        lineStyle: { width: 3 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: color ? `${color}33` : 'rgba(255, 189, 0, 0.2)' },
            { offset: 1, color: color ? `${color}00` : 'rgba(255, 189, 0, 0)' }
          ])
        }
      }]
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [countyName, metric, data, color]);

  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-inner">
      <div ref={chartRef} style={{ height: '220px', width: '100%' }} />
    </div>
  );
};

export default CountyTrendChart;