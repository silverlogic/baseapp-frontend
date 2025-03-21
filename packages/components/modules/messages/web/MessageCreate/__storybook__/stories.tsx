import type { Meta, StoryObj } from '@storybook/react'

import MessageCreate from '..'

const meta: Meta<typeof MessageCreate> = {
  title: '@baseapp-frontend | components/Messages/MessageCreate',
  component: MessageCreate,
}

export default meta

type Story = StoryObj<typeof MessageCreate>

export const DefaultMessageCreate: Story = {
  name: 'Default MessageCreate',
  parameters: {
    // mockResolvers,
  },
}
