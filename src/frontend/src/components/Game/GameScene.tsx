import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import GameArena from './GameArena';
import FirstPersonControls from './FirstPersonControls';
import WeaponSystem from './WeaponSystem';
import CombatEffects from './CombatEffects';

export default function GameScene() {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame(() => {
    // Scene updates if needed
  });

  return (
    <group ref={sceneRef}>
      {/* Lighting */}
      <ambientLight intensity={0.2} color="#ff3300" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ff0000" distance={20} />
      <pointLight position={[10, 3, 10]} intensity={0.3} color="#ff6600" distance={15} />
      <pointLight position={[-10, 3, -10]} intensity={0.3} color="#ff6600" distance={15} />
      
      {/* Fog for atmosphere */}
      <fog attach="fog" args={['#0a0000', 5, 30]} />

      {/* Game Arena */}
      <GameArena />

      {/* Player Controls */}
      <FirstPersonControls />

      {/* Weapon System */}
      <WeaponSystem />

      {/* Combat Effects */}
      <CombatEffects />
    </group>
  );
}
