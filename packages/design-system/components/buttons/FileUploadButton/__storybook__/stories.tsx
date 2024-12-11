import React from 'react'

import { Meta, StoryFn } from '@storybook/react'
import { useForm } from 'react-hook-form'

import FileUploadButton from '..'
import { FileUploadButtonProps } from '../types'

export default {
  title: '@baseapp-frontend | designSystem/Buttons/FileUploadButton',
  component: FileUploadButton,
} as Meta

const Template: StoryFn<FileUploadButtonProps> = (args) => {
  const { control, setValue } = useForm()

  const setFile = (name: string, file: File) => {
    setValue(name, file, {
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  return <FileUploadButton {...args} control={control} setFile={setFile} />
}

export const Default: StoryFn<FileUploadButtonProps> = Template.bind({})
Default.args = {
  label: 'Upload File',
  name: 'file',
}
