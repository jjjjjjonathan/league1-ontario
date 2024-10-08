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
import { trpc } from '@/utils/trpc';

type PlayerListProps = {
  teamId: number;
  competitionId: number;
  youthCutoff: string;
  title: string;
};

export const PlayerList = ({
  teamId,
  competitionId,
  youthCutoff,
  title,
}: PlayerListProps) => {
  const { data, isLoading } = trpc.teams.getPlayersInAgeGroup.useQuery({
    teamId,
    competitionId,
    youthCutoff,
  });

  if (isLoading) return <p>Loading...</p>;

  if (data) {
    return (
      <div className='flex flex-row justify-evenly'>
        <PlayerTable title={title} players={data} />
      </div>
    );
  }
};

type PlayerTableProps = {
  title: string;
  players: {
    id: number;
    name: string;
    totalMinutes: number;
  }[];
};

function PlayerTable({ title, players }: PlayerTableProps) {
  const teamTotalMinutes = players
    .map((player) => player.totalMinutes)
    .reduce((a, b) => a + b, 0);
  return (
    <Card className='flex flex-col bg-slate-100'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className='text-right'>Total Minutes</TableHead>
              <TableHead className='text-right'>
                Percentage of Age Group Minutes
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((row) => (
              <TableRow key={`${row.id}-${title}`}>
                <TableCell>{row.name}</TableCell>
                <TableCell className='text-right'>
                  {row.totalMinutes.toLocaleString()}
                </TableCell>
                <TableCell className='text-right'>
                  {((row.totalMinutes / teamTotalMinutes) * 100).toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
