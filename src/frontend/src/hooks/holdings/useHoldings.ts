import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { useInternetIdentity } from '../useInternetIdentity';
import type { Holding } from '../../backend';

export function useGetUserHoldings() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Holding[]>({
    queryKey: ['userHoldings', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      const principal = identity.getPrincipal();
      return actor.getUserHoldings(principal);
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: 1,
  });
}

export function useCreateHolding() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { identity } = useInternetIdentity();

  return useMutation({
    mutationFn: async ({ tokenAmount, lockDurationDays }: { tokenAmount: number; lockDurationDays: number }) => {
      if (!actor) throw new Error('Actor not available');
      if (!identity) throw new Error('Not authenticated');
      return actor.createHolding(BigInt(tokenAmount), BigInt(lockDurationDays));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userHoldings'] });
    },
  });
}

export function useUnlockHolding() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (holdingId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.unlockHolding(holdingId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userHoldings'] });
    },
  });
}

export function useDeleteHolding() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (holdingId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteHolding(holdingId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userHoldings'] });
    },
  });
}
