import type { Meta, StoryObj } from '@storybook/react'

import { ImageUploaderField } from '.'

const images = [
  {
    id: 1,
    imagePreviewUrl: 'https://avatars.githubusercontent.com/u/12210090?s=280&v=4',
    file: {
      name: 'TheSilverLogic Logo',
    },
  },
]

const meta: Meta<typeof ImageUploaderField> = {
  title: 'Img Uploader',
  component: ImageUploaderField,
}
export default meta

type Story = StoryObj<typeof ImageUploaderField>

export const ImageUploader: Story = {
  args: {
    images,
  },
}
