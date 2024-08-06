import { Meta, StoryObj } from '@storybook/react'

import NavMini from '..'
import ProjectLogoCondensed from '../../Header/__storybook__/ProjectLogoCondensed'
import { navDataMock, themeSettingsMock } from '../../Header/__storybook__/navigationMocks'
import { NavMiniProps } from '../types'

const meta: Meta<typeof NavMini> = {
  title: '@baseapp-frontend | components/Navigation/NavMini',
  component: NavMini,
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
}
export default meta

type Story = StoryObj<NavMiniProps>

export const DefaultNavMini: Story = {
  args: {
    navData: navDataMock,
    settings: themeSettingsMock,
    LogoIcon: ProjectLogoCondensed,
    openNav: false,
    hideToggleButton: true,
  },
}
