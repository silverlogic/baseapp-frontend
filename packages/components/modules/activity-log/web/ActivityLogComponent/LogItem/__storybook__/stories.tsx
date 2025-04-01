import type { Meta, StoryObj } from '@storybook/react'

import LogItem from '..'

const meta: Meta<typeof LogItem> = {
  title: '@baseapp-frontend | components/ActivityLog/LogItem',
  component: LogItem,
}

export default meta

type Story = StoryObj<typeof LogItem>

export const DefaultLogItem: Story = {
  name: 'Default LogItem',
  args: {
    log: {
      id: '123',
      verb: 'comments.add_comment',
      createdAt: '2025-03-26T12:00:00Z',
      url: 'https://example.com',
      events: {
        edges: [
          {
            node: {
              diff: '',
              label: 'mock label',
            },
          },
        ],
      },
      user: {
        id: 'user-1',
        fullName: 'Mock User',
        email: 'mock@tsl.io',
        avatar: {
          url: 'https://placehold.co/48x48',
        },
      },
    },
  },
}
