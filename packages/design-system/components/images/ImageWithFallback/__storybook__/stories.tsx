import { Meta, StoryFn, StoryObj } from '@storybook/react'

import ImageWithFallback from '..'
import { ImageWithFallbackProps } from '../types'

const meta: Meta = {
  title: '@baseapp-frontend | designSystem/Images/ImageWithFallback',
  component: ImageWithFallback,
}

export default meta

type Story = StoryObj<ImageWithFallbackProps>

const Template: StoryFn<ImageWithFallbackProps> = (args) => <ImageWithFallback {...args} />

export const Default: Story = Template.bind({})
Default.args = {
  src: '/webp/home-banner.webp',
  fallbackSrc: '/png/home-banner.png',
  alt: 'Example image',
  width: 400,
  height: 300,
}
