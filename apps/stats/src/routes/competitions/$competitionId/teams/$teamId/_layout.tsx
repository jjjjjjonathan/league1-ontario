import { createFileRoute, Outlet } from '@tanstack/react-router';
import { BottomNav, BottomNavItemLink } from '@/components/bottom-nav';
import { Separator } from '@/components/ui/separator';
import { SquareChartGantt, Donut, CakeSlice } from 'lucide-react';

export const Route = createFileRoute(
  '/competitions/$competitionId/teams/$teamId/_layout',
)({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
