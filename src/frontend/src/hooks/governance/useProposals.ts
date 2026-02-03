import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { useInternetIdentity } from '../useInternetIdentity';
import type { Proposal, VoteOption } from '../../backend';

export function useGetAllProposals() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Proposal[]>({
    queryKey: ['proposals'],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return actor.getAllProposals();
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: 1,
  });
}

export function useGetProposal(proposalId: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Proposal | null>({
    queryKey: ['proposal', proposalId?.toString()],
    queryFn: async () => {
      if (!actor || !identity || !proposalId) return null;
      return actor.getProposal(proposalId);
    },
    enabled: !!actor && !actorFetching && !!identity && proposalId !== null,
    retry: 1,
  });
}

export function useVoteOnProposal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ proposalId, vote }: { proposalId: bigint; vote: VoteOption }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.voteOnProposal(proposalId, vote);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      queryClient.invalidateQueries({ queryKey: ['proposal', variables.proposalId.toString()] });
    },
  });
}
