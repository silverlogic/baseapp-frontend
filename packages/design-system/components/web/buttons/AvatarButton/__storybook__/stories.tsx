import { Meta, StoryObj } from '@storybook/react'

import AvatarButton from '..'
import { AddMemberIcon } from '../../../icons'
import { AvatarButtonProps } from '../types'

const meta: Meta<AvatarButtonProps> = {
  title: '@baseapp-frontend | designSystem/Buttons/AvatarButton',
  component: AvatarButton,
}

export default meta

type Story = StoryObj<AvatarButtonProps>

export const Default: Story = {
  args: {
    onClick: () => console.log('clicked'),
  },
}

export const WithCaption: Story = {
  args: {
    onClick: () => console.log('clicked'),
    caption: 'Add Member',
  },
}

export const WithIcon: Story = {
  args: {
    onClick: () => console.log('clicked'),
    Icon: AddMemberIcon,
  },
}

export const WithIconAndCaption: Story = {
  args: {
    onClick: () => console.log('clicked'),
    Icon: AddMemberIcon,
    caption: 'Add Member',
  },
}
