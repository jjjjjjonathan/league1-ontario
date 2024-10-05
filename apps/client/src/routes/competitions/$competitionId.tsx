import { createFileRoute, Link } from '@tanstack/react-router';
import { trpc } from '@/utils/trpc';

export const Route = createFileRoute('/competitions/$competitionId')({
  component: CompetitionComponent,
});

function CompetitionComponent() {
  const { competitionId } = Route.useParams();
  const { data, isLoading } = trpc.competitions.teamsInCompetition.useQuery({
    competitionId: Number(competitionId),
  });

  if (isLoading) return <p>Loading...</p>;

  if (data) {
    return (
      <ul>
        {data.map((team) => (
          <li key={team.id}>
            <Link
              to='/teams/$teamId/$competitionId'
              params={{
                teamId: team.id.toString(10),
                competitionId,
              }}
            >
              {team.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}
