'use client'

import { FC, useState } from 'react'

import { Dropzone } from '@baseapp-frontend/design-system/components/web/dropzones'

import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import { PostImageDropzoneProps } from './types'

const PostImageDropzone: FC<PostImageDropzoneProps> = ({ form }) => {
  const [selectedPreview, setSelectedPreview] = useState<File>()
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState<number>()

  const { watch } = form

  const formFiles = watch('images')

  const handleRemoveFile = (fileIndex?: number) => {
    const updatedFiles = formFiles?.filter((_, index) => index !== fileIndex)
    form.setValue('images', updatedFiles || [], { shouldValidate: true })

    if (selectedPreviewIndex === fileIndex) {
      setSelectedPreview(undefined)
      setSelectedPreviewIndex(undefined)
    }
  }

  const onSelect = (files: (File | Blob)[]) => {
    if (files.length) {
      form.setValue('images', [...(formFiles || []), ...(files as File[])])
    }
  }

  return (
    <Box>
      {selectedPreview && (
        <Box width="100%" position="relative" height="500px" mb="24px">
          <Image
            src={URL.createObjectURL(selectedPreview)}
            alt={selectedPreview.name}
            fill
            style={{ objectFit: 'cover', borderRadius: '8px', height: '100%', width: '100%' }}
            onLoad={() => URL.revokeObjectURL(URL.createObjectURL(selectedPreview))}
          />
        </Box>
      )}
      <Dropzone
        onSelect={onSelect}
        includeActionButton={false}
        maxFileSize={15}
        onRemove={handleRemoveFile}
        InputContainerStyle={{ backgroundColor: 'transparent' }}
        asBase64={false}
        multiple
        accept={{ 'image/png': ['.png'], 'image/gif': ['.gif'], 'image/jpeg': ['.jpg', '.jpeg'] }}
        title={
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Click to browse or drag and drop images and videos.
          </Typography>
        }
        onFileClick={(selectedFile, index) => {
          setSelectedPreview(selectedFile as File)
          setSelectedPreviewIndex(index)
        }}
      />
    </Box>
  )
}

export default PostImageDropzone
