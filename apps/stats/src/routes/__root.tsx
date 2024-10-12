import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import type { trpcQueryUtils } from '../router';
import { TopNav, TopNavItem } from '@/components/top-nav';

export interface RouterAppContext {
  trpcQueryUtils: typeof trpcQueryUtils;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div>
      <TopNav>
        <TopNavItem destination='/' external={false} label='Home' />
        <TopNavItem
          destination='/competitions'
          external={false}
          label='Competitions'
        />
        <TopNavItem
          destination='https://league1ontario.com'
          external={true}
          label='www.league1ontario.com'
        />
      </TopNav>
      <Outlet />
      <TanStackRouterDevtools position='bottom-right' />
    </div>
  );
}
