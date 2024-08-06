import { Meta, StoryObj } from '@storybook/react'

import NavCentered from '..'
import { navDataMock } from '../../Header/__storybook__/navigationMocks'
import { NavCenteredProps } from '../types'

const meta: Meta<typeof NavCentered> = {
  title: '@baseapp-frontend | components/Navigation/NavCentered',
  component: NavCentered,
  argTypes: {
    navData: { control: 'object' },
    openNav: { control: 'boolean' },
    onCloseNav: { action: 'onCloseNav' },
  },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<NavCenteredProps>

export const DefaultNavCentered: Story = {
  args: {
    navData: navDataMock,
    openNav: false,
  },
}
