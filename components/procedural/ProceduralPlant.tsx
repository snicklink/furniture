
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

interface ProceduralPlantProps {
  variant: number;
  seed: number;
}

export const ProceduralPlant: React.FC<ProceduralPlantProps> = ({ variant, seed }) => {
  const params = useMemo(() => {
    return {
      potType: variant === 0 ? 'concrete' : variant === 1 ? 'tall' : 'terracotta',
      plantType: variant === 0 ? 'monstera' : variant === 1 ? 'snake' : 'palm',
      potColor: variant === 0 ? '#555' : variant === 1 ? '#111' : '#a0522d',
    };
  }, [variant, seed]);

  return (
    <group>
      {/* Stylized Pot */}
      <mesh position={[0, 0.25, 0]}>
        {params.potType === 'tall' ? (
           <cylinderGeometry args={[0.2, 0.15, 0.5, 32]} />
        ) : params.potType === 'concrete' ? (
           <boxGeometry args={[0.4, 0.5, 0.4]} />
        ) : (
           <cylinderGeometry args={[0.25, 0.18, 0.35, 24]} />
        )}
        <meshStandardMaterial 
          color={params.potColor} 
          roughness={params.potType === 'concrete' ? 0.9 : 0.2} 
          metalness={params.potType === 'tall' ? 0.5 : 0} 
        />
      </mesh>

      {/* Soil */}
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 16]} />
        <meshStandardMaterial color="#1a120b" roughness={1} />
      </mesh>

      {/* Procedural Foliage */}
      <group position={[0, 0.5, 0]}>
        {params.plantType === 'monstera' && (
          <>
            {Array.from({length: 4}).map((_, i) => {
              const angle = (i / 4) * Math.PI * 2;
              return (
                <group key={i} rotation={[0, angle, 0]}>
                  <mesh position={[0.2, 0.3, 0]} rotation={[0, 0, -0.4]}>
                    <sphereGeometry args={[0.25, 8, 8, 0, Math.PI * 2, 0, 0.5]} />
                    <meshStandardMaterial color="#1b4d3e" side={THREE.DoubleSide} />
                  </mesh>
                  <mesh position={[0.1, 0.15, 0]} rotation={[0, 0, -0.2]}>
                    <cylinderGeometry args={[0.01, 0.015, 0.4, 8]} />
                    <meshStandardMaterial color="#2d5a27" />
                  </mesh>
                </group>
              );
            })}
          </>
        )}

        {params.plantType === 'snake' && (
          <>
            {Array.from({length: 8}).map((_, i) => {
              const height = 0.8 + Math.random() * 0.4;
              const angle = (i / 8) * Math.PI * 2 + Math.random();
              return (
                <group key={i} rotation={[0, angle, 0]} position={[Math.random() * 0.1, 0, 0]}>
                  <mesh position={[0, height / 2, 0]} rotation={[0, 0, (Math.random() - 0.5) * 0.1]}>
                    <boxGeometry args={[0.12, height, 0.01]} />
                    <meshStandardMaterial color="#0b2b1a" roughness={0.3} />
                  </mesh>
                </group>
              );
            })}
          </>
        )}

        {params.plantType === 'palm' && (
          <group>
            {/* Trunk */}
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.03, 0.06, 0.8, 8]} />
              <meshStandardMaterial color="#4a3728" roughness={1} />
            </mesh>
            {/* Fronds */}
            {Array.from({length: 6}).map((_, i) => (
              <group key={i} rotation={[0, (i / 6) * Math.PI * 2, 0]} position={[0, 0.8, 0]}>
                 <mesh position={[0.25, 0, 0]} rotation={[0, 0, -0.4]}>
                    <boxGeometry args={[0.5, 0.01, 0.15]} />
                    <meshStandardMaterial color="#1b4d3e" side={THREE.DoubleSide} />
                 </mesh>
              </group>
            ))}
          </group>
        )}
      </group>
    </group>
  );
};
