import type { Meta, StoryObj } from '@storybook/react'

import ActivityLog from '..'
import ActivityLogWithQuery from './ActivityLogWithQuery'
import { mockData } from './mockResolvers'

const meta: Meta<typeof ActivityLog> = {
  title: '@baseapp-frontend | components/ActivityLog/ActivityLog',
  component: ActivityLogWithQuery,
}

export default meta

type Story = StoryObj<typeof ActivityLog>

export const DefaultLogItem: Story = {
  name: 'Default ActivityLog',
  parameters: {
    mockData,
  },
}
