
import SidebarMenuNavGroup from "../SidebarMenuNavGroup"
import SidebarMenuNavGroupContent from "../SidebarMenuNavGroup/SidebarMenuNavGroupContent"
import SidebarMenuNavItem from "../SidebarMenuNavItem"

const SidebarMenuNavList = {
    Root: SidebarMenuNavGroup.Root,
    Header: {
        Root: SidebarMenuNavItem.Root,
        Icon: SidebarMenuNavItem.Icon,
        Title: SidebarMenuNavItem.Title,
        Arrow: SidebarMenuNavItem.Arrow,
    },
    ListRoot: SidebarMenuNavGroupContent,
    ListItem: {
        Root: SidebarMenuNavItem.Root,
        Icon: SidebarMenuNavItem.Icon,
        Title: SidebarMenuNavItem.Title,
    },
}

export default SidebarMenuNavList