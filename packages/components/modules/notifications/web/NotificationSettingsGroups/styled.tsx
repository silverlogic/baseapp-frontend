import { Box, TableCell } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SettingsContainer = styled(Box)(() => ({
  overflowX: 'auto',
  width: '100%',
}))

export const ChannelCell = styled(TableCell)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  textAlign: 'center',
  whiteSpace: 'nowrap',
  width: theme.spacing(12),
}))
