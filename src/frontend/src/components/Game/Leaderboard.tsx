import { useAllPlayers } from '../../hooks/usePlayerState';
import { ScrollArea } from '../ui/scroll-area';
import { Trophy, Skull, Heart } from 'lucide-react';

export default function Leaderboard() {
  const { players } = useAllPlayers();

  const sortedPlayers = [...players].sort((a, b) => Number(b.score) - Number(a.score));

  return (
    <div className="absolute top-8 left-8 w-72 pointer-events-auto">
      <div className="bg-doom-darker/95 border-2 border-doom-red rounded-lg overflow-hidden backdrop-blur-sm">
        <div className="bg-doom-red/20 px-4 py-3 border-b border-doom-red flex items-center gap-2">
          <Trophy className="w-5 h-5 text-doom-orange" />
          <h2 className="text-doom-orange font-black uppercase tracking-wider">Leaderboard</h2>
        </div>
        
        <ScrollArea className="h-64">
          <div className="p-2 space-y-1">
            {sortedPlayers.length === 0 ? (
              <div className="text-doom-muted text-center py-8 text-sm">
                No players yet
              </div>
            ) : (
              sortedPlayers.map((player, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between px-3 py-2 bg-doom-dark/50 rounded border border-doom-red/30 hover:border-doom-red/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-doom-orange font-bold text-lg w-6">
                      #{index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      {player.isAlive ? (
                        <Heart className="w-4 h-4 text-doom-green" />
                      ) : (
                        <Skull className="w-4 h-4 text-doom-muted" />
                      )}
                      <span className={`text-sm font-semibold ${player.isAlive ? 'text-doom-green' : 'text-doom-muted'}`}>
                        Player {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="text-doom-red font-bold">
                    {Number(player.score)}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
