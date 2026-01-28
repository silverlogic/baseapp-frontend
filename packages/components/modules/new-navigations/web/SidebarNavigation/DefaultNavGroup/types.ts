import { ElementType } from "react"
import { NavGroupData, NavItemData, NavListData } from "../../types"

export type RenderProps = {
    open: boolean
    handleToggle: () => void
  }

export interface DefaultNavGroupProps {
  slots?: {
    Root?: ElementType
    Header?: ElementType
    Content?: ElementType
  }
  navGroup: NavGroupData
  renderNav: (nav: NavItemData | NavListData | NavGroupData, key?: React.Key) => React.ReactNode
}