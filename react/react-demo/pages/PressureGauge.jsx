import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PressureGauge = ({ value, min = 0, max = 10, unit = '' }) => {
  const gaugeRef = useRef();
  
  useEffect(() => {
    if (!gaugeRef.current) return;
    
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    
    // 清除旧图表
    d3.select(gaugeRef.current).selectAll("*").remove();
    
    const svg = d3.select(gaugeRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2}, ${height/2})`);
    
    // 创建刻度弧
    const arc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.8)
      .startAngle(-Math.PI * 0.8)
      .endAngle(Math.PI * 0.8);
    
    // 背景弧
    svg.append('path')
      .attr('d', arc)
      .attr('fill', '#eee');
    
    // 危险区域（红色）
    const dangerArc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.8)
      .startAngle(Math.PI * 0.5)
      .endAngle(Math.PI * 0.8);
    
    svg.append('path')
      .attr('d', dangerArc)
      .attr('fill', '#ff6b6b');
    
    // 刻度
    const scale = d3.scaleLinear()
      .domain([min, max])
      .range([-Math.PI * 0.8, Math.PI * 0.8]);
    
    const ticks = scale.ticks(5);
    
    ticks.forEach(tick => {
      const angle = scale(tick);
      
      svg.append('line')
        .attr('x1', Math.sin(angle) * (radius * 0.8))
        .attr('y1', -Math.cos(angle) * (radius * 0.8))
        .attr('x2', Math.sin(angle) * (radius * 0.9))
        .attr('y2', -Math.cos(angle) * (radius * 0.9))
        .attr('stroke', '#666')
        .attr('stroke-width', 2);
      
      svg.append('text')
        .attr('x', Math.sin(angle) * (radius * 0.95))
        .attr('y', -Math.cos(angle) * (radius * 0.95))
        .attr('text-anchor', 'middle')
        .text(tick);
    });
    
    // 指针
    const pointer = svg.append('g');
    
    pointer.append('circle')
      .attr('r', radius * 0.05)
      .attr('fill', '#333');
    
    pointer.append('path')
      .attr('d', d3.line()([
        [0, 0],
        [0, -radius * 0.6]
      ]))
      .attr('stroke', '#333')
      .attr('stroke-width', 3);
    
    // 更新指针位置
    const updatePointer = (val) => {
      const angle = scale(Math.min(Math.max(val, min), max));
      
      pointer.transition()
        .duration(500)
        .attr('transform', `rotate(${angle * 180 / Math.PI})`);
    };
    
    updatePointer(value);
    
    // 显示当前值
    svg.append('text')
      .attr('y', radius * 0.4)
      .attr('text-anchor', 'middle')
      .text(`${value.toFixed(1)} ${unit}`)
      .style('font-size', '24px')
      .style('font-weight', 'bold');
    
  }, [value, min, max, unit]);
  
  return <div className="pressure-gauge" ref={gaugeRef}></div>;
};

export default PressureGauge;