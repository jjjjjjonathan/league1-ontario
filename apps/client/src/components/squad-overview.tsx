import { trpc } from '@/router';
import { AgePieChart } from './age-pie-chart';
import { AgeStatsTable } from './age-stats-table';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { MinutesChart } from './minutes-chart';

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
      <main className='mt-4 flex flex-col gap-y-4'>
        <Carousel className='mx-auto w-80 lg:w-5/6'>
          <CarouselContent>
            <CarouselItem className='basis-full lg:basis-1/3'>
              <AgePieChart
                seniorSquadSize={data.seniorSquadSize}
                u23SquadSize={data.u23SquadSize}
                u20SquadSize={data.u20SquadSize}
                squadSize={data.squadSize}
              />
            </CarouselItem>
            <CarouselItem className='basis-full lg:basis-1/3'>
              <MinutesChart
                totalMinutes={data.u23Minutes}
                minimumMinutes={data.minimumU23Minutes}
                minutesType='U-23'
              />
            </CarouselItem>
            <CarouselItem className='basis-full lg:basis-1/3'>
              <MinutesChart
                totalMinutes={data.u20Minutes}
                minimumMinutes={data.minimumU20Minutes}
                minutesType='U-20'
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className='hidden sm:flex' />
          <CarouselNext className='hidden sm:flex' />
        </Carousel>

        <AgeStatsTable ageStatsTableData={ageStatsTableData} />
      </main>
    );
  }
};
