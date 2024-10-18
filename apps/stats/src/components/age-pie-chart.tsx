import { Label, Pie, PieChart } from 'recharts';
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
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

type AgePieChartProps = {
  squadSize: number;
  seniorSquadSize: number;
  u23SquadSize: number;
  u20SquadSize: number;
};

export const AgePieChart = ({
  squadSize,
  seniorSquadSize,
  u23SquadSize,
  u20SquadSize,
}: AgePieChartProps) => {
  const chartData = [
    {
      ageGroup: 'senior',
      players: seniorSquadSize,
      fill: 'var(--color-senior)',
    },
    { ageGroup: 'u23', players: u23SquadSize, fill: 'var(--color-u23)' },
    { ageGroup: 'u20', players: u20SquadSize, fill: 'var(--color-u20)' },
  ];

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
    <Card className='mx-6 flex h-full flex-col bg-slate-100'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Age Groups</CardTitle>
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
              outerRadius={80}
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
            <ChartLegend
              content={
                <ChartLegendContent nameKey='ageGroup'>test</ChartLegendContent>
              }
              className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center'
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='leading-1 flex items-center gap-2 font-medium'>
          {seniorSquadSize} senior player
          {isOnePlayer(seniorSquadSize) ? '' : 's'}, {u23SquadSize} U-23 player
          {isOnePlayer(u23SquadSize) ? '' : 's'}, and {u20SquadSize} U-20 player
          {isOnePlayer(u20SquadSize) ? '' : 's'},
        </div>
      </CardFooter>
    </Card>
  );
};

function isOnePlayer(players: number) {
  return players === 1;
}
