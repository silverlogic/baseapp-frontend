import type { Meta, StoryObj } from '@storybook/react'

import { TextFieldComponent } from '.'

const meta: Meta<typeof TextFieldComponent> = {
  title: 'TextField',
  component: TextFieldComponent,
}
export default meta

type Story = StoryObj<typeof TextFieldComponent>

export const TextFieldPrimary: Story = {}
