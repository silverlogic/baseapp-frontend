import { FC } from 'react'

import { SvgIconProps } from '@mui/material'

export interface NavItemData {
  title: string
  caption?: string
  icon?: FC<SvgIconProps>
  path?: string
  disabled?: boolean
  externalLink?: boolean
  children?: NavItemData[]
  dataType: 'item'
  hide?: boolean
}

export interface NavListData extends Omit<NavItemData, 'dataType'> {
  dataType: 'list'
  children?: NavItemData[]
}

export interface NavGroupData {
  dataType: 'group'
  subheader?: string
  items: Array<NavListData | NavItemData>
}

export type NavigationData = Array<NavGroupData | NavItemData | NavListData>
