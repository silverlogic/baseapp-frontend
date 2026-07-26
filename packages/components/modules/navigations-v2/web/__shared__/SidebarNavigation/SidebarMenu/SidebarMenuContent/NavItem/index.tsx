import { FC } from 'react'

import { NonUndefined } from '@baseapp-frontend/utils'

import SidebarMenuNavItem from '../../../../../primitives/SidebarMenuNavItem'
import { NavItemProps } from './types'

const NavItem: FC<NavItemProps> = ({ title, icon, caption, slots, slotProps, ...props }) => {
  const {
    Icon = SidebarMenuNavItem.Icon,
    Title = SidebarMenuNavItem.Title,
    Root = SidebarMenuNavItem.Root,
  } = slots || ({} as NonUndefined<NavItemProps['slots']>)

  return (
    <Root key={title} {...props} {...slotProps?.Root}>
      <Icon Icon={icon} {...slotProps?.Icon} />
      <Title title={title} caption={caption} {...slotProps?.Title} />
    </Root>
  )
}

export default NavItem
