import { MenuItem, alpha, styled } from '@mui/material'

import { ProfileMenuItemProps } from './types'

export const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})<ProfileMenuItemProps>(({ theme, active }) => ({
  gap: theme.spacing(1.5),
  ...(active && {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
    },
  }),
}))
