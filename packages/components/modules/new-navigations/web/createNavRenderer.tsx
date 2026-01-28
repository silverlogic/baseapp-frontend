import { NAV_DATA_TYPE } from "./constants"
import DefaultNavGroup from "./SidebarNavigation/DefaultNavGroup"
import DefaultNavItem from "./SidebarNavigation/DefaultNavItem"
import DefaultNavList from "./SidebarNavigation/DefaultNavList"
import { SidebarDefaultNavigationSlots } from "./SidebarNavigation/types"
import { NavGroupData, NavItemData, NavListData } from "./types"

export const createNavRenderer = (slots: SidebarDefaultNavigationSlots) => {
    const { NavItem = DefaultNavItem, NavList = DefaultNavList, NavGroup = DefaultNavGroup } = slots ?? {}

    const renderNav = (nav: NavItemData | NavListData | NavGroupData, key?: React.Key) => {
        switch (nav.dataType) {
            case NAV_DATA_TYPE.group: {
                const groupNav = nav as NavGroupData
                return (
                    <NavGroup
                        key={groupNav.subheader ?? key ?? 'group'}
                        navGroup={groupNav}
                        slots={slots}
                        renderNav={renderNav}
                    />
                )
            }
            case NAV_DATA_TYPE.list: {
                const listNav = nav as NavListData
                return <NavList key={key ?? listNav.title} navList={listNav} slots={slots} />
            }
            case NAV_DATA_TYPE.item: {
                const itemNav = nav as NavItemData
                return <NavItem key={key ?? itemNav.title} {...itemNav} slots={slots} />
            }
            default:
                return null
        }
    }

    return renderNav
}