import { Box } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

export const ChatRoomContainer = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  border: `1px solid ${theme.palette.grey[200]}`,
  borderTopLeftRadius: 0,
  borderTopRightRadius: theme.spacing(2),
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: theme.spacing(2),
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateRows: '1fr min-content',
  height: '100%',
  paddingLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.down('md')]: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
}))
