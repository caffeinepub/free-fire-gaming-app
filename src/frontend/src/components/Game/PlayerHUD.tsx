import { usePlayerState } from '../../hooks/usePlayerState';
import { Progress } from '../ui/progress';

export default function PlayerHUD() {
  const { playerData } = usePlayerState();

  if (!playerData) return null;

  const healthPercent = Number(playerData.health);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <img 
          src="/assets/generated/crosshair.dim_64x64.png" 
          alt="Crosshair" 
          className="w-12 h-12 opacity-80"
        />
      </div>

      {/* Health Bar */}
      <div className="absolute bottom-8 left-8 w-64 space-y-2">
        <div className="relative">
          <img 
            src="/assets/generated/health-bg.dim_256x64.png" 
            alt="Health BG" 
            className="w-full h-16 object-cover"
          />
          <div className="absolute inset-0 flex items-center px-4">
            <div className="w-full space-y-1">
              <div className="flex justify-between text-xs font-bold text-doom-orange uppercase">
                <span>Health</span>
                <span>{healthPercent}%</span>
              </div>
              <Progress 
                value={healthPercent} 
                className="h-3 bg-doom-darker border border-doom-red"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="absolute top-8 right-8 text-right space-y-1">
        <div className="text-doom-orange text-sm font-bold uppercase tracking-wider">Score</div>
        <div className="text-doom-red text-4xl font-black drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
          {Number(playerData.score)}
        </div>
      </div>

      {/* Weapon Icon */}
      <div className="absolute bottom-8 right-8">
        <img 
          src="/assets/generated/weapon-icon.dim_128x128.png" 
          alt="Weapon" 
          className="w-24 h-24 opacity-80 drop-shadow-[0_0_10px_rgba(255,102,0,0.6)]"
        />
      </div>
    </div>
  );
}
