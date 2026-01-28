import { StackProps } from "@mui/material"
import { PropsWithChildren } from "react"

export interface SidebarMenuNavGroupRootProps extends Omit<StackProps, 'children'> {
 children: (props: { open: boolean, handleToggle: () => void }) => React.ReactNode
 defaultOpen?: boolean
 hide?: boolean

}