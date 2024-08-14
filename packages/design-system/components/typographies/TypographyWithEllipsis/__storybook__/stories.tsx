import { Meta, StoryObj } from '@storybook/react'

import TypographyWithEllipsis from '..'
import { TypographyWithEllipsisProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/Typography/TypographyWithEllipsis',
  component: TypographyWithEllipsis,
  argTypes: {
    lineClamp: { control: 'number', table: { type: { summary: 'number' } } },
    children: {
      control: 'text',
      description: 'Text content to be rendered.',
      table: { type: { summary: 'string' } },
    },
  },
  tags: ['autodocs'],
} as Meta<TypographyWithEllipsisProps>

type Story = StoryObj<TypographyWithEllipsisProps>

export const Default: Story = {
  args: {
    children:
      'This is some long text that should be truncated with an ellipsis if it exceeds the maximum width.',
  },
}

export const WithLineClamp: Story = {
  args: {
    lineClamp: 2,
    children:
      'This is some long text that should be truncated after two lines if it exceeds the maximum width.',
  },
}
