import { createFileRoute, Outlet } from '@tanstack/react-router';
import { BottomNav, BottomNavItemLink } from '@/components/bottom-nav';
import { Separator } from '@/components/ui/separator';
import { SquareChartGantt, Donut, CakeSlice } from 'lucide-react';

export const Route = createFileRoute(
  '/competitions/$competitionId/teams/$teamId/_layout',
)({
  component: Layout,
});

function Layout() {
  const params = Route.useParams();
  return (
    <>
      <main className='mb-16 mt-4 flex flex-col gap-y-8'>
        <Outlet />
      </main>
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
