import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const QuickChart = ({ title, type, data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    
    const option = {
      title: {
        text: title,
        textStyle: {
          fontSize: 16,
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
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.labels,
        axisLabel: {
          color: '#6B7280'
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#6B7280'
        }
      },
      series: [{
        type: type,
        data: data.datasets[0].data,
        itemStyle: {
          color: type === 'line' ? data.datasets[0].borderColor : (params) => {
            const colors = data.datasets[0].backgroundColor;
            return Array.isArray(colors) ? colors[params.dataIndex] : colors;
          }
        },
        lineStyle: type === 'line' ? {
          color: data.datasets[0].borderColor,
          width: 3
        } : undefined,
        areaStyle: type === 'line' ? {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255, 189, 0, 0.3)' },
            { offset: 1, color: 'rgba(255, 189, 0, 0.05)' }
          ])
        } : undefined
      }]
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [title, type, data]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div ref={chartRef} style={{ height: '300px' }} />
    </div>
  );
};

export default QuickChart;