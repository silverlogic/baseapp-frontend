import type { Key } from 'react'

import type { NonUndefined } from '@baseapp-frontend/utils'

import { NAV_DATA_TYPE } from '../../../../constants'
import type { NavGroupData, NavItemData, NavListData } from '../../../../types'
import DefaultNavGroup from './NavGroup'
import DefaultNavItem from './NavItem'
import DefaultNavList from './NavList'
import type { SidebarMenuContentSlotProps, SidebarMenuContentSlots } from './types'

export const createNavRenderer = (
  slots: SidebarMenuContentSlots,
  slotProps: SidebarMenuContentSlotProps = {},
) => {
  const {
    NavItem = DefaultNavItem,
    NavList = DefaultNavList,
    NavGroup = DefaultNavGroup,
  } = slots || ({} as NonUndefined<SidebarMenuContentSlots>)

  const renderNav = (nav: NavItemData | NavListData | NavGroupData, key?: Key) => {
    switch (nav.dataType) {
      case NAV_DATA_TYPE.group: {
        const groupNav = nav as NavGroupData
        return (
          <NavGroup
            key={groupNav.subheader ?? key ?? 'group'}
            navGroup={groupNav}
            renderNav={renderNav}
            {...slotProps?.NavGroup}
          />
        )
      }
      case NAV_DATA_TYPE.list: {
        const listNav = nav as NavListData
        return <NavList key={key ?? listNav.title} navList={listNav} {...slotProps?.NavList} />
      }
      case NAV_DATA_TYPE.item: {
        const itemNav = nav as NavItemData
        return <NavItem key={key ?? itemNav.title} {...itemNav} {...slotProps?.NavItem} />
      }
      default:
        return null
    }
  }

  return renderNav
}
