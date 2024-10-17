import type { Meta, StoryObj } from '@storybook/react'

import CommentsList from '..'
import CommentsListWithQuery from './CommentsListWithQuery'
import { mockResolvers } from './mockResolvers'

const meta: Meta<typeof CommentsList> = {
  title: '@baseapp-frontend | components/Social/CommentsList',
  component: CommentsListWithQuery,
  tags: ['autodocs'],
  argTypes: {
    target: {
      control: false,
      description: 'The key of the comments list fragment.',
      table: {
        type: {
          summary: 'CommentsList_comments$key',
        },
      },
    },
    profileId: {
      control: false,
      description: 'ID of the profile.',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    subscriptionsEnabled: {
      control: 'boolean',
      description: 'Whether subscriptions are enabled for real-time updates.',
      table: {
        readonly: true,
        type: {
          summary: 'boolean',
        },
      },
    },
    onReplyClick: {
      control: false,
      description: 'Callback when the reply is clicked.',
      table: {
        type: {
          summary: '() => void',
        },
      },
    },
    CommentItem: {
      control: false,
      description: 'Overrides the CommentItem component.',
      table: {
        type: {
          summary: 'FC<CommentItemProps>',
        },
      },
    },
    CommentItemProps: {
      control: 'object',
      description: 'See CommentItem`s story for more details.',
      table: {
        type: {
          summary: 'Partial<CommentItemProps>',
        },
      },
    },
    VirtuosoProps: {
      control: 'object',
      description: 'Props to pass to the Virtuoso component.',
      table: {
        type: {
          summary: 'Partial<VirtuosoProps<any, any>>',
        },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof CommentsList>

export const DefaultComments: Story = {
  name: 'Default CommentsList',
  parameters: {
    mockResolvers,
  },
}
