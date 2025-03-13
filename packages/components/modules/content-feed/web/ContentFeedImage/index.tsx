'use client'

import { ChangeEventHandler, useRef, useState } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { Controller, UseFormReturn } from 'react-hook-form'

import {
  AddFileButton,
  AddFileWrapper,
  ContentFeedImageContainer,
  DropFilesContainer,
  MiniatureFileWrapper,
  RemoveFileButton,
} from './styled'

interface IContentFeedImageProps {
  form: UseFormReturn<
    {
      content: string
      images: never[]
    },
    any,
    undefined
  >
}

const ContentFeedImage = ({ form }: IContentFeedImageProps) => {
  const [selectedUploadedFile, setSelectedUploadedFiles] = useState<File>()
  const [isDragging, setIsDragging] = useState(false)

  const DEFAULT_IMAGE_FORMATS = 'image/png, image/gif, image/jpeg'
  const DEFAULT_IMAGE_MAX_SIZE = 10 * 1024 * 1024

  const fileRef = useRef<HTMLInputElement>(null)
  const { sendToast } = useNotification()

  const { control, watch } = form

  const formFiles: File[] = watch('images')

  const handleRemoveFile = (fileIndex: number) => {
    const updatedFiles = formFiles?.filter((_, index) => index !== fileIndex)
    form.setValue('images', updatedFiles as never, { shouldValidate: true })
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const { files } = e.dataTransfer
    if (files.length) {
      form.setValue('images', [...(formFiles as never[]), ...(files as unknown as never[])])
    }
  }

  return (
    <Box
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {selectedUploadedFile && !isDragging && (
        <Box width="100%" position="relative" height="500px" mb="24px">
          <Image
            src={URL.createObjectURL(selectedUploadedFile)}
            alt={selectedUploadedFile.name}
            fill
            style={{ objectFit: 'cover', borderRadius: '8px', height: '100%', width: '100%' }}
            onLoad={() => URL.revokeObjectURL(URL.createObjectURL(selectedUploadedFile))}
          />
        </Box>
      )}

      {(isDragging || !formFiles?.length) && (
        <DropFilesContainer onClick={() => fileRef?.current?.click()}>
          <InsertPhotoOutlinedIcon
            sx={{ width: '36px', height: '36px', marginBottom: '4px', color: 'text.secondary' }}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Click to browse or drag and drop images and videos.
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Max. File Size: 15MB
          </Typography>
        </DropFilesContainer>
      )}

      <ContentFeedImageContainer gap={0.75}>
        {!!formFiles?.length && (
          <AddFileWrapper>
            <AddFileButton color="inherit" onClick={() => fileRef?.current?.click()} disableRipple>
              <AddRoundedIcon sx={{ width: '28px', height: '28px', color: 'text.primary' }} />
            </AddFileButton>
          </AddFileWrapper>
        )}
        <Controller
          name="images"
          control={control}
          render={({ field }) => {
            const handleOnChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
              event,
            ) => {
              const { files } = event.target as HTMLInputElement

              if (files) {
                // Convert FileList to an array of File objects
                const filesArray = Array.from(files)

                // Filter and process valid files
                const validFiles = filesArray.filter((file) => {
                  if (file.size > DEFAULT_IMAGE_MAX_SIZE) {
                    // Notify the user if the file is too large
                    sendToast(
                      `This file is too large (max ${DEFAULT_IMAGE_MAX_SIZE / 1024 / 1024}MB).`,
                      {
                        type: 'error',
                      },
                    )
                    return false // Exclude this file
                  }
                  return true // Include this file
                })

                // Update the form field with the valid files
                if (validFiles.length > 0) {
                  field.onChange([...formFiles, ...validFiles])
                }
              }
            }
            return (
              <input
                onChange={handleOnChange}
                type="file"
                multiple
                ref={fileRef}
                accept={DEFAULT_IMAGE_FORMATS}
                style={{ display: 'none' }}
              />
            )
          }}
        />
        {formFiles?.map((file, index) => (
          <MiniatureFileWrapper key={`${file.name}`}>
            <button
              style={{ height: '100%' }}
              type="button"
              onClick={() => setSelectedUploadedFiles(file)}
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={72}
                height={72}
                style={{ objectFit: 'cover', borderRadius: '8px', height: '100%' }}
                onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
              />
            </button>
            <RemoveFileButton onClick={() => handleRemoveFile(index)}>
              <CloseRoundedIcon sx={{ color: 'white', width: '20px', height: '20px' }} />
            </RemoveFileButton>
          </MiniatureFileWrapper>
        ))}
      </ContentFeedImageContainer>
    </Box>
  )
}

export default ContentFeedImage
