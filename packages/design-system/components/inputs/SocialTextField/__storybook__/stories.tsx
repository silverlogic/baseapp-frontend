import { Meta, StoryObj } from '@storybook/react'

import SocialTextField from '..'
import { SocialTextFieldProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/Inputs/SocialTextField',
  component: SocialTextField,
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
} as Meta<SocialTextFieldProps>

type Story = StoryObj<SocialTextFieldProps>

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
    <SocialTextField {...args}>
      <div>Custom content inside the text field</div>
    </SocialTextField>
  ),
}
