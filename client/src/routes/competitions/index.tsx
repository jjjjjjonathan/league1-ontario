import { createFileRoute, Link } from '@tanstack/react-router';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const Route = createFileRoute('/competitions/')({
  component: CompetitionsComponent,
});

function CompetitionsComponent() {
  const { data, isLoading } = trpc.competitions.competitionYears.useQuery();

  const [year, setYear] = useState<number>(0);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data) {
    return (
      <>
        <Select onValueChange={(value) => setYear(Number(value))}>
          <SelectTrigger>
            <SelectValue placeholder='Select a year' />
          </SelectTrigger>
          <SelectContent>
            {data.map((year) => (
              <SelectItem value={year.toString(10)} key={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <CompetitionSelect year={year} />
      </>
    );
  }
}

function CompetitionSelect({ year }: { year: number }) {
  const { data, isFetching } = trpc.competitions.competitionsByYear.useQuery(
    { year },
    { enabled: !!year }
  );

  if (isFetching) {
    return <p>Loading competitions...</p>;
  }

  if (data) {
    return (
      <>
        <ul>
          {data.map((competition) => (
            <li key={competition.id}>
              <Link
                to='/competitions/$competitionId'
                params={{
                  competitionId: competition.id.toString(10),
                }}
              >
                {competition.name}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return <p>No year selected.</p>;
}
