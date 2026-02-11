import React from 'react'

import { Meta, StoryFn, StoryObj } from '@storybook/react'

import LazyLoadImage from '..'
import { LazyLoadImageProps } from '../types'

const meta: Meta = {
  title: '@baseapp-frontend-template / Design System/Displays/LazyLoadImage',
  component: LazyLoadImage,
}

export default meta

type Story = StoryObj<LazyLoadImageProps>

const Template: StoryFn<LazyLoadImageProps> = (args: any) => <LazyLoadImage {...args} />

export const Default: Story = Template.bind({})
Default.args = {
  src: '/png/home-banner.png',
  alt: 'Example lazy-loaded image',
  ratio: '16/9',
  width: 200,
  height: 225,
  overlay: 'rgba(0, 0, 0, 0.5)',
  disabledEffect: false,
}
