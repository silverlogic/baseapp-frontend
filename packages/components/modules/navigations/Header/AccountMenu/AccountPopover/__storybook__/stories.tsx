import { User, UserApi } from '@baseapp-frontend/authentication'
import { createTestEnvironment } from '@baseapp-frontend/graphql'

import { Meta, StoryObj } from '@storybook/react'
import Cookies from 'js-cookie'

import AccountPopover from '..'
import { withTokenSetup } from '../../../../../../.storybook/decorators'
import { PROFILE_KEY } from '../../../../../profiles/useCurrentProfile/constants'
import { AccountPopoverProps } from '../types'
import { mockResolvers } from './mockResolvers'

UserApi.getUser = async <TUser extends Partial<User>>() =>
  ({
    id: 1,
    firstName: 'Mocked',
    lastName: 'User',
    email: 'mocked.user@example.com',
  }) as TUser

export default {
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
      Cookies.set(
        PROFILE_KEY,
        JSON.stringify({
          id: '1234',
          name: 'test',
          image: null,
          url: { path: 'path' },
        }),
      )

      const { queueOperationResolver } = context.parameters.relayMockEnvironment as ReturnType<
        typeof createTestEnvironment
      >

      queueOperationResolver(mockResolvers)

      return <Story />
    },
  ],
} as Meta

type Story = StoryObj<AccountPopoverProps>

export const DefaultAccountPopover: Story = {
  parameters: {
    userType: 'valid',
    mockResolvers,
  },
}
