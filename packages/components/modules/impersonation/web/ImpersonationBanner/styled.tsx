import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const BannerContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar + 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1, 2),
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.warning.main,
  color: theme.palette.warning.contrastText,
}))
