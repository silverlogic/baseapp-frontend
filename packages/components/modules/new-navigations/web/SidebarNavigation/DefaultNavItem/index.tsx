
import SidebarMenuNavItem from '../../SidebarMenu/SidebarMenuNavItem'
import { DefaultNavItemProps } from './types'
import { FC } from 'react'

const DefaultNavItem: FC<DefaultNavItemProps> = ({ title, icon, caption, slots, ...props }) => {
  const { Icon = SidebarMenuNavItem.Icon, Title = SidebarMenuNavItem.Title, Root = SidebarMenuNavItem.Root } = slots ?? {}
  return (
    <Root
      key={title}
      {...props}
    >
      <Icon Icon={icon} />
      <Title title={title} caption={caption} />
    </Root>
  )
}

export default DefaultNavItem
