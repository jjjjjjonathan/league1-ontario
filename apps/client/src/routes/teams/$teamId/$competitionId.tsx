import { trpc } from '@/utils/trpc';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { Skeleton } from '@/components/ui/skeleton';
import { SquadOverview } from '@/components/squad-overview';
import { MinutesLineGraph } from '@/components/minutes-line-graph';

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
          <MinutesLineGraph
            teamId={Number(teamId)}
            competitionId={Number(competitionId)}
            youthCutoff='2001-01-01'
          />
        ) : null}
        {tab === 'u20' ? (
          <MinutesLineGraph
            teamId={Number(teamId)}
            competitionId={Number(competitionId)}
            youthCutoff='2004-01-01'
          />
        ) : null}
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
