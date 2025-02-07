import { ComponentProps, FC } from 'react'

import type { DrawerHeaderProps } from '@react-navigation/drawer'
import { Href } from 'expo-router'
import Drawer from 'expo-router/drawer'

import { SvgIconProps } from '../../../components/native/icons'
import { DrawerContentProps } from './DrawerContent/types'

type DrawerProps = ComponentProps<typeof Drawer>

export type SectionItem = {
  href: Href
  Icon: FC<SvgIconProps>
  label: string
}

export type Section = {
  label: string
  items: SectionItem[]
}

export interface SidebarNavigationLayoutProps {
  DrawerProps?: Partial<DrawerProps>
  DrawerContent?: FC<DrawerContentProps>
  DrawerContentProps: DrawerContentProps
  Header?: FC<DrawerHeaderProps>
}
