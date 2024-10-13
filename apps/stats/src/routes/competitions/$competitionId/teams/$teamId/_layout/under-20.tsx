import { createFileRoute } from '@tanstack/react-router';
import { trpc } from '@/router';
import { MinutesLineGraph } from '@/components/minutes-line-graph';
import { PlayerList } from '@/components/player-list';

const YOUTH_CUTOFF = 20;

export const Route = createFileRoute(
  '/competitions/$competitionId/teams/$teamId/_layout/under-20',
)({
  component: U20Component,
  loader: async ({ context, params }) => {
    await context.trpcQueryUtils.teams.getAgeGroupOverview.ensureData({
      teamId: Number(params.teamId),
      competitionId: Number(params.competitionId),
      youthCutoff: YOUTH_CUTOFF,
    });
  },
});

function U20Component() {
  const params = Route.useParams();
  const teamId = Number(params.teamId);
  const competitionId = Number(params.competitionId);
  const { data } = trpc.teams.getAgeGroupOverview.useQuery({
    teamId,
    competitionId,
    youthCutoff: YOUTH_CUTOFF,
  });

  if (!data) {
    return <div>no data!</div>;
  }

  return (
    <>
      <MinutesLineGraph
        data={data.minutes}
        minimumMinutes={data.minimumU20Minutes}
        title='U-20 Minutes'
      />
      <PlayerList data={data.playerList} title='U-20 Players' />
    </>
  );
}
