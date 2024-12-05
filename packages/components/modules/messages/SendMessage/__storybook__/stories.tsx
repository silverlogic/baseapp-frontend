import type { Meta, StoryObj } from '@storybook/react'

import SendMessage from '..'

const meta: Meta<typeof SendMessage> = {
  title: '@baseapp-frontend | components/Messages/SendMessage',
  component: SendMessage,
}

export default meta

type Story = StoryObj<typeof SendMessage>

export const DefaultSendMessage: Story = {
  name: 'Default SendMessage',
  parameters: {
    // mockResolvers,
  },
}
