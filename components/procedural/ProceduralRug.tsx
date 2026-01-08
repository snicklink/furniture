
import React, { useMemo } from 'react';
import * as THREE from 'three';

interface ProceduralRugProps {
  variant: number;
  seed: number;
}

export const ProceduralRug: React.FC<ProceduralRugProps> = ({ variant, seed }) => {
  const params = useMemo(() => {
    return {
      size: variant === 0 ? [4, 3] : variant === 1 ? [5, 2] : [3, 3],
      color: variant === 0 ? '#121212' : variant === 1 ? '#b33939' : '#474787',
      frayed: variant === 2
    };
  }, [variant, seed]);

  return (
    <group position={[0, 0.005, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[params.size[0], params.size[1]]} />
        <meshStandardMaterial 
          color={params.color} 
          roughness={1} 
          metalness={0} 
          flatShading
        />
      </mesh>

      {/* Rug Patterns or Stains */}
      {variant === 1 && (
        <mesh position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[params.size[0] * 0.8, params.size[1] * 0.8]} />
          <meshStandardMaterial color="#000" transparent opacity={0.3} wireframe />
        </mesh>
      )}

      {params.frayed && (
        <group>
           {Array.from({length: 20}).map((_, i) => (
             <mesh key={i} position={[(Math.random() - 0.5) * params.size[0], 0.01, (Math.random() - 0.5) * params.size[1]]}>
                <boxGeometry args={[0.1, 0.01, 0.02]} />
                <meshStandardMaterial color="#222" />
             </mesh>
           ))}
        </group>
      )}
    </group>
  );
};
