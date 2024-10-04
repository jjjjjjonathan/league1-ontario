import { trpc } from '@/utils/trpc';
import { createFileRoute } from '@tanstack/react-router';
import { MinutesChart } from '@/components/minutes-chart';

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
    return (
      <div className='flex flex-row justify-evenly'>
        <MinutesChart
          totalMinutes={data.u23Minutes}
          minimumMinutes={data.minimumU23Minutes}
          minutesType='U-23'
        />
        <MinutesChart
          totalMinutes={data.u20Minutes}
          minimumMinutes={data.minimumU20Minutes}
          minutesType='U-20'
        />
      </div>
    );
  }

  return (
    <p>
      This is team ID #{teamId} in competition {competitionId}
    </p>
  );
}
