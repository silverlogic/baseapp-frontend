import type { Meta, StoryObj } from '@storybook/react'

import CommentCreate from '..'
import CommentCreateWithProvider from './CommentCreateWithProvider'

const meta: Meta<typeof CommentCreate> = {
  title: '@baseapp-frontend | components/Social/CommentCreate',
  component: CommentCreateWithProvider,
  tags: ['autodocs'],
  argTypes: {
    targetObjectId: {
      description: 'The ID of the target object for the comment.',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    autoFocusInput: {
      description: 'Whether the input should auto-focus on mount.',
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    placeholder: {
      description: 'Placeholder text for the comment input.',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    profileId: {
      description: 'ID of the profile creating the comment.',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    CommentTextField: {
      description: 'Overrides the CommentTextField component.',
      control: false,
      table: {
        type: {
          summary: 'FC<CommentTextFieldProps>',
        },
      },
    },
    CommentTextFieldProps: {
      description: 'See CommentTextField`s story for more details.',
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
    SendMessageIcon: {
      description: 'Overrides the SendMessageIcon component.',
      control: false,
      table: {
        type: {
          summary: 'FC<SvgIconProps>',
        },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof CommentCreate>

export const DefaultComments: Story = {
  name: 'Default CommentCreate',
}
