import { BaseAppLogoCondensed } from '@baseapp-frontend/design-system'

import { Meta, StoryObj } from '@storybook/react'

import NavVertical from '..'
import { navDataMock } from '../../../../.storybook/__mocks__/navigation'
import defaultTheme from '../../../../.storybook/__mocks__/theme'
import { NavVerticalProps } from '../types'

const meta: Meta<typeof NavVertical> = {
  title: '@baseapp-frontend | components/Navigation/NavVertical',
  component: NavVertical,
  argTypes: {
    navData: { control: 'object' },
    settings: { control: 'object' },
    setSettings: { action: 'setSettings' },
    LogoIcon: { control: false },
    openNav: { control: 'boolean' },
    onCloseNav: { action: 'onCloseNav' },
    hideToggleButton: { control: 'boolean' },
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta

type Story = StoryObj<NavVerticalProps>

export const DefaultNavVertical: Story = {
  args: {
    navData: navDataMock,
    settings: defaultTheme.settings,
    LogoIcon: BaseAppLogoCondensed,
    openNav: false,
    hideToggleButton: true,
  },
}
