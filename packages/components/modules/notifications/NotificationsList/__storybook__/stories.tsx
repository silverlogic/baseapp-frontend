import type { Meta, StoryObj } from '@storybook/react'

import NotificationsList from '..'
import { emptyNotificationsListMockData, notificationsListMockData } from './mockResolvers'

const meta: Meta<typeof NotificationsList> = {
  title: '@baseapp-frontend | components/Notifications/NotificationsList',
  component: NotificationsList,
  tags: ['autodocs'],
  argTypes: {
    setIsDrawerOpened: {
      control: false,
      description: 'Function to toggle the Drawer open/close state.',
      table: {
        type: {
          summary: 'Dispatch<SetStateAction<boolean>>',
        },
      },
    },
    EmptyState: {
      control: false,
      description: 'Overrides the EmptyState component.',
      table: {
        type: {
          summary: 'FC',
        },
      },
    },
    LoadingState: {
      control: false,
      description: 'Overrides the LoadingState component.',
      table: {
        type: {
          summary: 'FC<LoadingStateProps>',
        },
      },
    },
    LoadingStateProps: {
      control: 'object',
      description: 'Props to pass to the LoadingState component.',
      table: {
        type: {
          summary: 'LoadingStateProps',
        },
      },
    },
    NotificationItem: {
      control: false,
      description: 'Overrides the NotificationItem component.',
      table: {
        type: {
          summary: 'FC<NotificationItemProps>',
        },
      },
    },
  },
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
  parameters: {},
}
