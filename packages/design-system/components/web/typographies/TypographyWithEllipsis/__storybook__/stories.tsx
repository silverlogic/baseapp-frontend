import { Meta, StoryObj } from '@storybook/react'

import TypographyWithEllipsis from '..'
import { TypographyWithEllipsisProps } from '../types'

const meta: Meta<TypographyWithEllipsisProps> = {
  title: '@baseapp-frontend | designSystem/Typographies/TypographyWithEllipsis',
  component: TypographyWithEllipsis,
}

export default meta

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
