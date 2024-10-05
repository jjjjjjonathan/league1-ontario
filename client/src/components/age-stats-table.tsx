import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
      <TableCell className='font-semibold text-right'>{value}</TableCell>
    </TableRow>
  );
};

export const AgeStatsTable = ({ ageStatsTableData }: AgeStatsTableProps) => {
  return (
    <Card className='flex flex-col'>
      <CardContent className='flex-1 pb-0'>
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
