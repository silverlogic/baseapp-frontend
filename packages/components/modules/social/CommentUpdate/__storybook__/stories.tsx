import type { Meta, StoryObj } from '@storybook/react'

import CommentUpdate from '..'
import CommentsUpdateWithQuery from './CommentsUpdateWithQuery'
import { mockResolvers } from './mockResolvers'

const meta: Meta<typeof CommentUpdate> = {
  title: '@baseapp-frontend | components/Social/CommentUpdate',
  component: CommentsUpdateWithQuery,
  tags: ['autodocs'],
  argTypes: {
    comment: {
      description: 'The comment data to be updated.',
      control: 'object',
      table: {
        type: {
          summary: 'CommentItem_comment$data',
        },
      },
    },
    onCancel: {
      description: 'Callback function to handle the cancel action.',
      control: false,
      table: {
        type: {
          summary: '() => void',
        },
      },
    },
    CommentTextField: {
      description: 'Custom text field component.',
      control: false,
      table: {
        type: {
          summary: 'FC<CommentTextFieldProps>',
        },
      },
    },
    CommentTextFieldProps: {
      description: 'See CommentTextField’s story for more details.',
      control: 'object',
      table: {
        type: {
          summary: 'Partial<CommentTextFieldProps>',
        },
      },
    },
    CommentUpsertActions: {
      description: 'Component for upsert actions.',
      control: false,
      table: {
        type: {
          summary: 'FC',
        },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof CommentUpdate>

export const DefaultComments: Story = {
  name: 'Default CommentUpdate',
  parameters: {
    mockResolvers,
  },
}
