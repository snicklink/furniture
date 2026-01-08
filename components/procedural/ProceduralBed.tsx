
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

interface ProceduralBedProps {
  variant: number;
  seed: number;
}

export const ProceduralBed: React.FC<ProceduralBedProps> = ({ variant, seed }) => {
  const params = useMemo(() => {
    return {
      type: variant === 0 ? 'pallet' : variant === 1 ? 'studio' : 'spartan',
      frameColor: variant === 0 ? '#4a3728' : variant === 1 ? '#111' : '#2c3e50',
      mattressColor: variant === 0 ? '#f5f5f5' : variant === 1 ? '#dcdde1' : '#7f8c8d',
    };
  }, [variant, seed]);

  return (
    <group>
      {/* V-01: ORIGINAL Pallet Bed (Rugged DIY) */}
      {params.type === 'pallet' && (
        <group position={[0, 0.075, 0]}>
          <group>
            {/* Pallet Slats - Restored to original broader look */}
            {[-0.45, 0.45].map(z => (
               <group key={z} position={[0, 0, z]}>
                  {Array.from({length: 6}).map((_, i) => (
                    <mesh key={i} position={[(i - 2.5) * 0.4, 0, 0]}>
                      <boxGeometry args={[0.35, 0.15, 0.8]} />
                      <meshStandardMaterial color={params.frameColor} roughness={1} />
                    </mesh>
                  ))}
               </group>
            ))}
            {/* Structural center beam */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2.2, 0.1, 0.2]} />
              <meshStandardMaterial color={params.frameColor} roughness={1} />
            </mesh>
          </group>

          {/* Large Comfortable Mattress */}
          <group position={[0, 0.35, 0]}>
            <RoundedBox args={[2.0, 0.4, 2.0]} radius={0.08} smoothness={4}>
              <meshStandardMaterial color={params.mattressColor} roughness={0.95} />
            </RoundedBox>
          </group>
          
          {/* Pillows */}
          <group position={[0, 0.58, -0.7]}>
            <RoundedBox args={[0.8, 0.18, 0.5]} radius={0.1} position={[-0.45, 0, 0]}>
              <meshStandardMaterial color="#fff" />
            </RoundedBox>
            <RoundedBox args={[0.8, 0.18, 0.5]} radius={0.1} position={[0.45, 0, 0]}>
              <meshStandardMaterial color="#fff" />
            </RoundedBox>
          </group>
        </group>
      )}

      {/* V-02: Narrow Studio Bed (Sleek Industrial) */}
      {params.type === 'studio' && (
        <group position={[0, 0.3, 0]}>
          {/* Minimal Steel Frame */}
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[1.1, 0.08, 2.1]} />
            <meshStandardMaterial color="#000" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Corner Legs */}
          {[-0.5, 0.5].map(x => [-1, 1].map(z => (
            <mesh key={`${x}-${z}`} position={[x, -0.4, z]}>
              <boxGeometry args={[0.06, 0.4, 0.06]} />
              <meshStandardMaterial color="#111" metalness={1} />
            </mesh>
          )))}
          
          {/* Narrow Mattress */}
          <RoundedBox args={[1.0, 0.25, 2.0]} radius={0.04} position={[0, 0, 0]}>
            <meshStandardMaterial color={params.mattressColor} roughness={0.8} />
          </RoundedBox>

          {/* Single Pillow */}
          <RoundedBox args={[0.7, 0.12, 0.4]} radius={0.06} position={[0, 0.15, -0.75]}>
            <meshStandardMaterial color="#fff" />
          </RoundedBox>
        </group>
      )}

      {/* V-03: Spartan Bed (Proper Metal Prison Frame) */}
      {params.type === 'spartan' && (
        <group position={[0, 0.4, 0]}>
          {/* Structural Frame */}
          <group position={[0, -0.2, 0]}>
            {/* Main Longitudinal Rails */}
            {[-0.45, 0.45].map(x => (
              <mesh key={`rail-${x}`} position={[x, 0, 0]}>
                <boxGeometry args={[0.06, 0.06, 2.1]} />
                <meshStandardMaterial color="#1e272e" metalness={1} roughness={0.6} />
              </mesh>
            ))}
            {/* End Caps (Head/Foot) */}
            {[-1.05, 1.05].map(z => (
              <mesh key={`end-${z}`} position={[0, 0, z]}>
                <boxGeometry args={[0.96, 0.06, 0.06]} />
                <meshStandardMaterial color="#1e272e" metalness={1} roughness={0.6} />
              </mesh>
            ))}

            {/* Support Crossbeams (The slats) */}
            {Array.from({length: 6}).map((_, i) => (
              <mesh key={`slat-${i}`} position={[0, -0.01, (i - 2.5) * 0.35]}>
                <boxGeometry args={[0.85, 0.02, 0.1]} />
                <meshStandardMaterial color="#2d3436" metalness={0.5} />
              </mesh>
            ))}

            {/* Detailed Legs (Vertical Posts) */}
            {[-0.45, 0.45].map(x => [-1.05, 1.05].map(z => (
              <group key={`leg-${x}-${z}`} position={[x, -0.2, z]}>
                <mesh>
                  <boxGeometry args={[0.08, 0.4, 0.08]} />
                  <meshStandardMaterial color="#1e272e" metalness={1} />
                </mesh>
                {/* Leg Bolt Detail */}
                <mesh position={[0, 0.1, 0]}>
                  <cylinderGeometry args={[0.03, 0.03, 0.1, 6]} rotation={[0, 0, Math.PI/2]} />
                  <meshStandardMaterial color="#636e72" metalness={1} />
                </mesh>
              </group>
            )))}
            
            {/* Headboard Bar */}
            <mesh position={[0, 0.3, -1.05]}>
              <boxGeometry args={[0.96, 0.04, 0.04]} />
              <meshStandardMaterial color="#1e272e" metalness={1} />
            </mesh>
            {[-0.45, 0.45].map(x => (
               <mesh key={`post-${x}`} position={[x, 0.15, -1.05]}>
                 <boxGeometry args={[0.04, 0.3, 0.04]} />
                 <meshStandardMaterial color="#1e272e" metalness={1} />
               </mesh>
            ))}
          </group>

          {/* Thin Industrial Mattress */}
          <group position={[0, -0.1, 0]}>
             <mesh>
                <boxGeometry args={[0.88, 0.15, 2.0]} />
                <meshStandardMaterial color="#4b4b4b" roughness={1} />
             </mesh>
          </group>

          {/* Single Hard Pillow */}
          <RoundedBox args={[0.6, 0.1, 0.35]} radius={0.02} position={[0, 0, -0.75]}>
            <meshStandardMaterial color="#7f8c8d" />
          </RoundedBox>
        </group>
      )}
    </group>
  );
};
