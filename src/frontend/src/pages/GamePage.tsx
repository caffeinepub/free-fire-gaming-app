import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import GameScene from '../components/Game/GameScene';
import PlayerHUD from '../components/Game/PlayerHUD';
import DeathScreen from '../components/Game/DeathScreen';
import Leaderboard from '../components/Game/Leaderboard';
import { usePlayerState } from '../hooks/usePlayerState';
import { Loader } from 'lucide-react';

export default function GamePage() {
  const { playerData, isLoading } = usePlayerState();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-doom-darker">
        <div className="text-center space-y-4">
          <Loader className="w-16 h-16 animate-spin text-doom-red mx-auto" />
          <p className="text-doom-orange text-xl font-bold uppercase">Loading Arena...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 3D Game Canvas */}
      <Canvas
        camera={{ position: [0, 1.6, 0], fov: 75 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <GameScene />
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      {playerData?.isAlive ? (
        <>
          <PlayerHUD />
          <Leaderboard />
        </>
      ) : (
        <DeathScreen />
      )}
    </div>
  );
}
