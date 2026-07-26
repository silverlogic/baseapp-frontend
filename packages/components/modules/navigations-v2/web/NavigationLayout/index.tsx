import { FC } from 'react'

import { useUISettings } from '@baseapp-frontend/design-system/hooks/web'
import { ThemeLayoutV2 } from '@baseapp-frontend/design-system/styles/web'
import { NonUndefined } from '@baseapp-frontend/utils'

import HorizontalLayout from '../layouts/HorizontalLayout'
import SidebarLayout from '../layouts/SidebarLayout'
import VerticalLayout from '../layouts/VerticalLayout'
import { NavigationLayoutProps } from './types'

const NavigationLayout: FC<NavigationLayoutProps> = ({ children, slots, slotProps, navData }) => {
  const { settings } = useUISettings()
  const layout = settings?.themeLayout as ThemeLayoutV2

  const {
    sidebar = SidebarLayout,
    vertical = VerticalLayout,
    horizontal = HorizontalLayout,
  } = slots || ({} as NonUndefined<NavigationLayoutProps['slots']>)
  const LayoutComponent = { sidebar, vertical, horizontal }[layout]
  const layoutProps = slotProps?.[layout]

  return (
    <LayoutComponent navData={navData} {...layoutProps}>
      {children}
    </LayoutComponent>
  )
}

export default NavigationLayout
