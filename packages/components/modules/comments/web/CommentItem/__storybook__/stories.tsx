import type { Meta, StoryObj } from '@storybook/react'

import CommentItem from '..'
import CommentItemWithQuery from './CommentItemWithQuery'
import { mockResolvers } from './mockResolvers'

const meta: Meta<typeof CommentItem> = {
  title: '@baseapp-frontend | components/Comments/CommentItem',
  component: CommentItemWithQuery,
}

export default meta

type Story = StoryObj<typeof CommentItem>

export const DefaultCommentItem: Story = {
  name: 'Default CommentItem',
  parameters: {
    mockResolvers,
  },
}
