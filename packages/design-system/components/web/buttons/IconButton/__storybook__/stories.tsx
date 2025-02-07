import CloseIcon from '@mui/icons-material/Close'
import { CircularProgress } from '@mui/material'
import { Meta, StoryObj } from '@storybook/react'

import IconButton from '..'
import { IconButtonProps } from '../types'

const meta: Meta<IconButtonProps> = {
  title: '@baseapp-frontend | designSystem/Buttons/IconButton',
  component: IconButton,
}

export default meta

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
