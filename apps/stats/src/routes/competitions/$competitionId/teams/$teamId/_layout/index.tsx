import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/competitions/$competitionId/teams/$teamId/_layout/',
)({
  loader: ({ params }) => {
    redirect({
      to: '/competitions/$competitionId/teams/$teamId/overview',
      params: {
        teamId: params.teamId,
        competitionId: params.competitionId,
      },
      throw: true,
    });
  },
});
