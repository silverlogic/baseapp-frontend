import { Meta, StoryObj } from '@storybook/react'

import TextareaField from '..'
import { TextFieldProps } from '../../TextField/types'

const meta: Meta<TextFieldProps> = {
  title: '@baseapp-frontend | designSystem/Inputs/TextareaField',
  component: TextareaField,
}

export default meta

type Story = StoryObj<TextFieldProps>

export const Default: Story = {
  args: {
    label: 'Default Label',
    placeholder: 'Type something...',
    multiline: true,
    maxRows: 3,
  },
}
