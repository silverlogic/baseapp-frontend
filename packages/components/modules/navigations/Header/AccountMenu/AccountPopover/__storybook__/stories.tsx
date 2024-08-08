import { Meta, StoryObj } from '@storybook/react'

import AccountPopover from '..'
import { withTokenSetup } from '../../../../../../.storybook/decorators'
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
  decorators: [withTokenSetup],
} as Meta

type Story = StoryObj<AccountPopoverProps>

export const DefaultAccountPopover: Story = {
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
