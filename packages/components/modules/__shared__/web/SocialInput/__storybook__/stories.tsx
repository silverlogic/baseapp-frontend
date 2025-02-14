import type { Meta, StoryObj } from '@storybook/react'

import SocialInput from '..'
import SocialInputWithForm from './SocialInputWithForm'

const meta: Meta<typeof SocialInput> = {
  title: '@baseapp-frontend | components/Shared/SocialInput',
  component: SocialInputWithForm,
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
