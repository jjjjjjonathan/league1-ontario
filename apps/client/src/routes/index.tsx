import { createFileRoute, Link } from '@tanstack/react-router';
import { trpc } from '@/router';
import { Card, CardTitle, CardHeader } from '@/components/ui/card';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  const { data, isLoading } = trpc.competitions.featuredCompetitions.useQuery();

  if (isLoading) return <p>Loading...</p>;

  if (data) {
    return (
      <section className='h-screen'>
        <div className='flex h-full flex-col items-center justify-center gap-y-4'>
          {data.map((competition) => (
            <Link
              key={competition.id}
              to='/competitions/$competitionId'
              params={{ competitionId: competition.id.toString(10) }}
            >
              <Card className='p-2'>
                <CardHeader>
                  <CardTitle>{competition.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    );
  }
}
