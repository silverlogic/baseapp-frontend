import { Meta, StoryObj } from '@storybook/react'

import TextField from '..'
import { TextFieldProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/Inputs/TextField',
  component: TextField,
} as Meta<TextFieldProps>

type Story = StoryObj<TextFieldProps>

export const Default: Story = {
  args: {
    isResponsive: true,
    label: 'Default Label',
    placeholder: 'Type something...',
  },
}
