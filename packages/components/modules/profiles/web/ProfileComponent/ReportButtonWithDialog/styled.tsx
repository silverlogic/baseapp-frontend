import { SwipeableDrawer } from '@baseapp-frontend/design-system/components/web/drawers'

import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TypeButton = styled(Button)(({ theme }) => ({
  variant: 'text',
  borderRadius: 0,
  justifyContent: 'space-between',
  color: theme.palette.text.primary,
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.background.neutral,
    boxShadow: 'none',
  },
}))

export const StyledSwipeableDrawer = styled(SwipeableDrawer)(() => ({
  '& .MuiDrawer-paper': {
    height: 'auto',
  },
}))
