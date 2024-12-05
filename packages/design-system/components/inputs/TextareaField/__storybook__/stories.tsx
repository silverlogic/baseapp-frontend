import { Meta, StoryObj } from '@storybook/react'

import TextareaField from '..'
import { TextFieldProps } from '../../TextField/types'

export default {
  title: '@baseapp-frontend | designSystem/Inputs/TextareaField',
  component: TextareaField,
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
