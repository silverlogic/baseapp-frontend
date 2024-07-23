import type { Meta, StoryObj } from '@storybook/react'

import CommentUpsertActions from '.'

const meta: Meta<typeof CommentUpsertActions> = {
  title: 'CommentUpsertActions',
  component: CommentUpsertActions,
}
export default meta

type Story = StoryObj<typeof CommentUpsertActions>

export const DefaultCommentUpsertActionsCommentUpsertActions: Story = {
  args: {},
}
