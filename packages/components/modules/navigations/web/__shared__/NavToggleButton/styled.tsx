import { bgBlur } from '@baseapp-frontend/design-system/styles/web'

import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'

import { NAV_WIDTH } from '../../constants'

export const ToggleButton = styled(IconButton)(({ theme }) => ({
  border: `solid 1px ${theme.palette.divider}`,
  left: NAV_WIDTH.VERTICAL - 12,
  padding: theme.spacing(0.5),
  position: 'fixed',
  top: 32,
  zIndex: theme.zIndex.appBar + 1,
  ...bgBlur({ opacity: 0.48, color: theme.palette.background.default }),
  '&:hover': {
    backgroundColor: theme.palette.background.default,
  },
}))
