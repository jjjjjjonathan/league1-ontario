import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

const OVERVIEW_PATH = '/competitions/$competitionId/teams/$teamId/overview';
const U23_PATH = '/competitions/$competitionId/teams/$teamId/under-23';
const U20_PATH = '/competitions/$competitionId/teams/$teamId/under-20';

export const BottomNav = ({ children }: { children: ReactNode }) => {
  return (
    <nav className='fixed bottom-0 flex h-14 w-full flex-row items-center justify-evenly bg-slate-200'>
      {children}
    </nav>
  );
};

export const BottomNavItemContent = ({
  children,
  isActive,
}: {
  children: ReactNode;
  isActive: boolean;
}) => {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center border-b-4',
        isActive
          ? ['border-slate-500', 'bg-slate-300']
          : ['border-transparent'],
      )}
    >
      {children}
    </div>
  );
};

type PathParams = {
  teamId: string;
  competitionId: string;
};

export const BottomNavItemLink = ({
  children,
  destination,
  pathParams,
}: {
  children: ReactNode;
  destination: typeof OVERVIEW_PATH | typeof U23_PATH | typeof U20_PATH;
  pathParams: PathParams;
}) => {
  const bottomNavLinkOptions = {
    to: destination,
    params: {
      teamId: pathParams.teamId,
      competitionId: pathParams.competitionId,
    },
  };
  return (
    <Link
      {...bottomNavLinkOptions}
      resetScroll={false}
      className='h-full w-full'
    >
      {({ isActive }) => {
        return (
          <BottomNavItemContent isActive={isActive}>
            {children}
          </BottomNavItemContent>
        );
      }}
    </Link>
  );
};
