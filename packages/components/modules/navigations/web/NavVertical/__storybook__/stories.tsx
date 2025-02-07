import { BaseAppLogoCondensed } from '@baseapp-frontend/design-system/components/web/icons'

import { Meta, StoryObj } from '@storybook/react'

import NavVertical from '..'
import { navDataMock } from '../../../../../.storybook/__mocks__/navigation'
import defaultTheme from '../../../../../.storybook/__mocks__/theme'
import { NavVerticalProps } from '../types'

const meta: Meta<typeof NavVertical> = {
  title: '@baseapp-frontend | components/Navigation/NavVertical',
  component: NavVertical,
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
