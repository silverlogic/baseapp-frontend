import type { Meta, StoryObj } from '@storybook/react'

import Timestamp from '..'

const meta: Meta<typeof Timestamp> = {
  title: '@baseapp-frontend | components/Shared/Timestamp',
  component: Timestamp,
}

export default meta

type Story = StoryObj<typeof Timestamp>

export const DefaultTimestamp: Story = {
  name: 'Default Timestamp',
  args: {
    date: '2024-07-17T11:42:55.508653+00:00',
  },
}
