import { trpc } from '@/utils/trpc';

type SquadStatsProps = {
  teamId: number;
  competitionId: number;
};

export const SquadStats = ({ teamId, competitionId }: SquadStatsProps) => {
  const { data, isLoading } = trpc.playerAppearances.squadStats.useQuery({
    teamId,
    competitionId,
  });

  if (isLoading) return <p>Loading...</p>;

  if (data) {
    return <p>This is data: {JSON.stringify(data)}</p>;
  }

  return <p>test</p>;
};
