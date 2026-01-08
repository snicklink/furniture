
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { FurnitureItem } from './FurnitureItem';
import { FurnitureType } from '../types';

interface SceneProps {
  type: FurnitureType;
  variant: number;
  seed: number;
}

const Scene: React.FC<SceneProps> = ({ type, variant, seed }) => {
  return (
    <Canvas shadows className="w-full h-full bg-[#0a0a0a]">
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={40} />
        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2.1} 
          autoRotate 
          autoRotateSpeed={0.5}
        />
        
        <Stage adjustCamera intensity={0.5} environment="city" contactShadow={{ resolution: 1024, scale: 10 }}>
          {/* Stability Fix: Use a key to force re-mounting when properties change */}
          <FurnitureItem 
            key={`${type}-${variant}-${seed}`} 
            type={type} 
            variant={variant} 
            seed={seed} 
          />
        </Stage>

        <ContactShadows 
          opacity={0.4} 
          scale={10} 
          blur={2.4} 
          far={0.8} 
          resolution={256} 
          color="#000000" 
        />
        
        {/* Gritty Atmosphere */}
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4834d4" />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
