import { trpc } from '@/utils/trpc';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { Skeleton } from '@/components/ui/skeleton';
import { SquadOverview } from '@/components/squad-overview';
import { MinutesLineGraph } from '@/components/minutes-line-graph';
import { Link } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { PlayerList } from '@/components/player-list';

const OVERVIEW = 'overview';
const U23 = 'u23';
const U20 = 'u20';

const tabSchema = z.object({
  tab: z.enum(['overview', 'u23', 'u20']).catch('overview'),
});

export const Route = createFileRoute('/teams/$teamId/$competitionId')({
  component: TeamComponent,
  validateSearch: tabSchema,
});

function TeamComponent() {
  const { teamId, competitionId } = Route.useParams();
  const { tab } = Route.useSearch();
  const { data, isLoading } = trpc.teams.getTeamInfo.useQuery({
    teamId: Number(teamId),
    competitionId: Number(competitionId),
  });

  if (isLoading) {
    return <Header teamName='' competitionName='' isLoading={isLoading} />;
  }

  if (data) {
    return (
      <>
        <Header
          teamName={data.teamName}
          competitionName={data.competitionName}
          isLoading={isLoading}
        />
        {tab === 'overview' ? (
          <SquadOverview
            teamId={Number(teamId)}
            competitionId={Number(competitionId)}
          />
        ) : null}
        {tab === 'u23' ? (
          <div className='flex flex-col gap-y-8'>
            <MinutesLineGraph
              teamId={Number(teamId)}
              competitionId={Number(competitionId)}
              youthCutoff='2001-01-01'
              title='U-23 Minutes'
              minimumMinutes={data.minimumU23Minutes}
            />
            <PlayerList
              teamId={Number(teamId)}
              competitionId={Number(competitionId)}
              youthCutoff='2001-01-01'
              title='U-23 Players'
            />
          </div>
        ) : null}
        {tab === 'u20' ? (
          <div className='flex flex-col gap-y-8'>
            <MinutesLineGraph
              teamId={Number(teamId)}
              competitionId={Number(competitionId)}
              youthCutoff='2004-01-01'
              title='U-20 Minutes'
              minimumMinutes={data.minimumU20Minutes}
            />
            <PlayerList
              teamId={Number(teamId)}
              competitionId={Number(competitionId)}
              youthCutoff='2004-01-01'
              title='U-20 Players'
            />
          </div>
        ) : null}

        <footer className='fixed bottom-0 left-0 z-50 flex w-full flex-row items-center justify-center space-x-4 text-xl font-semibold'>
          <Link
            to='/teams/$teamId/$competitionId'
            search={{ tab: 'overview' }}
            params={{
              teamId: teamId.toString(),
              competitionId: competitionId.toString(),
            }}
            className={cn(tab === OVERVIEW ? 'bg-slate-500' : 'bg-inherit')}
          >
            Overview
          </Link>
          <Separator orientation='vertical' className='h-5 bg-slate-300' />
          <Link
            to='/teams/$teamId/$competitionId'
            search={{ tab: 'u23' }}
            params={{
              teamId: teamId.toString(),
              competitionId: competitionId.toString(),
            }}
            className={cn(tab === U23 ? 'bg-slate-500' : 'bg-inherit')}
          >
            U-23
          </Link>
          <Separator orientation='vertical' className='h-5 bg-slate-300' />
          <Link
            to='/teams/$teamId/$competitionId'
            search={{ tab: 'u20' }}
            params={{
              teamId: teamId.toString(),
              competitionId: competitionId.toString(),
            }}
            className={cn(tab === U20 ? 'bg-slate-500' : 'bg-inherit')}
          >
            U-20
          </Link>
        </footer>
      </>
    );
  }

  return (
    <p>
      This is team ID #{teamId} in competition {competitionId}
    </p>
  );
}
type HeaderProps = {
  teamName?: string;
  competitionName?: string;
  isLoading: boolean;
};

function Header({ teamName, competitionName, isLoading }: HeaderProps) {
  if (isLoading) {
    return (
      <header className='bg-slate-400 p-6'>
        <Skeleton className='h-6 w-24 leading-7' />
        <Skeleton className='h-4 w-24 leading-6' />
      </header>
    );
  }
  return (
    <header className='bg-slate-400 p-6'>
      <h1 className='truncate text-xl font-semibold'>{teamName}</h1>
      <h2 className='text-base'>{competitionName}</h2>
    </header>
  );
}
