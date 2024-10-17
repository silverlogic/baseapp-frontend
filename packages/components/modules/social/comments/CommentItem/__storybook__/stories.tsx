import type { Meta, StoryObj } from '@storybook/react'

import CommentItem from '..'
import CommentItemWithQuery from './CommentItemWithQuery'
import { mockResolvers } from './mockResolvers'

const meta: Meta<typeof CommentItem> = {
  title: '@baseapp-frontend | components/Social/CommentItem',
  component: CommentItemWithQuery,
  tags: ['autodocs'],
  argTypes: {
    comment: {
      description: 'The comment data.',
      control: 'object',
      table: {
        type: {
          summary: 'CommentItem_comment$key',
        },
      },
    },
    target: {
      description: 'The target data.',
      control: 'object',
      table: {
        type: {
          summary: 'CommentItem_target$key',
        },
      },
    },
    profileId: {
      description: 'ID of the profile.',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    currentThreadDepth: {
      description: 'Current depth of the comment thread.',
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    subscriptionsEnabled: {
      description: 'Whether subscriptions are enabled.',
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    onReplyClick: {
      description: 'Callback when the reply is clicked.',
      control: false,
      table: {
        type: {
          summary: '() => void',
        },
      },
    },
    enableDelete: {
      description: 'Whether the delete comment option is enabled.',
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    CommentUpdate: {
      description: 'Overrides the CommentUpdate component.',
      control: false,
      table: {
        type: {
          summary: 'FC<CommentUpdateProps>',
        },
      },
    },
    CommentUpdateProps: {
      description: 'See CommentUpdate’s story for more details.',
      control: 'object',
      table: {
        type: {
          summary: 'Partial<CommentUpdateProps>',
        },
      },
    },
    CommentsRepliesProps: {
      description: 'See CommentsRepliesProps for more details.',
      control: 'object',
      table: {
        type: {
          summary: 'Partial<CommentsRepliesProps>',
        },
      },
    },
    CommentOptionsProps: {
      description: 'See CommentOptionsProps for more details.',
      control: 'object',
      table: {
        type: {
          summary: 'Partial<CommentOptionsProps>',
        },
      },
    },
    CommentReactionButton: {
      description: 'Overrides the CommentReactionButton component.',
      control: false,
      table: {
        type: {
          summary: 'FC<CommentReactionButtonProps>',
        },
      },
    },
    CommentReplyButton: {
      description: 'Overrides the CommentReplyButton component.',
      control: false,
      table: {
        type: {
          summary: 'FC<CommentReplyButtonProps>',
        },
      },
    },
    CommentPinnedBadge: {
      description: 'Overrides the CommentPinnedBadge component.',
      control: false,
      table: {
        type: {
          summary: 'FC<CommentPinnedBadgeProps>',
        },
      },
    },
    Timestamp: {
      description: 'Overrides the Timestamp component.',
      control: false,
      table: {
        type: {
          summary: 'FC<TimestampProps>',
        },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof CommentItem>

export const DefaultCommentItem: Story = {
  name: 'Default CommentItem',
  parameters: {
    mockResolvers,
  },
}
