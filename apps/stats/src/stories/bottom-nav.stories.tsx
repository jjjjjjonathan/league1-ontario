import { BottomNav, BottomNavItemContent } from '@/components/bottom-nav';
import { Separator } from '@/components/ui/separator';
import { SquareChartGantt, Donut, CakeSlice } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'TeamCompetition/BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BottomNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  args: {
    children: (
      <>
        <BottomNavItemContent isActive={true}>
          <SquareChartGantt />
        </BottomNavItemContent>
        <Separator orientation='vertical' className='bg-slate-300' />
        <BottomNavItemContent isActive={false}>
          <Donut className='text-slate-900' />
        </BottomNavItemContent>
        <Separator orientation='vertical' className='bg-slate-300' />
        <BottomNavItemContent isActive={false}>
          <CakeSlice />
        </BottomNavItemContent>
      </>
    ),
  },
};
