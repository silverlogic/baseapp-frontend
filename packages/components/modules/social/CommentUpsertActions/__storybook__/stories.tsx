import type { Meta, StoryObj } from '@storybook/react'

import CommentUpsertActions from '..'

const meta: Meta<typeof CommentUpsertActions> = {
  title: '@baseapp-frontend | components/Social/CommentUpsertActions',
  component: CommentUpsertActions,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CommentUpsertActions>

export const DefaultCommentUpsertActions: Story = {
  name: 'Default CommentUpsertActions',
}
