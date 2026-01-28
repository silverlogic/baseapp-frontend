import { NavListData } from "../../types"
import SidebarMenuNavList from "../../SidebarMenu/SidebarMenuNavList"

export interface DefaultNavListProps {
  navList: NavListData
  slots?: Partial<typeof SidebarMenuNavList>
}