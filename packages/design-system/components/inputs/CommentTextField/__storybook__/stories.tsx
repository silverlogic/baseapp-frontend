import { Meta, StoryObj } from '@storybook/react'

import CommentTextField from '..'
import { CommentTextFieldProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/Inputs/CommentTextField',
  component: CommentTextField,
  argTypes: {
    isReply: { control: 'boolean' },
    helperText: { control: 'text', table: { type: { summary: 'string' } } },
    replyTargetName: { control: 'text', table: { type: { summary: 'string' } } },
    onCancelReply: { action: 'cancel reply' },
    children: {
      control: false,
      description: 'Content to be rendered inside the text field.',
      table: { type: { summary: 'ReactNode' } },
    },
  },
  tags: ['autodocs'],
} as Meta<CommentTextFieldProps>

type Story = StoryObj<CommentTextFieldProps>

export const Default: Story = {
  args: {
    isReply: false,
    placeholder: 'Type your comment...',
  },
}

export const ReplyMode: Story = {
  args: {
    isReply: true,
    replyTargetName: 'John Doe',
    placeholder: 'Type your reply...',
  },
  render: (args) => (
    <CommentTextField {...args}>
      <div>Custom content inside the text field</div>
    </CommentTextField>
  ),
}
