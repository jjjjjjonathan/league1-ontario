import { SquadOverviewRadar } from '@/components/squad-overview-radar';
import type { Meta, StoryObj } from '@storybook/react';

const team = {
  averageAge: 24,
  averageAgeByMinute: 25,
  averageAgeByU23Minutes: 22,
  averageAgeByU20Minutes: 19,
  averageSquadAgeNoU23: 32,
  averageSquadAgeNoU20: 25,
};

const competition = {
  averageAge: 22,
  averageAgeByMinute: 23,
  averageAgeByU23Minutes: 19,
  averageAgeByU20Minutes: 17,
  averageSquadAgeNoU23: 31,
  averageSquadAgeNoU20: 23,
};

const meta = {
  title: 'Example/Radar Chart',
  component: SquadOverviewRadar,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    team,
    competition,
  },
} satisfies Meta<typeof SquadOverviewRadar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
