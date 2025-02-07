import { Meta, StoryObj } from '@storybook/react'

import NavCentered from '..'
import { navDataMock } from '../../../../../.storybook/__mocks__/navigation'
import { NavCenteredProps } from '../types'

const meta: Meta<typeof NavCentered> = {
  title: '@baseapp-frontend | components/Navigation/NavCentered',
  component: NavCentered,
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta

type Story = StoryObj<NavCenteredProps>

export const DefaultNavCentered: Story = {
  args: {
    navData: navDataMock,
    openNav: false,
  },
}
