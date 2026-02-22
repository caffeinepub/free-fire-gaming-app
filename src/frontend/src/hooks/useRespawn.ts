import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useRespawn() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const respawnMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.revive();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      queryClient.invalidateQueries({ queryKey: ['all-players'] });
      setCountdown(5); // Reset countdown
    },
  });

  return {
    respawn: respawnMutation.mutate,
    isRespawning: respawnMutation.isPending,
    countdown,
  };
}
