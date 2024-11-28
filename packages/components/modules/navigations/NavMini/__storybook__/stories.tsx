import { BaseAppLogoCondensed } from '@baseapp-frontend/design-system'

import { Meta, StoryObj } from '@storybook/react'

import NavMini from '..'
import { navDataMock } from '../../../../.storybook/__mocks__/navigation'
import defaultTheme from '../../../../.storybook/__mocks__/theme'
import { NavMiniProps } from '../types'

const meta: Meta<typeof NavMini> = {
  title: '@baseapp-frontend | components/Navigation/NavMini',
  component: NavMini,
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta

type Story = StoryObj<NavMiniProps>

export const DefaultNavMini: Story = {
  args: {
    navData: navDataMock,
    settings: defaultTheme.settings,
    LogoIcon: BaseAppLogoCondensed,
    openNav: false,
    hideToggleButton: true,
  },
}
