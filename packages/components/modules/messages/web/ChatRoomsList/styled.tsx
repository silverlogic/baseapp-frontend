import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ChatRoomListContainer = styled(Box)(() => ({
  display: 'grid',
  gridTemplateRows: 'min-content min-content auto',
  height: '100%',
  width: '100%',
}))
