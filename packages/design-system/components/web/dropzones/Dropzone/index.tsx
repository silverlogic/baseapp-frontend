'use client'

import { FC, useState } from 'react'

import { getImageString, useNotification } from '@baseapp-frontend/utils'

import {
  AddRounded as AddRoundedIcon,
  InsertPhotoOutlined as InsertPhotoOutlinedIcon,
} from '@mui/icons-material'
import { Button, Card, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'

import DropzonePreview from './DropzonePreview'
import {
  AddFileButton,
  AddFileWrapper,
  ButtonContainer,
  CancelIcon,
  DropzoneContainer,
  DropzoneText,
  InputContainer,
} from './styled'
import { DropzoneProps } from './types'

const Dropzone: FC<DropzoneProps> = ({
  accept,
  storedImg,
  onSelect,
  onRemove,
  includeActionButton = false,
  actionText = 'Upload Image',
  maxFileSize = 15,
  title,
  subTitle = `Max. File Size: ${maxFileSize}MB`,
  DropzoneOptions,
  InputProps,
  InputContainerStyle,
  multiple = false,
  asBase64 = true,
  onFileClick,
}) => {
  const [files, setFiles] = useState<DropzoneProps['storedImg']>(storedImg)
  const { sendToast } = useNotification()

  const { open, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0 || !acceptedFiles[0]) return
      if ((acceptedFiles[0]?.size || 0) > maxFileSize * 1024 * 1024) {
        sendToast(`This file is too large (max ${maxFileSize} MB).`, { type: 'error' })
        return
      }

      if (multiple) {
        const resultingFiles = await Promise.all(
          acceptedFiles.map(async (f) => (asBase64 ? getImageString(f) : f)),
        )
        const newFiles = [...((files || []) as File[]), ...resultingFiles]
        setFiles(newFiles as any)
        onSelect(newFiles as any)
      } else {
        const file = asBase64 ? await getImageString(acceptedFiles[0]) : acceptedFiles[0]
        if (!file) return

        setFiles(file)
        onSelect(file as any)
      }
    },
    ...DropzoneOptions,
  })

  const handleRemove = (index?: number) => {
    if (multiple) {
      const updatedFiles = (files as File[])?.filter((file, i) => i !== index)
      setFiles(updatedFiles)
      onRemove(index)
    } else {
      setFiles(undefined)
      onRemove()
    }
  }

  const hasFiles = Boolean((!multiple && files) || (multiple && (files as [])?.length))

  const renderContent = () => {
    const ariaLabel = 'Drag and drop files to upload'

    return (
      <div className="container w-full max-w-none">
        {!hasFiles && (
          <InputContainer
            {...getRootProps({ isFocused, isDragAccept, isDragReject })}
            style={InputContainerStyle}
          >
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
                <InsertPhotoOutlinedIcon
                  sx={{
                    width: '36px',
                    height: '36px',
                    marginBottom: '4px',
                    color: 'text.secondary',
                  }}
                />
                <Typography textAlign="center" variant="body2" color="text.primary">
                  {title || (
                    <>
                      <DropzoneText>Click to browse</DropzoneText> or drag and drop.
                    </>
                  )}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {subTitle}
                </Typography>
              </>
            )}
          </InputContainer>
        )}
        {!!(files as [])?.length && multiple && (
          <DropzoneContainer
            gap={0.75}
            {...getRootProps({ isFocused, isDragAccept, isDragReject })}
          >
            <AddFileWrapper>
              <AddFileButton color="inherit">
                <AddRoundedIcon sx={{ width: '28px', height: '28px', color: 'text.primary' }} />
              </AddFileButton>
            </AddFileWrapper>
            <input {...getInputProps()} aria-label={ariaLabel} {...InputProps} />
            {(files as unknown as [])?.map((file, index) => (
              <DropzonePreview
                onFileClick={(selectedFile) => onFileClick?.(selectedFile, index)}
                file={file}
                key={`${(file as File)?.name}_${index}`}
                handleRemoveFile={() => handleRemove(index)}
              />
            ))}
          </DropzoneContainer>
        )}

        {files && !multiple && (
          <Card>
            <input {...getInputProps()} aria-label={ariaLabel} {...InputProps} />

            <DropzonePreview
              onFileClick={onFileClick}
              isMini={false}
              file={files as string | File}
              handleRemoveFile={() => handleRemove()}
            />
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-rows-[1fr_min-content] gap-4">
      {renderContent()}
      {includeActionButton && (
        <ButtonContainer>
          <Button variant="outlined" color="inherit" onClick={open} disableRipple type="button">
            {actionText}
          </Button>
          {files && (
            <Button variant="text" color="error" onClick={() => handleRemove()}>
              Remove
            </Button>
          )}
        </ButtonContainer>
      )}
    </div>
  )
}

export default Dropzone
