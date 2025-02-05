import { Meta, StoryObj } from '@storybook/react'

import AvatarButton from '..'
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

export const WithImage: Story = {
  args: {
    onClick: () => console.log('clicked'),
    imageString: '/path/to/avatar.jpg',
  },
}

export const WithImageAndCaption: Story = {
  args: {
    onClick: () => console.log('clicked'),
    imageString: '/path/to/avatar.jpg',
    caption: 'Add Member',
  },
}
