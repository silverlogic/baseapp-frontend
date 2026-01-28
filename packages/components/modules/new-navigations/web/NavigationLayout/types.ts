import { PropsWithChildren } from 'react'
import { NavigationData } from '../types'

export type LayoutVariant = 'sidebar' | 'horizontal' | 'centered' | 'mini'

export type SlotsOptions = "expandedSidebar" | "miniSidebar" | "header"

export type VariantComponent<P> = React.ComponentType<P>

export type NavigationVariants = Partial<Record<LayoutVariant, VariantComponent<any>>>

export interface NavigationLayout2Props extends PropsWithChildren {
  variants?: NavigationVariants
  slots?: Partial<Record<SlotsOptions, any>>
  navData?: NavigationData
}
