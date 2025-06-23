import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TemperatureChart = ({ data }) => {
  const chartRef = useRef();
  
  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;
    
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    
    // 清除旧图表
    d3.select(chartRef.current).selectAll("*").remove();
    
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // 准备数据
    const filteredData = data.map((d, i) => ({
      x: i,
      y: d.temperature,
      timestamp: d.timestamp
    }));
    
    // 创建比例尺
    const x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.y) * 1.1])
      .range([height, 0]);
    
    // 创建坐标轴
    const xAxis = d3.axisBottom(x)
      .ticks(5)
      .tickFormat(d => `T-${data.length - d}`);
    
    const yAxis = d3.axisLeft(y);
    
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);
    
    svg.append('g')
      .call(yAxis)
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', -30)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .text('温度 (°C)');
    
    // 创建折线
    const line = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y))
      .curve(d3.curveMonotoneX);
    
    svg.append('path')
      .datum(filteredData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);
    
    // 添加警告线
    const warningTemp = 80;
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', y(warningTemp))
      .attr('y2', y(warningTemp))
      .attr('stroke', 'red')
      .attr('stroke-dasharray', '5,5')
      .attr('stroke-width', 1);
    
    svg.append('text')
      .attr('x', width - 10)
      .attr('y', y(warningTemp) - 5)
      .attr('text-anchor', 'end')
      .text('高温警告线')
      .style('fill', 'red')
      .style('font-size', '12px');
    
  }, [data]);
  
  return <div className="temperature-chart" ref={chartRef}></div>;
};

export default TemperatureChart;