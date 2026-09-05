import { ComponentProps, PropsWithChildren } from 'react'

import type HeaderNavigation from '../../__shared__/HeaderNavigation'
import type MainContainer from '../../__shared__/MainContainer'
import type { NavigationData } from '../../types'

export type HorizontalLayoutSlots = {
  HeaderNavigation?: typeof HeaderNavigation
  MainContainer?: typeof MainContainer
}

export type HorizontalLayoutSlotProps = {
  HeaderNavigation?: Partial<ComponentProps<typeof HeaderNavigation>>
  MainContainer?: Partial<ComponentProps<typeof MainContainer>>
}

export interface HorizontalLayoutProps extends PropsWithChildren {
  slots?: HorizontalLayoutSlots
  slotProps?: HorizontalLayoutSlotProps
  navData: NavigationData
}
