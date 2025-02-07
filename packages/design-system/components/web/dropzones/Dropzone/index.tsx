'use client'

import React, { FC, useState } from 'react'

import { getImageString, useNotification } from '@baseapp-frontend/utils'

import { Box, Button, Card, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'

import {
  ButtonContainer,
  CancelIcon,
  DropzoneText,
  InputContainer,
  PortraitOutlinedIcon,
} from './styled'
import { DropzoneProps } from './types'

const Dropzone: FC<DropzoneProps> = ({
  accept,
  storedImg,
  onSelect,
  onRemove,
  actionText = 'Upload Image',
  maxFileSize = 15,
  subTitle = `Max. File Size: ${maxFileSize}MB`,
  DropzoneOptions,
  InputProps,
}) => {
  const [files, setFiles] = useState<string | undefined>(storedImg)
  const { sendToast } = useNotification()

  const { open, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept,
    onDrop: async (acceptedFiles: any) => {
      if (acceptedFiles.length === 0) return
      if (acceptedFiles[0].size > maxFileSize * 1024 * 1024) {
        sendToast(`This file is too large (max ${maxFileSize} MB).`, { type: 'error' })
        return
      }
      const imgString = await getImageString(acceptedFiles[0])
      if (!imgString) return
      setFiles(imgString)
      onSelect(imgString)
    },
    ...DropzoneOptions,
  })

  const handleRemove = () => {
    setFiles(undefined)
    onRemove()
  }

  const renderContent = () => {
    const ariaLabel = 'Drag and drop files to upload'

    if (files)
      return (
        <>
          <input {...getInputProps()} aria-label={ariaLabel} {...InputProps} />
          <Card>
            <Box p={2} display="flex" flexDirection="column" alignItems="center">
              <img
                key={files}
                src={files}
                alt="preview"
                style={{ maxHeight: '200px', maxWidth: '100%' }}
              />
            </Box>
          </Card>
        </>
      )

    return (
      <div className="container w-full max-w-none">
        <InputContainer {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <input {...getInputProps()} aria-label={ariaLabel} {...InputProps} />
          {isDragReject ? (
            <>
              <CancelIcon />
              <Typography variant="body2" color="error.main">
                File not accepted, please choose the correct type
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {subTitle}
              </Typography>
            </>
          ) : (
            <>
              <PortraitOutlinedIcon />
              <Typography textAlign="center" variant="body2" color="text.primary">
                <DropzoneText>Click to browse</DropzoneText> or drag and drop.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {subTitle}
              </Typography>
            </>
          )}
        </InputContainer>
      </div>
    )
  }

  return (
    <div className="grid grid-rows-[1fr_min-content] gap-4">
      {renderContent()}
      <ButtonContainer>
        <Button variant="outlined" color="inherit" onClick={open} disableRipple type="button">
          {actionText}
        </Button>
        {files && (
          <Button variant="text" color="error" onClick={handleRemove}>
            Remove
          </Button>
        )}
      </ButtonContainer>
    </div>
  )
}

export default Dropzone
