import type { Meta, StoryObj } from '@storybook/react'

import Comments from '..'
import CommentsWithQuery from './CommentsWithQuery'
import { mockResolvers } from './mockResolvers'

const meta: Meta<typeof Comments> = {
  title: '@baseapp-frontend | components/Social/Comments',
  component: CommentsWithQuery,
  tags: ['autodocs'],
  argTypes: {
    target: {
      description: 'The key of the comments fragment.',
      control: false,
      table: {
        type: {
          summary: 'CommentsFragment$key',
        },
      },
    },
    profileId: {
      description: 'ID of the profile.',
      control: false,
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    subscriptionsEnabled: {
      description: 'Whether subscriptions are enabled for real-time updates.',
      control: 'boolean',
      table: {
        readonly: true,
        type: {
          summary: 'boolean',
        },
      },
    },
    CommentsList: {
      description: 'Overrides the CommentsList component.',
      control: false,
      table: {
        type: {
          summary: 'FC<CommentsListProps>',
        },
      },
    },
    CommentsListProps: {
      description: 'See CommentsList`s story for more details.',
      table: {
        type: {
          summary: 'Partial<CommentsListProps>',
        },
      },
    },
    CommentCreate: {
      description: 'Overrides the CommentCreate component.',
      control: false,
      table: {
        type: {
          summary: 'FC<CommentsListProps>',
        },
      },
    },
    CommentCreateProps: {
      description: 'See CommentCreate`s story for more details.',
      table: {
        type: {
          summary: 'Partial<CommentCreateProps>',
        },
      },
    },
    onCommentCreateFocus: {
      description: 'Callback when the comment create input is focused.',
      control: false,
      table: {
        type: {
          summary: '(ref: HTMLInputElement) => void',
        },
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Comments>

export const DefaultComments: Story = {
  name: 'Default Comments',
  args: {
    subscriptionsEnabled: false,
  },
  parameters: {
    mockResolvers,
  },
}
