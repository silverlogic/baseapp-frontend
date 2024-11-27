import { FC } from 'react'

import type { SwipeableDrawerProps } from '@baseapp-frontend/design-system'

import { BoxProps } from '@mui/material'

export type OverlayAction = {
  label: string
  icon: JSX.Element
  onClick: () => void
  disabled: boolean
  hasPermission?: boolean | null
  closeOnClick?: boolean
}

export type LongPressHandler = {
  isLongPressingItem: boolean
  shouldOpenItemOptions: boolean
}

export interface ActionOverlayProps extends BoxProps {
  ContainerProps?: BoxProps
  enableDelete?: boolean
  isDeletingItem?: boolean
  handleDeleteItem?: () => void
  actions: OverlayAction[]
  SwipeableDrawer?: FC<SwipeableDrawerProps>
  SwipeableDrawerProps?: Partial<SwipeableDrawerProps>
  offsetTop?: number
  offsetRight?: number
}

export interface ActionOverlayContainerProps extends BoxProps {
  offsetTop?: number
  offsetRight?: number
}
