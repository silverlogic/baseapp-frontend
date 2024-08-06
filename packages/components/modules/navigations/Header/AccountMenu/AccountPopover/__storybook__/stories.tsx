import { Meta, StoryObj } from '@storybook/react'

import AccountPopover from '..'
import { AccountPopoverProps } from '../types'

export default {
  title: '@baseapp-frontend | components/Navigation/AccountPopover',
  component: AccountPopover,
  args: {
    menuItems: [
      { label: 'Profile', onClick: () => console.log('Profile clicked') },
      { label: 'Settings', onClick: () => console.log('Settings clicked') },
    ],
  },
  argTypes: {
    menuItems: { control: 'object' },
    logoutButtonLabel: { control: 'text' },
    hideLogoutButton: { control: 'boolean' },
  },
  tags: ['autodocs'],
} as Meta

type Story = StoryObj<AccountPopoverProps>

export const DefaultAccountMenu: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    menuItems: [
      { label: 'Profile', onClick: () => console.log('Profile clicked') },
      { label: 'Settings', onClick: () => console.log('Settings clicked') },
    ],
  },
}
