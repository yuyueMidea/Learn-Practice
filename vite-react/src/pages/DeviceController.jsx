import React from 'react';
import { useThree } from '@react-three/fiber';

export default function DeviceController({ modelRef }) {
//   const { camera } = useThree();
  
//   const handleResetView = () => {
//     camera.position.set(0, 2, 5);
//     camera.lookAt(0, 0, 0);
//   };

  const handleExplode = () => {
    console.log('===================modelRef: ', modelRef)
    // 实现模型拆解动画
    if (modelRef.current) {
      modelRef.current.children.forEach((part, i) => {
        part.position.x = Math.sin(i) * 0.5;
        part.position.z = Math.cos(i) * 0.5;
      });
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 100,
      background: 'rgba(255,255,255,0.8)',
      padding: '10px',
      borderRadius: '5px'
    }}>
      {/* <button onClick={handleResetView}>重置视角</button> */}
      <button onClick={handleExplode}>拆解模型</button>
    </div>
  );
}