import { Meta, StoryObj } from '@storybook/react'

import TextareaField from '..'
import { TextFieldProps } from '../../TextField/types'

export default {
  title: '@baseapp-frontend | designSystem/Inputs/TextareaField',
  component: TextareaField,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    multiline: { control: 'boolean' },
    maxRows: { control: 'number' },
  },
  tags: ['autodocs'],
} as Meta<TextFieldProps>

type Story = StoryObj<TextFieldProps>

export const Default: Story = {
  args: {
    label: 'Default Label',
    placeholder: 'Type something...',
    multiline: true,
    maxRows: 3,
  },
}
