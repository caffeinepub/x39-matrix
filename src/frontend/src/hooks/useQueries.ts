import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, BackendHealth } from '../backend';

// Use the backend UserProfile type directly
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

// Backend health check query
export function useBackendHealth() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<BackendHealth>({
    queryKey: ['backendHealth'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.checkBackendHealth();
    },
    enabled: !!actor && !actorFetching,
    retry: 2,
    staleTime: 30000, // 30 seconds
  });
}
