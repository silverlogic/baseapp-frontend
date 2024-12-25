import { User, UserApi } from '@baseapp-frontend/authentication'
import { createTestEnvironment } from '@baseapp-frontend/graphql'

import { Meta, StoryObj } from '@storybook/react'

import AccountPopover from '..'
import { withTokenSetup } from '../../../../../../.storybook/decorators'
import { AccountPopoverProps } from '../types'
import { mockResolvers } from './mockResolvers'

UserApi.getUser = async <TUser extends Partial<User>>() =>
  ({
    id: 1,
    firstName: 'Mocked',
    lastName: 'User',
    email: 'mocked.user@example.com',
  }) as TUser

const meta: Meta = {
  title: '@baseapp-frontend | components/Navigation/AccountPopover',
  component: AccountPopover,
  args: {
    MenuItemsProps: {
      menuItems: [
        { label: 'Profile', onClick: () => console.log('Profile clicked') }, // eslint-disable-line no-console
        { label: 'Settings', onClick: () => console.log('Settings clicked') }, // eslint-disable-line no-console
      ],
    },
  },
  decorators: [
    withTokenSetup,
    (Story, context) => {
      const { queueOperationResolver } = context.parameters.relayMockEnvironment as ReturnType<
        typeof createTestEnvironment
      >

      queueOperationResolver({ mockResolvers })

      return <Story />
    },
  ],
}

export default meta

type Story = StoryObj<AccountPopoverProps>

export const DefaultAccountPopover: Story = {
  parameters: {
    userType: 'valid',
    mockResolvers,
  },
}
