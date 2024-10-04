import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

type MinutesChartProps = {
  totalMinutes: number;
  minimumMinutes: number;
  minutesType: string;
};

export const MinutesChart = ({
  totalMinutes,
  minimumMinutes,
  minutesType,
}: MinutesChartProps) => {
  const chartData = [
    {
      type: 'totalMinutes',
      minutes: totalMinutes,
      fill: 'var(--color-totalMinutes)',
    },
  ];

  const chartConfig = {
    minutes: {
      label: 'Total Minutes',
    },
    totalMinutes: {
      label: 'Total Minutes',
      color:
        totalMinutes < minimumMinutes / 2
          ? 'hsl(var(--chart-1))'
          : totalMinutes < minimumMinutes
            ? 'hsl(var(--chart-5))'
            : 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>{minutesType} Minutes</CardTitle>
        <CardDescription>
          Minimum of {minimumMinutes.toLocaleString()} minutes by season end
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={minimumMinutes}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType='circle'
              radialLines={false}
              stroke='none'
              className='first:fill-muted last:fill-background'
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey='minutes' background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-4xl font-bold'
                        >
                          {totalMinutes.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          {minutesType} minutes
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          {totalMinutes >= minimumMinutes
            ? 'The minimum minutes threshold has been reached.'
            : `${minimumMinutes - totalMinutes} minutes are needed to reach the minimum threshold.`}
        </div>
      </CardFooter>
    </Card>
  );
};
