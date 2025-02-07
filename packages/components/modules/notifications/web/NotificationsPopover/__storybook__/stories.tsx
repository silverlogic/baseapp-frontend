import type { Meta, StoryObj } from '@storybook/react'

import NotificationsPopover from '..'
import { unreadNotificationsEmptyMockData, unreadNotificationsMockData } from './mockResolvers'

const meta: Meta<typeof NotificationsPopover> = {
  title: '@baseapp-frontend | components/Notifications/NotificationsPopover',
  component: NotificationsPopover,
}

export default meta

type Story = StoryObj<typeof NotificationsPopover>

export const DefaultNotificationsPopover: Story = {
  name: 'Default NotificationsPopover',
  args: {},
  parameters: {
    mockData: unreadNotificationsEmptyMockData,
  },
}

export const NotificationsPopoverWithUnreadNotifications: Story = {
  name: 'With unread notifications',
  args: {},
  parameters: {
    mockData: unreadNotificationsMockData,
  },
}
