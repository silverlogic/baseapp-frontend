import { Box, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'

export const MainContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'grid',
  width: '100%',
  maxWidth: '64px',
  gridTemplateRows: 'auto auto',
  gridTemplateColumns: 'min-content',
  gap: theme.spacing(0.5),
  margin: theme.spacing(1),
}))

export const RemoveMemberButton = styled(IconButton)({
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 1,
})
