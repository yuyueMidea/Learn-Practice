import React, { useRef } from 'react';
import DeviceViewer from './DeviceViewer';
import DeviceController from './DeviceController';

export default function EquipmentView() {
  const modelRef = useRef();
  
  return (
    <div style={{ position: 'relative' }}>
      <h2>空压机3D模型展示</h2>
      <DeviceViewer modelPath="/compressor_practice_model.glb" modelRef={modelRef} />
      <DeviceController modelRef={modelRef} />
      
      <div style={{ marginTop: '20px', padding: '20px' }}>
        <h3>设备参数</h3>
        <ul>
          <li>型号: XYZ-3000</li>
          <li>压力范围: 0.8-1.2MPa</li>
          <li>流量: 10m³/min</li>
        </ul>
      </div>
    </div>
  );
}