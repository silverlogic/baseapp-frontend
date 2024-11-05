import type { Meta, StoryObj } from '@storybook/react'

import NotificationsPopover from '..'
import { unreadNotificationsEmptyMockData, unreadNotificationsMockData } from './mockResolvers'

const meta: Meta<typeof NotificationsPopover> = {
  title: '@baseapp-frontend | components/Notifications/NotificationsPopover',
  component: NotificationsPopover,
  tags: ['autodocs'],
  argTypes: {
    Drawer: {
      control: false,
      description: 'Overrides the Drawer component.',
      table: {
        type: {
          summary: 'FC<DrawerProps>',
        },
      },
    },
    DrawerProps: {
      control: 'object',
      description: 'Props to pass to the Drawer component.',
      table: {
        type: {
          summary: 'Partial<DrawerProps>',
        },
      },
    },
    Badge: {
      control: false,
      description: 'Overrides the Badge component.',
      table: {
        type: {
          summary: 'FC<BadgeProps>',
        },
      },
    },
    BadgeProps: {
      control: 'object',
      description: 'Props to pass to the Badge component.',
      table: {
        type: {
          summary: 'Partial<BadgeProps>',
        },
      },
    },
    NotificationBellIcon: {
      control: false,
      description: 'Overrides the NotificationBellIcon component.',
      table: {
        type: {
          summary: 'FC<SvgIconProps>',
        },
      },
    },
    NotificationBellIconProps: {
      control: 'object',
      description: 'Props to pass to the NotificationBellIcon component.',
      table: {
        type: {
          summary: 'Partial<SvgIconProps>',
        },
      },
    },
    NotificationsList: {
      control: false,
      description: 'Overrides the NotificationsList component.',
      table: {
        type: {
          summary: 'FC<NotificationsListProps>',
        },
      },
    },
    NotificationsListProps: {
      control: 'object',
      description: 'Props to pass to the NotificationsList component.',
      table: {
        type: {
          summary: 'Partial<NotificationsListProps>',
        },
      },
    },
  },
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
