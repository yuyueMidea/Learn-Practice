// src/utils/mapUtils.js
import { Style, Icon, Circle, Fill, Stroke } from 'ol/style';

// 创建设备样式
export const createEquipmentStyle = (equipment, equipmentTypes) => {
  const typeInfo = equipmentTypes[equipment.type];
  let color;
  
  switch (equipment.status) {
    case 'normal': color = typeInfo.color; break;
    case 'warning': color = '#f39c12'; break;
    case 'error': color = '#e74c3c'; break;
    default: color = '#7f8c8d';
  }
  
  return new Style({
    image: new Icon({
    //   src: import(`@/assets/icons/${typeInfo.icon}`),
        src:'',
      scale: 0.8,
      color: color
    })
  });
};

// 创建管网样式
export const createPipelineStyle = (pipeline) => {
  let color, width;
  
  switch (pipeline.type) {
    case 'chilledWater': 
      color = '#3498db';
      width = 4;
      break;
    case 'condenserWater': 
      color = '#e74c3c';
      width = 4;
      break;
    default: 
      color = '#95a5a6';
      width = 2;
  }
  
  if (pipeline.status === 'warning') {
    color = '#f39c12';
  } else if (pipeline.status === 'error') {
    color = '#e74c3c';
  }
  
  return new Style({
    stroke: new Stroke({
      color: color,
      width: width,
      lineDash: pipeline.status !== 'normal' ? [5, 5] : undefined
    })
  });
};