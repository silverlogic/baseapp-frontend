import type { Meta, StoryObj } from '@storybook/react'

import CommentsList from '..'
import CommentsListWithQuery from './CommentsListWithQuery'
import { mockResolvers } from './mockResolvers'

const meta: Meta<typeof CommentsList> = {
  title: '@baseapp-frontend | components/Comments/CommentsList',
  component: CommentsListWithQuery,
}

export default meta

type Story = StoryObj<typeof CommentsList>

export const DefaultComments: Story = {
  name: 'Default CommentsList',
  parameters: {
    mockResolvers,
  },
}
