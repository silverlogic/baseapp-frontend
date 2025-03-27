import type { Meta, StoryObj } from '@storybook/react'

import LogGroups from '..'

const meta: Meta<typeof LogGroups> = {
  title: '@baseapp-frontend | components/ActivityLog/LogGroups',
  component: LogGroups,
}

export default meta

type Story = StoryObj<typeof LogGroups>

export const DefaultLogItem: Story = {
  name: 'Default LogGroups',
  args: {
    logGroups: [
      {
        lastActivityTimestamp: '2025-03-25T10:00:00Z',
        logs: [
          {
            id: 'log-1',
            createdAt: '2025-03-25T09:59:59Z',
            verb: 'comments.add_comment',
            url: '/some/url',
            events: {
              edges: [
                {
                  node: {
                    diff: '',
                    label: 'Title',
                  },
                },
              ],
            },
            user: {
              id: 'user-1',
              fullName: 'Alice Doe',
              email: 'alice@example.com',
              avatar: {
                url: 'https://placehold.co/48x48',
              },
            },
          },
          {
            id: 'log-2',
            createdAt: '2025-03-25T09:58:00Z',
            verb: 'comments.pin_comment',
            url: '/other/url',
            events: {
              edges: [],
            },
            user: {
              id: 'user-2',
              fullName: 'Bob Smith',
              email: 'bob@example.com',
              avatar: {
                url: 'https://placehold.co/48x48?text=Bob',
              },
            },
          },
        ],
      },
    ],
  },
}
