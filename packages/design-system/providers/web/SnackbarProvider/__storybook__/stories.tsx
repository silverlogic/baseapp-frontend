import { FC } from 'react'

import { NotificationState, useNotification } from '@baseapp-frontend/utils'

import { Button } from '@mui/material'
import { Meta, StoryObj } from '@storybook/react'

import SnackbarProvider from '..'

interface SnackbarProps {
  message: string
  shouldShowProgress: boolean
  type: NotificationState['type']
}

const SnackbarWrapper: FC<SnackbarProps> = ({ message, shouldShowProgress, type }) => {
  const { sendToast } = useNotification()
  return (
    <SnackbarProvider>
      <Button onClick={() => sendToast(message, { type, shouldShowProgress })}>Post message</Button>
    </SnackbarProvider>
  )
}

const meta: Meta<SnackbarProps> = {
  title: '@baseapp-frontend | designSystem/SnackbarProvider/SnackbarProvider',
  component: SnackbarWrapper,
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
}

export default meta

type Story = StoryObj<SnackbarProps>

export const InfoWithProgress: Story = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'This is an info message with progress bar',
    shouldShowProgress: true,
    type: 'info',
  },
}

export const SuccessWithProgress: Story = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'This is a success message with progress bar',
    shouldShowProgress: true,
    type: 'success',
  },
}

export const WarningWithProgress: Story = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'This is a warning message with progress bar',
    shouldShowProgress: true,
    type: 'warning',
  },
}

export const ErrorWithProgress: Story = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'This is an error message with progress bar',
    shouldShowProgress: true,
    type: 'error',
  },
}

export const LongInfoWithProgress: Story = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message:
      'Mr. Jones, of the Manor Farm, had locked the hen-houses for the night, but was too drunk to remember to shut the popholes. With the ring of light from his lantern dancing from side to side, he lurched across the yard, kicked off his boots at the back door, drew himself a last glass of beer from the barrel in the scullery, and made his way up to bed, where Mrs. Jones was already snoring. From Geoge Orwell, Animal Farm, Chapter 1',
    shouldShowProgress: true,
    type: 'info',
  },
}

export const InfoWithoutProgress: Story = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'This is an info message without progress bar',
    shouldShowProgress: false,
    type: 'info',
  },
}

export const SuccessWithoutProgress: Story = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'This is a success message without progress bar',
    shouldShowProgress: false,
    type: 'success',
  },
}

export const WarningWithoutProgress: Story = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'This is a warning message without progress bar',
    shouldShowProgress: false,
    type: 'warning',
  },
}

export const ErrorWithoutProgress: Story = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'This is an error message without progress bar',
    shouldShowProgress: false,
    type: 'error',
  },
}

export const LongInfoWithoutProgress: Story = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message:
      'Mr. Jones, of the Manor Farm, had locked the hen-houses for the night, but was too drunk to remember to shut the popholes. With the ring of light from his lantern dancing from side to side, he lurched across the yard, kicked off his boots at the back door, drew himself a last glass of beer from the barrel in the scullery, and made his way up to bed, where Mrs. Jones was already snoring. From Geoge Orwell, Animal Farm, Chapter 1',
    shouldShowProgress: false,
    type: 'info',
  },
}
