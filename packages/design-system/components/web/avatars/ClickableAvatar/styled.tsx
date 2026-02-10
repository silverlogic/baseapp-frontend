'use client'

import { ExtendButtonBase, IconButton, IconButtonTypeMap } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

import { CustomIconButtonProps } from './types'

export const IconButtonStyled = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isOpen' && prop !== 'width' && prop !== 'height',
})<CustomIconButtonProps>(({ theme, isOpen, width, height }) => ({
  width: width + 4,
  height: height + 4,
  background: alpha(theme.palette.grey[500], 0.08),
  ...(isOpen && {
    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  }),
})) as ExtendButtonBase<IconButtonTypeMap<CustomIconButtonProps, 'button'>>
