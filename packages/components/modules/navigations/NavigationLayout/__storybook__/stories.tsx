import { Meta, StoryObj } from '@storybook/react'

import NavigationLayout from '..'
import ProjectLogoCondensed from '../../Header/__storybook__/ProjectLogoCondensed'
import { navDataMock, themeSettingsMock } from '../../Header/__storybook__/navigationMocks'
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
    additionalComponent: { control: 'object' },
    children: { control: 'text' },
  },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<NavigationLayoutProps>

export const DefaultNavigationLayout: Story = {
  parameters: {
    userType: 'invalid',
  },
  args: {
    navData: navDataMock,
    settings: themeSettingsMock,
    setSettings: () => {},
    LogoIcon: ProjectLogoCondensed,
    AccountMenuProps: {
      onRegisterClick: () => console.log('Register clicked'),
      onLoginClick: () => console.log('Login clicked'),
    },
  },
}

export const AuthenticatedUserNavigationLayout: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...DefaultNavigationLayout.args,
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

export const CustomAccountMenuNavigationLayout: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...DefaultNavigationLayout.args,
    AccountMenu: () => <div>Custom AccountMenu</div>,
  },
}
