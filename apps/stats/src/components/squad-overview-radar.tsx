import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

type Data = {
  averageAge: number;
  averageAgeByMinute: number;
  averageAgeByU23Minutes: number;
  averageAgeByU20Minutes: number;
  averageSquadAgeNoU23: number;
  averageSquadAgeNoU20: number;
};

type SquadOverviewRadarProps = {
  team: Data;
  competition: Data;
};

export function SquadOverviewRadar({
  team,
  competition,
}: SquadOverviewRadarProps) {
  const chartData = [
    {
      stat: 'avg age',
      team: team.averageAge,
      competition: competition.averageAge,
    },
    {
      stat: 'avg age min',
      team: team.averageAgeByMinute,
      competition: competition.averageAgeByMinute,
    },
    {
      stat: 'avg age u-23 min',
      team: team.averageAgeByU23Minutes,
      competition: competition.averageAgeByU23Minutes,
    },
    {
      stat: 'avg age-u20 min',
      team: team.averageAgeByU20Minutes,
      competition: competition.averageAgeByU20Minutes,
    },
    {
      stat: 'Average Squad Age Less U-23',
      team: team.averageSquadAgeNoU23,
      competition: competition.averageSquadAgeNoU23,
    },
    {
      stat: 'Average Squad Age Less U-20',
      team: team.averageSquadAgeNoU20,
      competition: competition.averageSquadAgeNoU20,
    },
  ];

  const chartConfig = {
    team: {
      label: 'Team',
      color: 'hsl(var(--chart-1))',
    },
    competition: {
      label: 'Competition',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  return (
    <Card className='m-8'>
      <CardHeader className='items-center'>
        <CardTitle>Radar Chart - Multiple</CardTitle>
      </CardHeader>
      <CardContent className='pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <PolarAngleAxis dataKey='stat' tick={false} />
            <PolarGrid />
            <Radar dataKey='team' fill='var(--color-team)' fillOpacity={0.6} />
            <Radar dataKey='competition' fill='var(--color-competition)' />
            <ChartLegend content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
