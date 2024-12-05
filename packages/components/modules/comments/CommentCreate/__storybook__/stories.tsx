import type { Meta, StoryObj } from '@storybook/react'

import CommentCreate from '..'
import CommentCreateWithProvider from './CommentCreateWithProvider'

const meta: Meta<typeof CommentCreate> = {
  title: '@baseapp-frontend | components/Comments/CommentCreate',
  component: CommentCreateWithProvider,
}

export default meta

type Story = StoryObj<typeof CommentCreate>

export const DefaultComments: Story = {
  name: 'Default CommentCreate',
}
