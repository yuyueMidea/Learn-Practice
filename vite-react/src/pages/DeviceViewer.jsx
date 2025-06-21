import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 3D模型组件
function DeviceModel({ url, scale = 1 }) {
  const group = useRef();
  const { scene } = useGLTF(url); // 加载GLTF格式模型
  
  // 自动旋转动画
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={group} scale={[scale, scale, scale]}>
      <primitive object={scene} />
    </group>
  );
}

// 场景布局
function Scene({ modelUrl }) {
  const { camera } = useThree();
  const [hovered, setHover] = useState(false);
  
  // 初始化相机位置
  React.useEffect(() => {
    camera.position.set(0, 2, 5);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      
      <DeviceModel 
        url={modelUrl} 
        scale={3}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      />
      
      <Environment preset="city" />
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        minDistance={3}
        maxDistance={10}
      />
    </>
  );
}

// 主组件
export default function DeviceViewer({ modelPath = "/models/compressor.glb" }) {
  return (
    <div style={{ height: '500px', background: '#f0f0f0' }}>
      <Canvas shadows camera={{ fov: 50 }}>
        <Scene modelUrl={modelPath} />
      </Canvas>
    </div>
  );
}