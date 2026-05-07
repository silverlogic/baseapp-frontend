import { ComponentType } from 'react'

import { Box, BoxProps, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container: ComponentType<BoxProps> = styled(Box)(({ theme }) => ({
  display: 'grid',
  borderRadius: 8,
  border: `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
  width: '100%',
  '&:hover, &:focus-within': {
    transition: 'border-color 0.25s ease',
    borderColor: theme.palette.text.primary,
  },
}))

export const OutsideReplyContainer: ComponentType<BoxProps> = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: 'transparent',
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(1.5, 1.5, 0, 1.5),
}))

export const ActionsContainer: ComponentType<BoxProps> = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1.5, 1.5),
}))

export const ReplyContainer: ComponentType<BoxProps> = styled(Box)(({ theme }) => ({
  borderRadius: 6,
  display: 'grid',
  gap: theme.spacing(0.5),
  gridTemplateColumns: 'repeat(3, max-content)',
}))
