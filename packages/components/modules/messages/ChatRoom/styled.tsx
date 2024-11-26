import { Box } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

import { HEADER } from '../../navigations/constants'

export const ChatRoomContainer = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: 8,
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateRows: '1fr min-content',
  height: '100%',
  paddingLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.down('lg')]: {
    height: `calc(100vh - ${HEADER.H_DESKTOP}px)`,
  },
}))
