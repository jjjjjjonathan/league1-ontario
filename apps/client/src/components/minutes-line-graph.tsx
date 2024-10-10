import { CartesianGrid, Line, LineChart, YAxis, ReferenceLine } from 'recharts';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { trpc } from '@/utils/trpc';
import { format } from '@formkit/tempo';

type MinutesLineGraphProps = {
  teamId: number;
  competitionId: number;
  youthCutoff: string;
  title: string;
  minimumMinutes: number;
};

export const MinutesLineGraph = ({
  teamId,
  competitionId,
  youthCutoff,
  title,
  minimumMinutes,
}: MinutesLineGraphProps) => {
  const { data, isLoading } = trpc.teams.getMinutesByMatch.useQuery({
    teamId,
    competitionId,
    youthCutoff,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data) {
    const chartData = data.map((match) => ({
      date: format(match.date, 'M D'),
      minutes: match.runningTotalMinutes,
    }));

    const chartConfig = {
      minutes: {
        label: 'Minutes',
        color: 'hsl(var(--chart-1))',
      },
    } satisfies ChartConfig;

    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <YAxis
                domain={[
                  0,
                  minimumMinutes + 1000 <=
                  data[data.length - 1].runningTotalMinutes
                    ? minimumMinutes + 1000
                    : data[data.length - 1].runningTotalMinutes,
                ]}
                className=''
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey='minutes'
                type='linear'
                stroke='var(--color-minutes)'
                strokeWidth={2}
                dot={false}
              ></Line>
              <ReferenceLine
                y={minimumMinutes}
                label='Minimum'
                stroke='red'
                strokeDasharray='3 3'
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className='flex-col items-start gap-2 text-sm'>
          <div className='flex gap-2 font-medium leading-none'>
            Trending up by 5.2% this month
          </div>
          <div className='leading-none text-muted-foreground'>
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    );
  }
};
