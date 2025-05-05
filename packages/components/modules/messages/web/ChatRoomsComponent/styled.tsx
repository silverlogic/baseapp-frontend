import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { ViewportHeightContainer, ViewportHeightContainerProps } from '../../../navigations/web'
import { HidableContainerProps } from './types'

export const ChatRoomContainer = styled(Box)<HidableContainerProps>(({ theme, hide }) => ({
  height: '100%',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    display: hide ? 'none' : 'initial',
  },
}))

export const ChatRoomsContainer = styled(ViewportHeightContainer)<ViewportHeightContainerProps>(
  ({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '390px auto',
    alignItems: 'flex-start',
    justifyItems: 'center',
    borderRadius: theme.shape.borderRadius * 2,
    border: `1px ${theme.palette.divider} solid`,
    margin: `0 ${theme.spacing(2)}`,
    [theme.breakpoints.down('md')]: {
      border: 'none',
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
      margin: 0,
    },
  }),
)

export const ChatRoomsListContainer = styled(Box)<HidableContainerProps>(({ theme, hide }) => ({
  borderRight: `1px ${theme.palette.divider} solid`,
  display: 'grid',
  gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
  gridTemplateRows: 'min-content auto',
  height: '100%',
  overflowY: 'hidden',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    display: hide ? 'none' : 'grid',
    borderRight: 'none',
  },
  '@media (max-height: 600px) and (orientation: landscape)': {
    overflowY: 'auto',
    scrollbarWidth: 'none',
  },
}))
