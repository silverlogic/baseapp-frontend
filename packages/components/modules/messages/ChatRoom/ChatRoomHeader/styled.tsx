import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { ChatTitleContainerProps } from './types'

export const ChatHeaderContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  borderRadius: 0,
  display: 'grid',
  gap: 0,
  gridTemplateColumns: 'min-content 1fr',
  height: '56px',
  padding: `0 ${theme.spacing(2)}`,
  width: '100%',
  [theme.breakpoints.down('md')]: {
    borderTop: `1px ${theme.palette.divider} solid`,
  },
}))

export const ChatTitleContainer = styled(Box)<ChatTitleContainerProps>(
  ({ theme, isClickable }) => ({
    alignItems: 'center',
    display: 'grid',
    gap: theme.spacing(1.5),
    gridTemplateColumns: 'min-content 1fr',
    height: '56px',
    padding: 0,
    width: '100%',
    cursor: isClickable ? 'pointer' : 'auto',
  }),
)

export const BackButtonContainer = styled(Box)(({ theme }) => ({
  paddingRight: theme.spacing(2),
}))
