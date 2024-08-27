import { Meta, StoryObj } from '@storybook/react'

import LoadingState from '..'
import { LoadingStateProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/Displays/LoadingState',
  component: LoadingState,
  argTypes: {
    CircularProgressProps: { control: 'object' },
  },
  tags: ['autodocs'],
} as Meta<LoadingStateProps>

type Story = StoryObj<LoadingStateProps>

export const Default: Story = {
  args: {
    CircularProgressProps: {
      size: 30,
      color: 'primary',
    },
  },
  render: (args) => <LoadingState {...args} />,
}

export const CustomSizeAndColor: Story = {
  args: {
    CircularProgressProps: {
      size: 60,
      color: 'secondary',
    },
  },
  render: (args) => <LoadingState {...args} />,
}
