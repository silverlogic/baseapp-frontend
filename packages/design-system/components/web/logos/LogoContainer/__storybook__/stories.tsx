import { ComponentType } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import Logo from '..'
import BaseAppLogoCondensed from '../../../icons/BaseAppLogoCondensed'
import { LogoContainerProps } from '../types'

const meta: Meta<LogoContainerProps> = {
  title: '@baseapp-frontend | designSystem/Popvers/LogoContainer',
  component: Logo as ComponentType<LogoContainerProps>,
}

export default meta

type Story = StoryObj<LogoContainerProps>

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
