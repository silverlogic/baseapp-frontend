import { Meta, StoryObj } from '@storybook/react'

import TextField from '..'
import { TextFieldProps } from '../types'

const meta: Meta<TextFieldProps> = {
  title: '@baseapp-frontend | designSystem/Inputs/TextField',
  component: TextField,
}

export default meta

type Story = StoryObj<TextFieldProps>

export const Default: Story = {
  args: {
    isResponsive: true,
    label: 'Default Label',
    placeholder: 'Type something...',
  },
}
