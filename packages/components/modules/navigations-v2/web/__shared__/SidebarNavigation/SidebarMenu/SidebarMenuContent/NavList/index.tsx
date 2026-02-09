import { FC } from 'react'

import { NonUndefined } from '@baseapp-frontend/utils'

import SidebarMenuNavGroup from '../../../../../primitives/SidebarMenuNavGroup'
import SidebarMenuNavItem from '../../../../../primitives/SidebarMenuNavItem'
import type { NavListProps } from './types'

const NavList: FC<NavListProps> = ({ navList, slots, slotProps }) => {
  const {
    Root = SidebarMenuNavGroup.Root,
    Header = SidebarMenuNavItem,
    ListRoot = SidebarMenuNavGroup.Content,
    ListItem = SidebarMenuNavItem,
  } = slots || ({} as NonUndefined<NavListProps['slots']>)

  const filteredChildren = navList.children?.filter((child) => !child.hide)
  const hasChildren = filteredChildren?.length && filteredChildren.length > 0

  return (
    <Root {...navList} defaultOpen={false} {...slotProps?.Root}>
      {({ open, handleToggle }) => (
        <>
          <Header.Root
            key={navList.title}
            onClick={handleToggle}
            componentType="button"
            deep={!!hasChildren}
            {...navList}
            {...slotProps?.Header}
          >
            <Header.Icon Icon={navList.icon} />
            <Header.Title title={navList.title} />
            {!!hasChildren && <Header.Arrow isExpanded={open} />}
          </Header.Root>
          <ListRoot
            open={open}
            sx={{ paddingX: (theme) => theme.spacing(2) }}
            {...slotProps?.ListRoot}
          >
            {navList.children
              ?.filter((child) => !child.hide)
              .map((child) => (
                <ListItem.Root key={child.title} {...child} {...slotProps?.ListItem}>
                  <ListItem.Icon Icon={child.icon} />
                  <ListItem.Title title={child.title} caption={child.caption} />
                </ListItem.Root>
              ))}
          </ListRoot>
        </>
      )}
    </Root>
  )
}

export default NavList
