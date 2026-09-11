import { Button } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

// mirrors NotificationsButton's mini pattern; kept separate because the
// fallback's original tailwind gap-2 (8px) differs from NotificationsButton's
// sx gap (theme.spacing(2) = 16px) — reusing NotificationsButton verbatim
// would double the gap in this loading state
export const NotificationsFallbackContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'mini',
})<{ mini?: boolean }>(({ theme, mini }) => ({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  justifyContent: 'flex-start',
  width: '100%',
  ...(mini && {
    gap: 0,
    justifyContent: 'center',
  }),
}))

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
