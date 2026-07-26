'use client'

import type { FC } from 'react'

import { Box, Stack, Typography } from '@mui/material'

import type { FileChipProps } from './types'

/**
 * Presentational attachment chip matching the Figma comment design: a compact
 * bordered card with a 40×40 thumbnail, the file name, a secondary line
 * (type label or progress), and a trailing action slot. Data-agnostic — the
 * uploading and attached items feed it their own thumbnail/subtitle/action.
 */
const FileChip: FC<FileChipProps> = ({ thumbnail, name, subtitle, action, fixedWidth = false }) => (
  <Stack
    direction="row"
    spacing={1}
    alignItems="center"
    sx={{
      p: 1,
      borderRadius: 1.5,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'grey.100',
      width: fixedWidth ? 196 : 'auto',
      maxWidth: 232,
      flexShrink: 0,
    }}
  >
    {thumbnail}
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography variant="body2" noWrap title={name ?? undefined}>
        {name}
      </Typography>
      {subtitle}
    </Box>
    {action}
  </Stack>
)

export default FileChip
export type { FileChipProps } from './types'
