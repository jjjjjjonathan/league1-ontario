import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/teams/$teamId/$competitionId')({
  component: TeamComponent,
});

function TeamComponent() {
  const { teamId, competitionId } = Route.useParams();

  return (
    <p>
      This is team ID #{teamId} in competition {competitionId}
    </p>
  );
}
