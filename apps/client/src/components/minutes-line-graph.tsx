import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  LabelList,
  YAxis,
  ReferenceLine,
} from 'recharts';
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
} from '@/components/ui/chart';
import { trpc } from '@/utils/trpc';

type MinutesLineGraphProps = {
  teamId: number;
  competitionId: number;
  youthCutoff: string;
};

export const MinutesLineGraph = ({
  teamId,
  competitionId,
  youthCutoff,
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
      date: match.date,
      minutes: match.totalMinutes,
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
          <CardTitle>Line Chart - Linear</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
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
              <XAxis
                dataKey='date'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              {/* <YAxis domain={[0, 1000]} /> */}
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
              >
                <LabelList
                  position='top'
                  offset={12}
                  className='fill-foreground'
                  fontSize={12}
                />
              </Line>
              {/* <ReferenceLine
                y={900}
                label='Max'
                stroke='red'
                strokeDasharray='3 3'
              /> */}
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
