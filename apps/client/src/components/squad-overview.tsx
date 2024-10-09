import { trpc } from '@/utils/trpc';
import { AgePieChart } from './age-pie-chart';
import { AgeStatsTable } from './age-stats-table';

type SquadOverviewProps = {
  teamId: number;
  competitionId: number;
};

export const SquadOverview = ({
  teamId,
  competitionId,
}: SquadOverviewProps) => {
  const { data, isLoading } = trpc.teams.getSquadOverview.useQuery({
    teamId,
    competitionId,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data) {
    const chartData = [
      {
        ageGroup: 'senior',
        players: data.seniorSquadSize,
        fill: 'var(--color-senior)',
      },
      { ageGroup: 'u23', players: data.u23SquadSize, fill: 'var(--color-u23)' },
      { ageGroup: 'u20', players: data.u20SquadSize, fill: 'var(--color-u20)' },
    ];

    const ageStatsTableData = [
      { label: 'Average Squad Age', value: data.averageAge },
      {
        label: 'Average Age by Minutes Played',
        value: data.averageAgeByMinute,
      },
      {
        label: 'Average U-23 Age by Minutes Played',
        value: data.averageAgeByU23Minutes,
      },
      {
        label: 'Average U-20 Age by Minutes Played',
        value: data.averageAgeByU20Minutes,
      },
      {
        label: 'Average Squad Age (Less U-23)',
        value: data.averageSqaudAgeNoU23,
      },
      {
        label: 'Average Squad Age (Less U-20)',
        value: data.averageSqaudAgeNoU20,
      },
    ];
    return (
      <>
        <AgePieChart chartData={chartData} squadSize={data.squadSize} />
        <AgeStatsTable ageStatsTableData={ageStatsTableData} />
      </>
    );
  }
};
