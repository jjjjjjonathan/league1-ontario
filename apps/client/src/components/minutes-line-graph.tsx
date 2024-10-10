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
import { trpc } from '@/router';
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
      <div className='flex w-full flex-row items-center justify-center'>
        <Card className='mx-6 mt-4 flex h-full w-full flex-col bg-slate-100 md:w-2/3 lg:w-1/2'>
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
                    minimumMinutes * 1.25 >
                    data[data.length - 1].runningTotalMinutes
                      ? minimumMinutes * 1.25
                      : data[data.length - 1].runningTotalMinutes,
                  ]}
                  width={30}
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
                  label={`${minimumMinutes} min`}
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
      </div>
    );
  }
};
