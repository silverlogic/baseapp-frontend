import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

import { NAV_WIDTH } from '../constants'

export const NavContainer = styled(Stack)(({ theme }) => ({
  borderRight: `solid 1px ${theme.palette.divider}`,
  height: '100%',
  position: 'fixed',
  width: NAV_WIDTH.VERTICAL,
}))
