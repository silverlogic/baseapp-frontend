import { Meta, StoryObj } from '@storybook/react'

import TextField from '..'
import { TextFieldProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/Form/TextField',
  component: TextField,
  argTypes: {
    isResponsive: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
  tags: ['autodocs'],
} as Meta<TextFieldProps>

type Story = StoryObj<TextFieldProps>

export const Default: Story = {
  args: {
    isResponsive: true,
    label: 'Default Label',
    placeholder: 'Type something...',
  },
}
