import type { Meta, StoryObj } from '@storybook/react'

import NotificationItem from '..'
import NotificationItemWithQuery from './NotificationItemWithQuery'
import { mockResolvers } from './mockResolvers'

const meta: Meta<typeof NotificationItem> = {
  title: '@baseapp-frontend | components/Notifications/NotificationItem',
  component: NotificationItemWithQuery,
  tags: ['autodocs'],
  argTypes: {
    notification: {
      description: 'The notification data.',
      control: 'object',
      table: {
        type: {
          summary: 'NotificationItem_notification$key',
        },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof NotificationItem>

export const DefaultNotificationItem: Story = {
  name: 'Default NotificationItem',
  parameters: {
    mockResolvers,
  },
}
