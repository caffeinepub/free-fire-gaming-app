import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function GameArena() {
  const wallTexture = useTexture('/assets/generated/wall-texture.dim_512x512.png');
  const floorTexture = useTexture('/assets/generated/floor-texture.dim_512x512.png');

  // Configure texture repeating
  wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(2, 2);
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(8, 8);

  const arenaSize = 20;
  const wallHeight = 4;

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[arenaSize, arenaSize]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>

      {/* Walls - North */}
      <mesh position={[0, wallHeight / 2, -arenaSize / 2]} castShadow receiveShadow>
        <boxGeometry args={[arenaSize, wallHeight, 0.5]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Walls - South */}
      <mesh position={[0, wallHeight / 2, arenaSize / 2]} castShadow receiveShadow>
        <boxGeometry args={[arenaSize, wallHeight, 0.5]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Walls - East */}
      <mesh position={[arenaSize / 2, wallHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, wallHeight, arenaSize]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Walls - West */}
      <mesh position={[-arenaSize / 2, wallHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, wallHeight, arenaSize]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Central obstacles */}
      <mesh position={[5, 1, 5]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      <mesh position={[-5, 1, -5]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      <mesh position={[5, 1, -5]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      <mesh position={[-5, 1, 5]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
    </group>
  );
}
