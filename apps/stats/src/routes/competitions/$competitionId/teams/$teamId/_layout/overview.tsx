import { createFileRoute } from '@tanstack/react-router';
import { trpc } from '@/router';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AgePieChart } from '@/components/age-pie-chart';
import { AgeStatsTable } from '@/components/age-stats-table';
import { MinutesChart } from '@/components/minutes-chart';

export const Route = createFileRoute(
  '/competitions/$competitionId/teams/$teamId/_layout/overview',
)({
  component: TeamOverviewComponent,
  loader: async ({ context, params }) => {
    await context.trpcQueryUtils.teams.getSquadOverview.ensureData({
      teamId: Number(params.teamId),
      competitionId: Number(params.competitionId),
    });
  },
});

function TeamOverviewComponent() {
  const params = Route.useParams();
  const teamId = Number(params.teamId);
  const competitionId = Number(params.competitionId);
  const { data } = trpc.teams.getSquadOverview.useQuery({
    teamId,
    competitionId,
  });

  if (!data) {
    return <div>data not found</div>;
  }

  return (
    <>
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

      <AgeStatsTable
        averageAge={data.averageAge}
        averageAgeByMinute={data.averageAgeByMinute}
        averageAgeByU20Minutes={data.averageAgeByU20Minutes}
        averageAgeByU23Minutes={data.averageAgeByU23Minutes}
        averageSqaudAgeNoU20={data.averageSqaudAgeNoU20}
        averageSqaudAgeNoU23={data.averageSqaudAgeNoU23}
      />
    </>
  );
}
