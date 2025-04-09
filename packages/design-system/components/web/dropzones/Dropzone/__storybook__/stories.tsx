import { Meta, StoryObj } from '@storybook/react'

import Dropzone from '..'
import { DropzoneProps } from '../types'

const meta: Meta<DropzoneProps> = {
  title: '@baseapp-frontend | designSystem/Dropzones/Dropzone',
  component: Dropzone,
}

export default meta

type Story = StoryObj<DropzoneProps>

export const Default: Story = {
  args: {
    accept: { 'image/svg+xml': ['.svg'] },
    actionText: 'Upload SVG',
    maxFileSize: 15,
    subTitle: 'Max. File Size: 15MB',
    storedImg: undefined,
    multiple: false,
    asBase64: true,
  },
}

export const WithStoredImage: Story = {
  args: {
    ...Default.args,
    storedImg: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
  },
}

export const FileTooLarge: Story = {
  args: {
    ...Default.args,
    maxFileSize: 0.0001,
    subTitle: 'Max. File Size: 0.0001MB',
  },
}

export const MultipleFileTypes: Story = {
  args: {
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    actionText: 'Upload Images',
    maxFileSize: 10,
    subTitle: 'Supports JPG, JPEG, and PNG. Max. File Size: 10MB',
  },
}
