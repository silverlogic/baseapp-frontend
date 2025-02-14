import { SwipeableDrawerProps as MUISwipeableDrawerProps } from '@mui/material'

export interface SwipeableDrawerProps extends Omit<MUISwipeableDrawerProps, 'onOpen'> {
  globalHeight?: string | number
}
