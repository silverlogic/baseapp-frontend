import { Meta, StoryObj } from '@storybook/react'
import Image from 'next/image'

import AvatarWithPlaceholder from '..'
import { AvatarWithPlaceholderProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/Avatars/AvatarWithPlaceholder',
  component: AvatarWithPlaceholder,
} as Meta<AvatarWithPlaceholderProps>

type Story = StoryObj<AvatarWithPlaceholderProps>

export const PlaceholderAvatar: Story = {
  args: {
    width: 50,
    height: 50,
  },
}

export const ImageAvatar: Story = {
  args: {
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
  },
}

export const TextAvatar: Story = {
  args: {
    width: 50,
    height: 50,
    children: 'AA',
  },
}
