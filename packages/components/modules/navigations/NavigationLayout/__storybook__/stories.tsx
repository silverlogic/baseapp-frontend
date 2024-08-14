import { BaseAppLogoCondensed, SendMessageIcon } from '@baseapp-frontend/design-system'

import { Meta, StoryObj } from '@storybook/react'

import NavigationLayout from '..'
import { navDataMock } from '../../../../.storybook/__mocks__/navigation'
import defaultTheme from '../../../../.storybook/__mocks__/theme'
import { withTokenSetup } from '../../../../.storybook/decorators'
import { NavigationLayoutProps } from '../types'

const meta: Meta<typeof NavigationLayout> = {
  title: '@baseapp-frontend | components/Navigation/NavigationLayout',
  component: NavigationLayout,
  argTypes: {
    navData: { control: 'object' },
    settings: { control: 'object' },
    setSettings: { action: 'setSettings' },
    LogoIcon: { control: false },
    AccountMenu: { control: false },
    AccountMenuProps: { control: 'object' },
    ToolbarProps: { control: 'object' },
    children: {
      control: false,
      description: 'Page content.',
      table: { type: { summary: 'ReactNode' } },
    },
  },
  tags: ['autodocs'],
  decorators: [withTokenSetup],
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta

type Story = StoryObj<NavigationLayoutProps>

export const InvalidUser: Story = {
  parameters: {
    userType: 'invalid',
  },
  args: {
    navData: navDataMock,
    settings: defaultTheme.settings,
    setSettings: () => {},
    LogoIcon: BaseAppLogoCondensed,
    AccountMenuProps: {
      onRegisterClick: () => console.log('Register clicked'),
      onLoginClick: () => console.log('Login clicked'),
    },
  },
}

export const ValidUser: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...InvalidUser.args,
    AccountMenuProps: {
      menuItems: [
        {
          label: 'Settings',
          onClick: () => console.log('Settings clicked'),
        },
      ],
    },
  },
}

export const ValidUserWithAdditionalComponent: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...ValidUser.args,
    AccountMenuProps: {
      additionalComponent: <SendMessageIcon />,
    },
  },
}

export const CustomAccountMenu: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...ValidUser.args,
    AccountMenu: () => (
      <div style={{ width: '100%', justifyContent: 'end', display: 'flex' }}>
        Custom AccountMenu
      </div>
    ),
  },
}

export const NavMini: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...ValidUser.args,
    settings: {
      ...defaultTheme.settings,
      themeLayout: 'mini',
    },
  },
}

export const NavHorizontal: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...ValidUser.args,
    settings: {
      ...defaultTheme.settings,
      themeLayout: 'horizontal',
    },
  },
}

export const NavCentered: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...ValidUser.args,
    settings: {
      ...defaultTheme.settings,
      themeLayout: 'centered',
    },
  },
}
