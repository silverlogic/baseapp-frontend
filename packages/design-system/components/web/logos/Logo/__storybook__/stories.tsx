import { ComponentType } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import Logo from '..'
import BaseAppLogoCondensed from '../../../icons/BaseAppLogoCondensed'
import { LogoProps } from '../types'

const meta: Meta<LogoProps> = {
  title: '@baseapp-frontend | designSystem/Popvers/Logo',
  component: Logo as ComponentType<LogoProps>,
}

export default meta

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
