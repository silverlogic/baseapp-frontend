import { Meta, StoryObj } from '@storybook/react'

import Header from '..'
import { HeaderProps } from '../types'
import ProjectLogoCondensed from './ProjectLogoCondensed'
import { themeSettingsMock } from './navigationMocks'

const meta: Meta<typeof Header> = {
  title: '@baseapp-frontend | components/Navigation/Header',
  component: Header,
  argTypes: {
    settings: { control: 'object' },
    onOpenNav: { action: 'onOpenNav' },
    LogoIcon: { control: 'object' },
    AccountMenu: { control: 'object' },
    AccountMenuProps: { control: 'object' },
    ToolbarProps: { control: 'object' },
    additionalComponent: { control: 'object' },
    children: { control: 'object' },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<HeaderProps>

export const DefaultHeader: Story = {
  parameters: {
    userType: 'invalid',
  },
  args: {
    settings: {
      ...themeSettingsMock,
      themeLayout: 'centered',
    },
    onOpenNav: () => {},
    LogoIcon: ProjectLogoCondensed,
    AccountMenuProps: {
      onRegisterClick: () => console.log('Register clicked'),
      onLoginClick: () => console.log('Login clicked'),
    },
  },
}

export const AuthenticatedUserHeader: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...DefaultHeader.args,
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

export const CustomAccountMenuHeader: Story = {
  parameters: {
    userType: 'valid',
  },
  args: {
    ...DefaultHeader.args,
    AccountMenu: () => <div>Custom AccountMenu</div>,
  },
}
