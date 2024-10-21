import type { Meta, StoryObj } from '@storybook/react'

import CommentCreate from '..'
import CommentCreateWithProvider from './CommentCreateWithProvider'

const meta: Meta<typeof CommentCreate> = {
  title: '@baseapp-frontend | components/Comments/CommentCreate',
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
    profileId: {
      description: 'ID of the profile creating the comment.',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    SocialInput: {
      description: 'Overrides the SocialInput component.',
      control: false,
      table: {
        type: {
          summary: 'FC<SocialInputProps>',
        },
      },
    },
    SocialInputProps: {
      description: 'See SocialInput`s story for more details.',
      table: {
        type: {
          summary: 'Partial<SocialInputProps>',
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
