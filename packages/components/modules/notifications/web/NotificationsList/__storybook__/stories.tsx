import type { Meta, StoryObj } from '@storybook/react'

import NotificationsList from '..'
import { emptyNotificationsListMockData, notificationsListMockData } from './mockResolvers'

const meta: Meta<typeof NotificationsList> = {
  title: '@baseapp-frontend | components/Notifications/NotificationsList',
  component: NotificationsList,
}

export default meta

type Story = StoryObj<typeof NotificationsList>

export const DefaultNotificationsList: Story = {
  name: 'Default NotificationsList',
  args: {},
  parameters: {
    mockData: notificationsListMockData,
  },
}

export const EmptyNotificationsList: Story = {
  name: 'Empty NotificationsList',
  args: {},
  parameters: {
    mockData: emptyNotificationsListMockData,
  },
}

export const LoadingNotificationsList: Story = {
  name: 'Loading NotificationsList',
  args: {},
  parameters: {
    queryName: 'NotificationsPopoverQuery',
  },
}
