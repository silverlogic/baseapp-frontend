import { PropsWithChildren } from 'react'

import { useUISettings } from '@baseapp-frontend/design-system/hooks/web'

import SidebarNavigation from '../SidebarNavigation'
import {
  LayoutVariant,
  NavigationLayout2Props,
  NavigationVariants,
  VariantComponent,
} from './types'

const defaultVariants: NavigationVariants = {
  sidebar: SidebarNavigation,
}

const NavigationLayout = ({ children, variants, slots, navData }: NavigationLayout2Props) => {
  const { settings } = useUISettings()

  const variant = (settings?.themeLayout ?? 'sidebar') as LayoutVariant
  const Variant = (variants?.[variant] ??
    defaultVariants[variant] ??
    SidebarNavigation) as VariantComponent<PropsWithChildren & any>

  return <Variant slots={slots} navData={navData}>{children}</Variant>
}

export default NavigationLayout
