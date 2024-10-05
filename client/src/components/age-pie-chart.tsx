import { Label, Pie, PieChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type ChartData = {
  ageGroup: string;
  players: number;
  fill: string;
};

type AgePieChartProps = {
  chartData: ChartData[];
  squadSize: number;
};

export const AgePieChart = ({ chartData, squadSize }: AgePieChartProps) => {
  const chartConfig = {
    players: {
      label: 'Players',
    },
    senior: {
      label: 'Seniors',
      color: 'hsl(var(--chart-1))',
    },
    u23: {
      label: 'U-23s',
      color: 'hsl(var(--chart-2))',
    },
    u20: {
      label: 'U-20s',
      color: 'hsl(var(--chart-3))',
    },
  } satisfies ChartConfig;

  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Squad Analysis</CardTitle>
        <CardDescription>Summary of squad by age group</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='players'
              nameKey='ageGroup'
              innerRadius={60}
              strokeWidth={5}
            >
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
                          className='fill-foreground text-3xl font-bold'
                        >
                          {squadSize.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          Players
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
