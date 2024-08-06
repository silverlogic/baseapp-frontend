import { Meta, StoryObj } from '@storybook/react'

import NavVertical from '..'
import ProjectLogoCondensed from '../../Header/__storybook__/ProjectLogoCondensed'
import { navDataMock, themeSettingsMock } from '../../Header/__storybook__/navigationMocks'
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
}
export default meta

type Story = StoryObj<NavVerticalProps>

export const DefaultNavVertical: Story = {
  args: {
    navData: navDataMock,
    settings: themeSettingsMock,
    LogoIcon: ProjectLogoCondensed,
    openNav: false,
    hideToggleButton: true,
  },
}
