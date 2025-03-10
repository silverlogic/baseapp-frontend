import { Meta, StoryObj } from '@storybook/react'

import NavHorizontal from '..'
import { navDataMock } from '../../../../../.storybook/__mocks__/navigation'
import { NavHorizontalProps } from '../types'

const meta: Meta<typeof NavHorizontal> = {
  title: '@baseapp-frontend | components/Navigation/NavHorizontal',
  component: NavHorizontal,
}
export default meta

type Story = StoryObj<NavHorizontalProps>

export const DefaultNavHorizontal: Story = {
  args: {
    navData: navDataMock,
    openNav: false,
  },
}
