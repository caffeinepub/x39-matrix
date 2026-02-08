import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';

/**
 * Hook to fetch the current publication state from the backend.
 * This is a public query - no authentication required.
 * 
 * Returns enhanced state that distinguishes between:
 * - Loading/unknown: Actor not ready or query not yet fetched
 * - Definitively resolved: Publication state is known (true or false)
 */
export function usePublicationState() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<boolean>({
    queryKey: ['publicationState'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPublicationState();
    },
    enabled: !!actor && !actorFetching,
    retry: 2,
    staleTime: 60000, // Cache for 1 minute
  });

  // Derive a ready flag that accounts for actor readiness and query state
  const isReady = !!actor && !actorFetching && query.isFetched;

  return {
    ...query,
    isReady, // True when publication state has been definitively fetched
    isLoading: actorFetching || query.isLoading, // True while actor or query is loading
  };
}

/**
 * Hook to check if the current caller is an admin.
 * Used to conditionally show admin-only UI controls.
 */
export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch (error) {
        // If the call fails (e.g., not authenticated), return false
        return false;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    staleTime: 300000, // Cache for 5 minutes
  });
}

/**
 * Mutation hook to update the publication state.
 * Admin-only operation - backend enforces authorization.
 */
export function useSetPublicationState() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (state: boolean) => {
      if (!actor) throw new Error('Actor not available');
      await actor.setPublicationState(state);
    },
    onSuccess: () => {
      // Invalidate and refetch publication state after successful update
      queryClient.invalidateQueries({ queryKey: ['publicationState'] });
    },
  });
}
