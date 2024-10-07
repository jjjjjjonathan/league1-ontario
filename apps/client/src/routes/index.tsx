import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className='container mx-auto bg-emerald-100'>
      <h1>League1 Ontario Stats</h1>
    </div>
  );
}
