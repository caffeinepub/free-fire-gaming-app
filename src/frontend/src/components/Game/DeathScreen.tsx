import { useRespawn } from '../../hooks/useRespawn';
import { usePlayerState } from '../../hooks/usePlayerState';
import DoomButton from '../UI/DoomButton';
import { Skull, Timer } from 'lucide-react';

export default function DeathScreen() {
  const { respawn, isRespawning, countdown } = useRespawn();
  const { playerData } = usePlayerState();

  const handleRespawn = () => {
    respawn();
  };

  return (
    <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="text-center space-y-8 px-4">
        <div className="space-y-4">
          <Skull className="w-32 h-32 mx-auto text-doom-red animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-black text-doom-red uppercase tracking-wider drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]">
            ELIMINATED
          </h1>
        </div>

        <div className="space-y-4">
          <div className="text-doom-orange text-2xl font-bold">
            Final Score: <span className="text-doom-red">{Number(playerData?.score || 0)}</span>
          </div>

          {countdown > 0 ? (
            <div className="flex items-center justify-center gap-3 text-doom-green text-xl">
              <Timer className="w-6 h-6 animate-spin" />
              <span>Respawn available in {countdown}s</span>
            </div>
          ) : (
            <DoomButton 
              onClick={handleRespawn}
              disabled={isRespawning}
              className="text-xl px-8 py-4"
            >
              {isRespawning ? 'RESPAWNING...' : 'RESPAWN NOW'}
            </DoomButton>
          )}
        </div>

        <div className="text-doom-muted text-sm">
          <p>You will respawn with full health</p>
        </div>
      </div>
    </div>
  );
}
