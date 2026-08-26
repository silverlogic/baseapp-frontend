import { SwipeableDrawerProps as MUISwipeableDrawerProps } from '@mui/material'

export interface SwipeableDrawerProps extends Omit<MUISwipeableDrawerProps, 'onOpen'> {
  /** Drawer paper height; name kept for backward compatibility with the former global rule. */
  globalHeight?: string | number
}
