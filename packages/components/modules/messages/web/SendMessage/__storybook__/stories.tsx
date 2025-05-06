import type { Meta, StoryObj } from '@storybook/react'

import SendMessage from '..'

const meta: Meta<typeof SendMessage> = {
  title: '@baseapp-frontend | components/Messages/MessageCreate',
  component: SendMessage,
}

export default meta

type Story = StoryObj<typeof SendMessage>

export const DefaultMessageCreate: Story = {
  name: 'Default MessageCreate',
  parameters: {
    // mockResolvers,
  },
}
