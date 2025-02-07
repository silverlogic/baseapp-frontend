import { FC } from 'react'

import type { SwipeableDrawerProps } from '@baseapp-frontend/design-system/components/web/drawers'
import { ValueOf } from '@baseapp-frontend/utils'

import { BoxProps } from '@mui/material'

import { HOVER_OVERLAY_MODES } from './constants'

export type OverlayAction = {
  label: string
  icon: JSX.Element
  onClick: () => void
  disabled?: boolean
  hasPermission?: boolean | null
  closeOnClick?: boolean
}

export type LongPressHandler = {
  isLongPressingItem: boolean
  shouldOpenItemOptions: boolean
}

export interface ActionOverlayProps extends ActionOverlayTooltipContainerProps {
  actions: OverlayAction[]
  title: string
  enableDelete?: boolean | null
  isDeletingItem?: boolean
  handleDeleteItem?: () => void
  ContainerProps?: Partial<BoxProps>
  SwipeableDrawer?: FC<SwipeableDrawerProps>
  SwipeableDrawerProps?: Partial<SwipeableDrawerProps>
  hoverOverlayMode?: ValueOf<typeof HOVER_OVERLAY_MODES>
}

export interface ActionOverlayTooltipContainerProps extends BoxProps {
  offsetTop?: number
  offsetRight?: number
}
