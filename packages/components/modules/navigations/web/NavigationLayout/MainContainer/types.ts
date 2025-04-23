import { PropsWithChildren } from 'react'

import { BoxProps } from '@mui/material'

export interface MainContainerProps extends PropsWithChildren {
  isNavMini?: boolean
  isNavHorizontal?: boolean
  isNavCentered?: boolean
  MainContainerProps?: BoxProps
}

export interface NavVerticalContainerProps
  extends BoxProps,
    Pick<MainContainerProps, 'isNavMini'> {}
