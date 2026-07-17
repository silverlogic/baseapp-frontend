import { Button } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

export const NotificationsButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'mini',
})<{ mini?: boolean }>(({ theme, mini }) => ({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  justifyContent: 'start',
  padding: theme.spacing(1),
  width: '100%',
  ...(mini && {
    alignItems: 'center',
    gap: 0,
    justifyContent: 'center',
    padding: theme.spacing(0.5),
  }),
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[500], 0.08),
  },
}))
