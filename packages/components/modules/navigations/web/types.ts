import { ListItemButtonProps } from '@mui/material/ListItemButton'
import { StackProps } from '@mui/material/Stack'
import { SxProps, Theme } from '@mui/material/styles'

export type SlotProps = {
  gap?: number
  rootItem?: SxProps<Theme>
  subItem?: SxProps<Theme>
  subheader?: SxProps<Theme>
}

export type NavItemStateProps = {
  depth?: number
  open?: boolean
  active?: boolean
  hasChild?: boolean
}

type NavItemChildren = {
  title: string
  path: string
  disabled?: boolean
}

export type NavItemBaseProps = {
  title: string
  path?: string
  icon?: React.ReactElement
  info?: React.ReactElement
  caption?: string
  disabled?: boolean
  externalLink?: boolean
  active?: boolean
  children?: NavItemChildren[]
}

export type NavItemProps = ListItemButtonProps &
  NavItemStateProps & {
    itemData: NavItemBaseProps
    slotProps?: SlotProps
  }

export type NavListProps = {
  data: NavItemBaseProps
  depth: number
  slotProps?: SlotProps
}

export type NavigationData = {
  subheader: string
  items: NavItemBaseProps[]
}[]

export type NavSectionProps = StackProps & {
  navData: NavigationData
  slotProps?: SlotProps
}
