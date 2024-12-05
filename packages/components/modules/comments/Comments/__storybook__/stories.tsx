import type { Meta, StoryObj } from '@storybook/react'

import Comments from '..'
import CommentsWithQuery from './CommentsWithQuery'
import { mockResolvers } from './mockResolvers'

const meta: Meta<typeof Comments> = {
  title: '@baseapp-frontend | components/Comments/Comments',
  component: CommentsWithQuery,
}
export default meta

type Story = StoryObj<typeof Comments>

export const DefaultComments: Story = {
  name: 'Default Comments',
  args: {
    subscriptionsEnabled: false,
  },
  parameters: {
    mockResolvers,
  },
}
