import { ElementType } from "react"
import { NavItemData } from "../../types"

export interface DefaultNavItemProps extends NavItemData {
  slots?: {
    Root?: ElementType
    Icon?: ElementType
    Title?: ElementType
  }
}