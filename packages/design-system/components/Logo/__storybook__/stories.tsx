import { Meta, StoryObj } from '@storybook/react'

import Logo from '..'
import { BaseAppLogoCondensed } from '../../icons'
import { LogoProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/General/Logo',
  component: Logo,
} as Meta<LogoProps>

type Story = StoryObj<LogoProps>

export const Default: Story = {
  args: {
    disabledLink: false,
    children: <BaseAppLogoCondensed />,
  },
}

export const DisabledLink: Story = {
  args: {
    disabledLink: true,
    children: <BaseAppLogoCondensed />,
  },
}
