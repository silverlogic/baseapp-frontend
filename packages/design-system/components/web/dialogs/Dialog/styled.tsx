import { ComponentType } from 'react'

import { Dialog as MUIDialog } from '@mui/material'
import { styled } from '@mui/material/styles'

import { DialogProps } from './types'

// Dialog-only props that must never reach MUI's Dialog (and from there the DOM).
const NON_FORWARDED_PROPS = new Set<PropertyKey>([
  'customMaxWidth',
  'closeButtonLabel',
  'CloseButtonProps',
])

export const StyledDialog: ComponentType<DialogProps> = styled(MUIDialog, {
  shouldForwardProp: (prop) => !NON_FORWARDED_PROPS.has(prop),
})<DialogProps>(({ customMaxWidth }) => ({
  '& .MuiDialog-paper': {
    position: 'relative',
    ...(customMaxWidth && {
      maxWidth: customMaxWidth,
    }),
  },
}))
