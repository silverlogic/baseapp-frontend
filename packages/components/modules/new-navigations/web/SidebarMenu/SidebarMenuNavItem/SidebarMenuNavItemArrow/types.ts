import { FC } from "react"
import { SvgIconProps } from "@mui/material"

export interface SidebarMenuNavItemArrowProps extends SvgIconProps {
    Icon?: FC<SvgIconProps>
    isExpanded?: boolean
}