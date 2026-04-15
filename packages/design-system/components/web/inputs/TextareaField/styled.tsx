import { ComponentType } from 'react'

import { styled } from '@mui/material/styles'

import { PureTextField } from '../TextField'
import { TextareaFieldProps } from './types'

export const Textarea: ComponentType<TextareaFieldProps> = styled(
  PureTextField,
)<TextareaFieldProps>(({ theme, hideBorder, resizable }) => ({
  '& .MuiInputBase-root': {
    padding: '12px 0 4px 0',
  },
  '& .MuiInputBase-input': {
    ...theme.typography.body1,
    padding: theme.spacing(1),
  },
  ...(hideBorder && {
    '& fieldset': {
      border: 'none',
    },
  }),
  '& textarea': {
    '&::-webkit-scrollbar': {
      backgroundColor: 'transparent',
      borderRadius: 12,
      width: 14,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[600],
      border: `4px solid ${theme.palette.common.white}`,
      borderRadius: 12,
    },
    ...(resizable && {
      resize: 'vertical',
      '&::-webkit-scrollbar-corner': {
        backgroundColor: 'transparent',
        border: 'none',
      },
    }),
  },
}))
