import type { Meta, StoryObj } from '@storybook/react'

import { Password } from '.'

const meta: Meta<typeof Password> = {
  title: 'Password',
  component: Password,
}
export default meta

type Story = StoryObj<typeof Password>

export const PasswordField: Story = {
  args: {},
}
