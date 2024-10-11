import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';

type AgeStatsTableProps = {
  averageAge: number;
  averageAgeByMinute: number;
  averageAgeByU23Minutes: number;
  averageAgeByU20Minutes: number;
  averageSqaudAgeNoU23: number;
  averageSqaudAgeNoU20: number;
};

const StatsTableRow = ({ label, value }: { label: string; value: number }) => {
  return (
    <TableRow>
      <TableCell>{label}</TableCell>
      <TableCell className='text-right font-semibold'>{value}</TableCell>
    </TableRow>
  );
};

export const AgeStatsTable = ({
  averageAge,
  averageAgeByMinute,
  averageAgeByU20Minutes,
  averageAgeByU23Minutes,
  averageSqaudAgeNoU20,
  averageSqaudAgeNoU23,
}: AgeStatsTableProps) => {
  const ageStatsTableData = [
    { label: 'Average Squad Age', value: averageAge },
    {
      label: 'Average Age by Minutes Played',
      value: averageAgeByMinute,
    },
    {
      label: 'Average U-23 Age by Minutes Played',
      value: averageAgeByU23Minutes,
    },
    {
      label: 'Average U-20 Age by Minutes Played',
      value: averageAgeByU20Minutes,
    },
    {
      label: 'Average Squad Age (Less U-23)',
      value: averageSqaudAgeNoU23,
    },
    {
      label: 'Average Squad Age (Less U-20)',
      value: averageSqaudAgeNoU20,
    },
  ];
  return (
    <Card className='mx-6 flex flex-col bg-slate-100'>
      <CardContent className='w-full flex-1 pb-0'>
        <Table>
          <TableBody>
            {ageStatsTableData.map((row) => (
              <StatsTableRow
                key={row.label}
                label={row.label}
                value={row.value}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
