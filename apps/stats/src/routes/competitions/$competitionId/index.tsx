import { createFileRoute, Link } from '@tanstack/react-router';
import { trpc } from '@/router';
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableCell,
  TableRow,
} from '@/components/ui/table';

export const Route = createFileRoute('/competitions/$competitionId/')({
  component: CompetitionComponent,
  loader: async ({
    context: { trpcQueryUtils },
    params: { competitionId },
  }) => {
    await trpcQueryUtils.competitions.teamsInCompetition.ensureData({
      competitionId: Number(competitionId),
    });
  },
});

const U20_MINUTES = 'u20Minutes';
const U23_MINUTES = 'u23Minutes';

function CompetitionComponent() {
  const { competitionId } = Route.useParams();
  const { data } = trpc.competitions.teamsInCompetition.useQuery({
    competitionId: Number(competitionId),
  });

  if (data) {
    return (
      <div className='flex flex-col gap-4 py-2'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team</TableHead>
              <TableHead className='text-right'>
                U-23 <span className='hidden md:inline'>Minutes</span>
              </TableHead>
              <TableHead className='text-right'>
                U-20 <span className='hidden md:inline'>Minutes</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortTeams(data, false, U23_MINUTES).map((team) => (
              <TableRow key={team.id}>
                <TableCell className='overflow-hidden text-ellipsis'>
                  <Link
                    to='/competitions/$competitionId/teams/$teamId'
                    params={{
                      teamId: team.id.toString(10),
                      competitionId,
                    }}
                    preload={false}
                  >
                    {team.name}
                  </Link>
                </TableCell>
                <TableCell className='text-right'>
                  {team.u23Minutes.toLocaleString()}
                </TableCell>
                <TableCell className='text-right'>
                  {team.u20Minutes.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

type Data = {
  id: number;
  name: string;
  u23Minutes: number;
  u20Minutes: number;
};

function sortTeams(
  data: Data[],
  ascending: boolean,
  column: 'u23Minutes' | 'u20Minutes',
): Data[] {
  return data.toSorted((a, b) => {
    if (ascending) {
      return a[column] - b[column];
    } else {
      return b[column] - a[column];
    }
  });
}
