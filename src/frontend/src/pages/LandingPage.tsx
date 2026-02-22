import { useNavigate } from '@tanstack/react-router';
import DoomButton from '../components/UI/DoomButton';
import { Skull, Crosshair, Heart } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-doom-dark via-doom-darker to-black opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_50%)]" />
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4">
        <img 
          src="/assets/generated/logo.dim_400x150.png" 
          alt="Doom Battle Royale" 
          className="mx-auto w-full max-w-md drop-shadow-[0_0_30px_rgba(255,0,0,0.8)] animate-pulse-slow"
        />
        
        <p className="text-doom-orange text-xl md:text-2xl font-bold uppercase tracking-wider max-w-2xl mx-auto">
          Enter the Arena. Kill or Be Killed. Revive and Fight Again.
        </p>

        <div className="flex flex-wrap gap-6 justify-center items-center text-doom-green">
          <div className="flex items-center gap-2">
            <Crosshair className="w-6 h-6" />
            <span className="text-lg font-semibold">SHOOT TO KILL</span>
          </div>
          <div className="flex items-center gap-2">
            <Skull className="w-6 h-6" />
            <span className="text-lg font-semibold">ELIMINATE ENEMIES</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6" />
            <span className="text-lg font-semibold">RESPAWN & FIGHT</span>
          </div>
        </div>

        <div className="pt-8">
          <DoomButton 
            onClick={() => navigate({ to: '/game' })}
            className="text-2xl px-12 py-6"
          >
            ENTER BATTLE
          </DoomButton>
        </div>

        <div className="pt-4 text-doom-muted text-sm space-y-2">
          <p>Controls: WASD to move, Mouse to aim, Click to shoot</p>
          <p>Eliminate enemies to score points. Respawn when eliminated.</p>
        </div>
      </div>
    </div>
  );
}
