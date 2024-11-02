import { User, UserApi } from '@baseapp-frontend/authentication'
import { createTestEnvironment } from '@baseapp-frontend/graphql'

import { Meta, StoryObj } from '@storybook/react'

import AccountPopover from '..'
import { withTokenSetup } from '../../../../../../.storybook/decorators'
import CurrentProfileProvider from '../../../../../profiles/context/CurrentProfileProvider'
import { CURRENT_PROFILE_STORAGE_KEY } from '../../../../../profiles/context/CurrentProfileProvider/constants'
import { ProfilesListQuery } from '../../../../../profiles/graphql/queries/ProfilesList'
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
  argTypes: {
    popoverStyles: { control: 'object', table: { type: { summary: 'CSSProperties' } } },
    CurrentUser: { control: false, table: { type: { summary: 'FC' } } },
    CurrentProfile: { control: false, table: { type: { summary: 'FC' } } },
    MenuItems: { control: false, table: { type: { summary: 'FC<MenuItemsProps>' } } },
    MenuItemsProps: { control: 'object', table: { type: { summary: 'MenuItemsProps' } } },
    SwitchProfileMenu: {
      control: false,
      table: { type: { summary: 'FC<SwitchProfileMenuProps>' } },
    },
    SwitchProfileMenuProps: {
      control: 'object',
      table: { type: { summary: 'SwitchProfileMenuProps' } },
    },
    ProfilesList: { control: false, table: { type: { summary: 'FC<ProfilesListProps>' } } },
    ProfilesListProps: { control: 'object', table: { type: { summary: 'ProfilesListProps' } } },
    AddProfileMenuItem: {
      control: false,
      table: { type: { summary: 'FC<AddProfileMenuItemProps>' } },
    },
    AddProfileMenuItemProps: {
      control: 'object',
      table: { type: { summary: 'AddProfileMenuItemProps' } },
    },
    LogoutItemProps: { control: 'object', table: { type: { summary: 'LogoutItemProps' } } },
  },
  tags: ['autodocs'],
  decorators: [
    withTokenSetup,
    (Story, context) => {
      localStorage.removeItem(CURRENT_PROFILE_STORAGE_KEY)

      const { queueOperationResolver, queuePendingOperation } = context.parameters
        .relayMockEnvironment as ReturnType<typeof createTestEnvironment>

      queueOperationResolver(mockResolvers)
      queuePendingOperation(ProfilesListQuery)

      return (
        <CurrentProfileProvider>
          <Story />
        </CurrentProfileProvider>
      )
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
