
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

interface ProceduralCouchProps {
  variant: number;
  seed: number;
}

export const ProceduralCouch: React.FC<ProceduralCouchProps> = ({ variant, seed }) => {
  const params = useMemo(() => {
    return {
      type: variant === 0 ? 'modular' : variant === 1 ? 'classic' : 'sectional',
      color: variant === 0 ? '#111' : variant === 1 ? '#3d2b1f' : '#222f3e',
      roughness: variant === 1 ? 0.4 : 0.8, // V-02 is a bit more 'worn leather'
    };
  }, [variant, seed]);

  return (
    <group>
      {/* V-01: Modular Heavy Block */}
      {params.type === 'modular' && (
        <group position={[0, 0.3, 0]}>
          <RoundedBox args={[3.2, 0.6, 1.0]} radius={0.05} position={[0, 0, 0]}>
            <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.1} />
          </RoundedBox>
          <RoundedBox args={[3.2, 0.6, 0.3]} radius={0.05} position={[0, 0.6, -0.35]}>
            <meshStandardMaterial color="#050505" roughness={0.2} />
          </RoundedBox>
          <mesh position={[0, -0.35, 0]}>
            <boxGeometry args={[3.0, 0.1, 0.8]} />
            <meshStandardMaterial color="#333" metalness={1} />
          </mesh>
        </group>
      )}

      {/* V-02: Rugged Sofa (On the floor) */}
      {params.type === 'classic' && (
        <group position={[0, 0.2, 0]}>
          {/* Seating Cushions */}
          <RoundedBox args={[2.8, 0.4, 0.9]} radius={0.08} position={[0, 0, 0.05]}>
            <meshStandardMaterial color={params.color} roughness={params.roughness} />
          </RoundedBox>

          {/* Full Backrest */}
          <RoundedBox args={[2.8, 0.7, 0.3]} radius={0.1} position={[0, 0.4, -0.3]}>
            <meshStandardMaterial color={params.color} roughness={params.roughness} />
          </RoundedBox>

          {/* Proper Arms (Sides) */}
          <RoundedBox args={[0.3, 0.6, 0.9]} radius={0.05} position={[-1.45, 0.1, 0.05]}>
            <meshStandardMaterial color={params.color} roughness={params.roughness} />
          </RoundedBox>
          <RoundedBox args={[0.3, 0.6, 0.9]} radius={0.05} position={[1.45, 0.1, 0.05]}>
            <meshStandardMaterial color={params.color} roughness={params.roughness} />
          </RoundedBox>
        </group>
      )}

      {/* V-03: L-Shaped Sectional */}
      {params.type === 'sectional' && (
        <group position={[0, 0.4, 0]}>
          <RoundedBox args={[3.0, 0.5, 1.0]} radius={0.1} position={[0, 0, 0]}>
            <meshStandardMaterial color={params.color} roughness={0.8} />
          </RoundedBox>
          <RoundedBox args={[1.0, 0.5, 1.5]} radius={0.1} position={[1.0, 0, 0.75]}>
            <meshStandardMaterial color={params.color} roughness={0.8} />
          </RoundedBox>
          <RoundedBox args={[3.0, 0.4, 0.25]} radius={0.1} position={[0, 0.45, -0.37]}>
            <meshStandardMaterial color={params.color} roughness={0.8} />
          </RoundedBox>
        </group>
      )}
    </group>
  );
};
