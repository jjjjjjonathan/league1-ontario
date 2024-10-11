import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/competitions/$competitionId/teams/$teamId/_layout',
)({
  component: () => (
    <div className=''>
      <Outlet />
    </div>
  ),
});
