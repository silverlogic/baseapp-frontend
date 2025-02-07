import { ComponentType } from 'react'

import { Dialog as MUIDialog } from '@mui/material'
import { styled } from '@mui/material/styles'

import { DialogProps } from './types'

export const StyledDialog: ComponentType<DialogProps> = styled(MUIDialog)<DialogProps>(
  ({ customMaxWidth }) => ({
    '& .MuiDialog-paper': {
      position: 'relative',
      ...(customMaxWidth && {
        maxWidth: customMaxWidth,
      }),
    },
  }),
)
