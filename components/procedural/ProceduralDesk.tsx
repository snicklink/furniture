
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

interface ProceduralDeskProps {
  variant: number;
  seed: number;
}

export const ProceduralDesk: React.FC<ProceduralDeskProps> = ({ variant, seed }) => {
  const params = useMemo(() => {
    return {
      type: variant === 0 ? 'workshop' : variant === 1 ? 'monolith' : 'command',
      accentColor: variant === 2 ? '#d63031' : '#222',
    };
  }, [variant, seed]);

  return (
    <group>
      {/* V-01: Heavy Workshop Desk (Steel & Reclaimed Wood) */}
      {params.type === 'workshop' && (
        <group position={[0, 0.4, 0]}>
          {/* Thinner Reclaimed Wood Top */}
          <RoundedBox args={[2.8, 0.05, 1.2]} radius={0.01} position={[0, 0.375, 0]}>
            <meshStandardMaterial color="#3d2b1f" roughness={0.9} />
          </RoundedBox>
          
          <group position={[0, -0.05, 0]}>
            {[-1.2, 1.2].map(x => [-0.45, 0.45].map(z => (
              <mesh key={`${x}-${z}`} position={[x, 0, z]}>
                <boxGeometry args={[0.1, 0.8, 0.1]} />
                <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
              </mesh>
            )))}
            <mesh position={[0, 0, -0.45]}>
              <boxGeometry args={[2.4, 0.05, 0.05]} />
              <meshStandardMaterial color="#111" metalness={0.8} />
            </mesh>
            <group position={[0, -0.1, -0.45]}>
               <mesh rotation={[0, 0, Math.PI / 6]}>
                  <boxGeometry args={[1.5, 0.03, 0.03]} />
                  <meshStandardMaterial color="#111" />
               </mesh>
               <mesh rotation={[0, 0, -Math.PI / 6]}>
                  <boxGeometry args={[1.5, 0.03, 0.03]} />
                  <meshStandardMaterial color="#111" />
               </mesh>
            </group>
          </group>
        </group>
      )}

      {/* V-02: Brutalist Monolith (Concrete & Brushed Steel) */}
      {params.type === 'monolith' && (
        <group position={[0, 0.4, 0]}>
          <RoundedBox args={[2.4, 0.25, 1.1]} radius={0.01} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#555" roughness={1} />
          </RoundedBox>
          <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[1.8, 0.6, 0.8]} />
            <meshStandardMaterial color="#333" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.3, 0.56]}>
            <boxGeometry args={[2.42, 0.05, 0.01]} />
            <meshStandardMaterial color="#888" metalness={1} roughness={0.1} />
          </mesh>
          <pointLight position={[0, -0.1, 0]} intensity={0.5} color="#4834d4" distance={2} />
        </group>
      )}

      {/* V-03: Technical Command Console (Red Metal) */}
      {params.type === 'command' && (
        <group position={[0, 0.4, 0]}>
          {/* Table Top */}
          <RoundedBox args={[2.8, 0.08, 1.1]} radius={0.01} position={[0, 0.35, 0]}>
            <meshStandardMaterial color={params.accentColor} metalness={0.4} roughness={0.3} />
          </RoundedBox>
          
          {/* Cable Tray */}
          <mesh position={[0, 0.25, -0.45]}>
            <boxGeometry args={[2.6, 0.15, 0.2]} />
            <meshStandardMaterial color="#000" />
          </mesh>

          {/* Drawer Pedestals Facing the Long Side (Z+) */}
          {[-0.9, 0.9].map(x => (
            <group key={x} position={[x, -0.05, 0]}>
              {/* Drawer Box Body */}
              <mesh>
                <boxGeometry args={[0.7, 0.8, 0.9]} />
                <meshStandardMaterial color="#111" metalness={0.2} roughness={0.8} />
              </mesh>
              
              {/* Individual Drawer Fronts (Z-axis facing) */}
              {[0.2, -0.05, -0.3].map((y, i) => (
                <group key={i} position={[0, y, 0.455]}>
                   {/* Drawer Plane */}
                   <mesh>
                     <boxGeometry args={[0.65, 0.22, 0.02]} />
                     <meshStandardMaterial color="#1a1a1a" />
                   </mesh>
                   {/* Heavy Horizontal Handle */}
                   <mesh position={[0, 0, 0.02]}>
                     <boxGeometry args={[0.4, 0.02, 0.03]} />
                     <meshStandardMaterial color="#555" metalness={1} />
                   </mesh>
                   {/* Industrial ID Plate */}
                   <mesh position={[0.25, 0.05, 0.02]}>
                     <planeGeometry args={[0.1, 0.05]} />
                     <meshStandardMaterial color="#333" />
                   </mesh>
                </group>
              ))}

              {/* Red Side Accent Panel */}
              <mesh position={[x > 0 ? 0.36 : -0.36, 0, 0]}>
                <boxGeometry args={[0.02, 0.6, 0.6]} />
                <meshStandardMaterial color={params.accentColor} metalness={0.6} />
              </mesh>
            </group>
          ))}
        </group>
      )}
    </group>
  );
};
