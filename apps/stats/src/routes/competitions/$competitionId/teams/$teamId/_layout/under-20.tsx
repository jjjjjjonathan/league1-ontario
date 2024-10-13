import { createFileRoute } from '@tanstack/react-router';
import { trpc } from '@/router';
import { MinutesLineGraph } from '@/components/minutes-line-graph';
import { PlayerList } from '@/components/player-list';
import { BottomNav, BottomNavItemLink } from '@/components/bottom-nav';
import { Separator } from '@/components/ui/separator';
import { SquareChartGantt, Donut, CakeSlice } from 'lucide-react';

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
      <div className='flex flex-col gap-y-8'>
        <MinutesLineGraph
          data={data.minutes}
          minimumMinutes={data.minimumU20Minutes}
          title='U-20 Minutes'
        />
        <PlayerList data={data.playerList} title='U-20 Players' />
      </div>
      <footer>
        <BottomNav>
          <BottomNavItemLink
            destination='/competitions/$competitionId/teams/$teamId/overview'
            pathParams={{
              teamId: params.teamId,
              competitionId: params.competitionId,
            }}
          >
            <SquareChartGantt />
          </BottomNavItemLink>
          <Separator orientation='vertical' className='bg-slate-300' />
          <BottomNavItemLink
            destination='/competitions/$competitionId/teams/$teamId/under-23'
            pathParams={{
              teamId: params.teamId,
              competitionId: params.competitionId,
            }}
          >
            <Donut />
          </BottomNavItemLink>
          <Separator orientation='vertical' className='bg-slate-300' />
          <BottomNavItemLink
            destination='/competitions/$competitionId/teams/$teamId/under-20'
            pathParams={{
              teamId: params.teamId,
              competitionId: params.competitionId,
            }}
          >
            <CakeSlice />
          </BottomNavItemLink>
        </BottomNav>
      </footer>
    </>
  );
}
