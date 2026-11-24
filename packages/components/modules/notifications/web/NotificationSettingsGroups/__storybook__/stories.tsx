import type { Meta, StoryObj } from '@storybook/react'

import NotificationSettingsGroups from '..'
import {
  emptyNotificationSettingGroupsMockData,
  notificationSettingGroupsMockData,
} from './mockResolvers'

const meta: Meta<typeof NotificationSettingsGroups> = {
  title: '@baseapp-frontend | components/Notifications/NotificationSettingsGroups',
  component: NotificationSettingsGroups,
}

export default meta

type Story = StoryObj<typeof NotificationSettingsGroups>

export const DefaultNotificationSettingsGroups: Story = {
  name: 'Default NotificationSettingsGroups',
  args: {},
  parameters: {
    mockData: notificationSettingGroupsMockData,
  },
}

export const WithCustomCopy: Story = {
  name: 'With custom copy',
  args: {
    channelLabels: { IN_APP: 'Portal', EMAIL: 'E-mail', PUSH: 'Phone' },
    groupColumnLabel: 'Topic',
    lockedHint: 'Always on',
  },
  parameters: {
    mockData: notificationSettingGroupsMockData,
  },
}

export const Empty: Story = {
  name: 'No groups',
  args: {},
  parameters: {
    mockData: emptyNotificationSettingGroupsMockData,
  },
}
