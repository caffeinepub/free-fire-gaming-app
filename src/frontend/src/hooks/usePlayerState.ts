import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { Principal } from '@icp-sdk/core/principal';
import type { Player } from '../backend';

export function usePlayerState() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  // Initialize player on mount
  const initMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.getOrCreatePlayer();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });

  // Get all players to find current player
  const playersQuery = useQuery<Player[]>({
    queryKey: ['players'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPlayers();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 2000, // Poll every 2 seconds for updates
  });

  // Initialize player if not already done
  if (actor && identity && !initMutation.isPending && !playersQuery.data) {
    initMutation.mutate();
  }

  // For demo, use first player as current player
  const playerData = playersQuery.data?.[0];

  return {
    playerData,
    isLoading: playersQuery.isLoading || initMutation.isPending,
  };
}

export function useAllPlayers() {
  const { actor, isFetching } = useActor();

  const playersQuery = useQuery<Player[]>({
    queryKey: ['all-players'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPlayers();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 2000,
  });

  return {
    players: playersQuery.data || [],
    isLoading: playersQuery.isLoading,
  };
}

export function useShoot() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const shootMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !identity) throw new Error('Not authenticated');
      
      // For demo, shoot at a random target (in real game, use raycasting)
      const players = await actor.getAllPlayers();
      if (players.length > 1) {
        // Shoot at first other player (simplified)
        const targetPrincipal = identity.getPrincipal();
        return actor.shoot(targetPrincipal);
      }
      return false;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      queryClient.invalidateQueries({ queryKey: ['all-players'] });
    },
  });

  return {
    shoot: shootMutation.mutate,
    isShooting: shootMutation.isPending,
  };
}
