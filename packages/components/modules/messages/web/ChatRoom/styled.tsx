import { Box } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

export const ChatRoomContainer = styled(Box)(() => ({
  display: 'grid',
  gridTemplateRows: 'min-content 1fr',
  height: '100%',
  width: '100%',
}))

export const ChatBodyContainer = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  borderTop: `1px ${theme.palette.divider} solid`,
  borderRadius: 0,
  borderBottomRightRadius: theme.spacing(2),
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateRows: '1fr min-content',
  height: '100%',
  paddingLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.down('md')]: {
    borderBottomRightRadius: 0,
  },
}))
