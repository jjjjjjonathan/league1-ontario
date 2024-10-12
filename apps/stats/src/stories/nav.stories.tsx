import { TopNav, TopNavItem } from '@/components/top-nav';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'App/TopNav',
  component: TopNav,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TopNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  args: {
    children: (
      <TopNavItem
        destination='https://example.com'
        external={true}
        label='example.com'
      />
    ),
  },
};
