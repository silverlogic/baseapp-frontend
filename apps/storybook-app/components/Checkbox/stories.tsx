import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '.'

const meta: Meta<typeof Checkbox> = {
  title: 'CheckboxField',
  component: Checkbox,
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const CheckboxfieldPrimary: Story = {
  args: {
    label: 'My checkbox',
  },
}
