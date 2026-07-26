'use client'

import type { FC } from 'react'

import { Box, Stack } from '@mui/material'

import { useFileUpload } from '../../common/context/useFileUpload'
import UploadingFileItem from '../FileUploadList/UploadingFileItem'
import type { UploadingFilesListProps } from './types'

/**
 * Renders in-progress uploads for a single scope from the shared upload store,
 * without needing an attached-files target. Used by composers (e.g. comment
 * create) that upload before their target exists.
 */
const UploadingFilesList: FC<UploadingFilesListProps> = ({
  scope,
  allowRemove = true,
  allowRetry = true,
  variant = 'chips',
  layout = 'horizontal',
}) => {
  const { files } = useFileUpload()

  const uploadingFiles = Array.from(files.values()).filter((file) => file.scope === scope)

  if (!uploadingFiles.length) {
    return null
  }

  const itemVariant = variant === 'chips' ? 'chip' : 'card'
  const isHorizontal = layout === 'horizontal'

  const items = uploadingFiles.map((file) => (
    <UploadingFileItem
      key={file.id}
      fileProgress={file}
      allowRemove={allowRemove}
      allowRetry={allowRetry}
      variant={itemVariant}
    />
  ))

  return (
    <Box sx={{ mt: 1 }}>
      {isHorizontal ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, overflowX: 'auto' }}>{items}</Box>
      ) : (
        <Stack spacing={1}>{items}</Stack>
      )}
    </Box>
  )
}

export default UploadingFilesList
export type { UploadingFilesListProps } from './types'
