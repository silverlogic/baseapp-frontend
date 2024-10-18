import type { Meta, StoryObj } from '@storybook/react'

import SocialInput from '..'
import SocialInputWithForm from './SocialInputWithForm'

const meta: Meta<typeof SocialInput> = {
  title: '@baseapp-frontend | components/Shared/SocialInput',
  component: SocialInputWithForm,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Placeholder for the input field.',
      control: { type: 'text' },
      defaultValue: 'Message...',
    },
    autoFocusInput: {
      description: 'Automatically focus the input field.',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    isLoading: {
      description: 'Indicates whether the form submission is in progress.',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    isReply: {
      description: 'Indicates if the message is a reply.',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    replyTargetName: {
      description: 'Name of the person being replied to.',
      control: { type: 'text' },
    },
    onCancelReply: {
      description: 'Callback when the reply is canceled.',
      action: 'cancelReply',
    },
  },
}

export default meta

type Story = StoryObj<typeof SocialInput>

export const DefaultSocialInput: Story = {
  name: 'Default SocialInput',
  args: {
    isLoading: false,
    isReply: false,
    replyTargetName: null,
    placeholder: 'Placeholder...',
  },
}
