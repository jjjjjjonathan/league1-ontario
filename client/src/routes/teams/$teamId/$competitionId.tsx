import { trpc } from '@/utils/trpc';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/teams/$teamId/$competitionId')({
  component: TeamComponent,
});

function TeamComponent() {
  const { teamId, competitionId } = Route.useParams();
  const { data, isLoading } = trpc.playerAppearances.totalYouthMinutes.useQuery(
    { teamId: Number(teamId), competitionId: Number(competitionId) }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data) {
    return <p>This is data: {JSON.stringify(data)}</p>;
  }

  return (
    <p>
      This is team ID #{teamId} in competition {competitionId}
    </p>
  );
}
