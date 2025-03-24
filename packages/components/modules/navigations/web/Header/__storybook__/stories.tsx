import {
  BaseAppLogoCondensed,
  SendMessageIcon,
} from '@baseapp-frontend/design-system/components/web/icons'
import { defaultTheme } from '@baseapp-frontend/design-system/tests/web/utils'

import { Meta, StoryObj } from '@storybook/react'

import Header from '..'
import { withTokenSetup } from '../../../../../.storybook/decorators'
import { HeaderProps } from '../types'

const meta: Meta<typeof Header> = {
  title: '@baseapp-frontend | components/Navigation/Header',
  component: Header,
  decorators: [withTokenSetup],
}

export default meta

type Story = StoryObj<HeaderProps>

export const InvalidUserHeader: Story = {
  parameters: {
    userType: 'invalid',
  },
  args: {
    settings: {
      ...defaultTheme.settings,
      themeLayout: 'centered',
    },
    onOpenNav: () => {},
    LogoIcon: BaseAppLogoCondensed,
    AccountMenuProps: {
      onRegisterClick: () => console.log('Register clicked'),
      onLoginClick: () => console.log('Login clicked'),
    },
  },
}

export const ValidUserHeader: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...InvalidUserHeader.args,
    AccountMenuProps: {
      AccountPopoverProps: {
        MenuItemsProps: {
          menuItems: [
            {
              label: 'Settings',
              onClick: () => console.log('Settings clicked'),
            },
          ],
        },
      },
    },
  },
}

export const ValidUserHeaderWithAdditionalComponent: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...ValidUserHeader.args,
    AccountMenuProps: {
      additionalComponent: <SendMessageIcon />,
    },
  },
}

export const CustomAccountMenuHeader: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...ValidUserHeader.args,
    AccountMenu: () => (
      <div style={{ width: '100%', justifyContent: 'end', display: 'flex' }}>
        Custom AccountMenu
      </div>
    ),
  },
}
