import { ComponentProps, FC, PropsWithChildren } from 'react'

import { LogoContainer } from '@baseapp-frontend/design-system/components/web/logos'

import { BoxProps } from '@mui/material'

export type SidebarMenuHeaderSlots = {
  Logo: FC
  LogoContainer?: typeof LogoContainer
}

export type SidebarMenuHeaderSlotProps = {
  LogoContainer?: Partial<ComponentProps<typeof LogoContainer>>
}

export interface SidebarMenuHeaderProps extends PropsWithChildren, BoxProps {
  slots?: SidebarMenuHeaderSlots
  slotProps?: SidebarMenuHeaderSlotProps
}
