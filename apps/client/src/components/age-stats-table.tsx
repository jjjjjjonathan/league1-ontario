import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';

type AgeStatsTableProps = {
  ageStatsTableData: {
    label: string;
    value: number;
  }[];
};

const StatsTableRow = ({ label, value }: { label: string; value: number }) => {
  return (
    <TableRow>
      <TableCell>{label}</TableCell>
      <TableCell className='text-right font-semibold'>{value}</TableCell>
    </TableRow>
  );
};

export const AgeStatsTable = ({ ageStatsTableData }: AgeStatsTableProps) => {
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
