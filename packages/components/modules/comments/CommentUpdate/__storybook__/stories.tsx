import type { Meta, StoryObj } from '@storybook/react'

import CommentUpdate from '..'
import CommentsUpdateWithQuery from './CommentsUpdateWithQuery'
import { mockResolvers } from './mockResolvers'

const meta: Meta<typeof CommentUpdate> = {
  title: '@baseapp-frontend | components/Comments/CommentUpdate',
  component: CommentsUpdateWithQuery,
}

export default meta

type Story = StoryObj<typeof CommentUpdate>

export const DefaultComments: Story = {
  name: 'Default CommentUpdate',
  parameters: {
    mockResolvers,
  },
}
