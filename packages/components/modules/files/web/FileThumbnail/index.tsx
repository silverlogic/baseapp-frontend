'use client'

import type { FC } from 'react'

import {
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Videocam as VideoIcon,
} from '@mui/icons-material'
import { Box } from '@mui/material'

import { getFileType, isImageFile } from '../../common/utils/formatters'
import type { FileThumbnailProps } from './types'

const getTypeIcon = (contentType?: string | null) => {
  switch (getFileType(contentType)) {
    case 'image':
      return <ImageIcon fontSize="small" sx={{ color: 'common.white' }} />
    case 'video':
      return <VideoIcon fontSize="small" sx={{ color: 'common.white' }} />
    case 'pdf':
      return <PdfIcon fontSize="small" sx={{ color: 'common.white' }} />
    default:
      return <FileIcon fontSize="small" sx={{ color: 'common.white' }} />
  }
}

/**
 * 40×40 (default) file thumbnail matching the Figma attachment chip: an image
 * preview when available, otherwise a primary-colored tile with a type icon.
 */
const FileThumbnail: FC<FileThumbnailProps> = ({ src, contentType, alt, size = 40 }) => {
  const showImage = Boolean(src) && isImageFile(contentType)

  if (showImage) {
    return (
      <Box
        component="img"
        src={src as string}
        alt={alt ?? 'File preview'}
        sx={{
          width: size,
          height: size,
          objectFit: 'cover',
          borderRadius: 1.5,
          flexShrink: 0,
        }}
      />
    )
  }

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: 1.5,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'primary.main',
      }}
    >
      {getTypeIcon(contentType)}
    </Box>
  )
}

export default FileThumbnail
export type { FileThumbnailProps } from './types'
