import { createFileRoute } from '@tanstack/react-router';
import { trpc } from '../utils/trpc';

export const Route = createFileRoute('/about')({
  component: AboutComponent,
});

function AboutComponent() {
  const { data, isLoading } = trpc.competitions.competitionList.useQuery();

  if (isLoading) {
    return (
      <div className='p-2'>
        <h3>About</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (data) {
    return (
      <div className='p-2'>
        <h3>About</h3>
        <p>{JSON.stringify(data)}</p>
      </div>
    );
  }
}
