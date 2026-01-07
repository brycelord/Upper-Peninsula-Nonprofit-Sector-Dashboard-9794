import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const TrendingMetrics = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    
    const option = {
      title: {
        text: 'Key Trends (2013-2022)',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#374151'
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        textStyle: {
          color: '#fff'
        }
      },
      legend: {
        data: ['Organizations', 'Employment', 'Avg Wage ($1000s)'],
        bottom: 10
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        axisLabel: {
          color: '#6B7280'
        }
      },
      yAxis: [
        {
          type: 'value',
          name: 'Count',
          position: 'left',
          axisLabel: {
            color: '#6B7280'
          }
        },
        {
          type: 'value',
          name: 'Wage (1000s)',
          position: 'right',
          axisLabel: {
            color: '#6B7280'
          }
        }
      ],
      series: [
        {
          name: 'Organizations',
          type: 'line',
          data: [2234, 2298, 2365, 2421, 2489, 2556, 2634, 2598, 2723, 2847],
          itemStyle: { color: '#14364D' },
          lineStyle: { width: 3 }
        },
        {
          name: 'Employment',
          type: 'line',
          data: [28450, 29120, 29890, 30456, 31234, 31890, 32567, 31234, 33456, 34562],
          itemStyle: { color: '#4CC0B0' },
          lineStyle: { width: 3 }
        },
        {
          name: 'Avg Wage ($1000s)',
          type: 'line',
          yAxisIndex: 1,
          data: [28.5, 29.2, 30.2, 30.8, 31.8, 32.1, 32.9, 33.1, 33.8, 34.7],
          itemStyle: { color: '#FFBD00' },
          lineStyle: { width: 3 }
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
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div ref={chartRef} style={{ height: '400px' }} />
    </div>
  );
};

export default TrendingMetrics;