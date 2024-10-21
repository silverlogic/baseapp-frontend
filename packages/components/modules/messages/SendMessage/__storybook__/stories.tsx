import type { Meta, StoryObj } from '@storybook/react'

import SendMessage from '..'

const meta: Meta<typeof SendMessage> = {
  title: '@baseapp-frontend | components/Messages/SendMessage',
  component: SendMessage,
  tags: ['autodocs'],
  argTypes: {
    profileId: {
      description: 'The Profile ID of the user sending the message.',
      control: false,
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    roomId: {
      description: 'Room ID of the chat.',
      control: false,
      table: {
        type: {
          summary: '() => void',
        },
      },
    },
    SocialInput: {
      description: 'Custom text field form component.',
      control: false,
      table: {
        type: {
          summary: 'FC<SocialInputProps>',
        },
      },
    },
    SocialInputProps: {
      description: 'See SocialTextField’s story for more details.',
      control: 'object',
      table: {
        type: {
          summary: 'Partial<SocialTextFieldProps>',
        },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof SendMessage>

export const DefaultSendMessage: Story = {
  name: 'Default SendMessage',
  parameters: {
    // mockResolvers,
  },
}
