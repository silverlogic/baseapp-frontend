import { FC } from 'react'

import { Href } from 'expo-router'

import { SvgIconProps } from '../../../components/native/icons'

export type TabItem = {
  name: string
  href: Href
  Icon?: FC<SvgIconProps>
  label?: string
}

export interface BottomNavigationLayoutProps {
  tabs: TabItem[]
}
