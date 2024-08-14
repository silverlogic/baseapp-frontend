import CloseIcon from '@mui/icons-material/Close'
import { CircularProgress } from '@mui/material'
import { Meta, StoryObj } from '@storybook/react'

import IconButton from '..'
import { IconButtonProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/Buttons/IconButton',
  component: IconButton,
  argTypes: {
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
    children: {
      control: false,
      description: 'Icon to be rendered inside the button.',
      table: { type: { summary: 'ReactNode' } },
    },
  },
  tags: ['autodocs'],
} as Meta<IconButtonProps>

type Story = StoryObj<IconButtonProps>

export const Default: Story = {
  args: {
    isLoading: false,
    disabled: false,
    color: 'primary',
    children: <CloseIcon />,
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
    disabled: false,
    color: 'primary',
    children: <CircularProgress size={15} />,
  },
}

export const Disabled: Story = {
  args: {
    isLoading: false,
    disabled: true,
    color: 'primary',
    children: <CloseIcon />,
  },
}
