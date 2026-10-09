'use client'

import { ChangeEventHandler, FC, useRef } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import { Button, Input } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { FileUploadButtonProps } from './types'

const FileUploadButton: FC<FileUploadButtonProps> = (props) => {
  const intl = useIntl()
  const fileRef = useRef<HTMLInputElement | undefined>(undefined)
  const { sendToast } = useNotification()
  const { accept, maxSize, control, label, name, setFile, ...buttonProps } = props

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        onClick={() => fileRef?.current?.click()}
        disableRipple
        {...buttonProps}
      >
        {label ??
          intl.formatMessage({
            id: 'designSystem.fileUploadButton.label',
            defaultMessage: 'Upload File',
          })}
      </Button>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const handleOnChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
            event,
          ) => {
            const { files } = event.target as HTMLInputElement
            if (files![0] && maxSize && files![0].size > maxSize) {
              sendToast(
                intl.formatMessage(
                  {
                    id: 'designSystem.fileUploadButton.fileTooLarge',
                    defaultMessage: 'This file is too large (max {maxSize}MB).',
                  },
                  { maxSize: maxSize / 1024 / 1024 },
                ),
                { type: 'error' },
              )
            } else {
              field.onChange(files![0])
              setFile(name, files![0], {
                shouldValidate: false,
                shouldDirty: true,
                shouldTouch: true,
              })
            }
          }
          return (
            <Input
              inputProps={{ ref: fileRef, accept }}
              value={field.value?.filename}
              onChange={handleOnChange}
              type="file"
              sx={{ display: 'none' }}
            />
          )
        }}
      />
    </>
  )
}

export default FileUploadButton
