import { Meta, StoryObj } from '@storybook/react'
import Image from 'next/image'

import ClickableAvatar from '..'
import { ClickableAvatarProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/Avatars/ClickableAvatar',
  component: ClickableAvatar,
} as Meta<ClickableAvatarProps>

type Story = StoryObj<ClickableAvatarProps>

export const DefaultClickableAvatar: Story = {
  args: {
    isOpen: false,
    width: 50,
    height: 50,
    children: (
      <Image
        src="https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png"
        alt="Avatar Icon"
        width={50}
        height={50}
      />
    ),
    onClick: () => alert('Avatar clicked'),
  },
}

export const TextClickableAvatar: Story = {
  args: {
    isOpen: false,
    width: 50,
    height: 50,
    children: 'AA',
    onClick: () => alert('Avatar clicked'),
  },
}

export const OpenState: Story = {
  args: {
    isOpen: true,
    width: 50,
    height: 50,
    children: (
      <Image
        src="https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png"
        alt="Avatar Icon"
        width={50}
        height={50}
      />
    ),
    onClick: () => alert('Avatar clicked'),
  },
}
