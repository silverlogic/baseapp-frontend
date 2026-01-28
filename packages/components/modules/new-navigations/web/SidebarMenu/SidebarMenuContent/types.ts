import { ScrollbarProps } from "@baseapp-frontend/design-system/components/web/scrollbars";
import { PropsWithChildren } from "react";
import { NavigationData } from "../../types";
import { ElementType } from "react";

export interface SidebarMenuContentProps extends PropsWithChildren, ScrollbarProps {
    slots?: {
        NavItem?: ElementType
        NavList?: ElementType
        NavGroup?: ElementType
    }
    navData?: NavigationData
}