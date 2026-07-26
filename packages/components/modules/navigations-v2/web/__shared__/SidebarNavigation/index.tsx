'use client'

import { FC } from 'react'

import { NonUndefined } from '@baseapp-frontend/utils'

import DefaultMainContainer from '../MainContainer'
import DefaultLayout from './Layout'
import SidebarMenu from './SidebarMenu'
import type { SidebarNavigationProps } from './types'

const SidebarNavigation: FC<SidebarNavigationProps> = ({
  children,
  slots,
  slotProps,
  collapsible,
  isDrawerOpen,
  onDrawerToggle,
  navData,
}) => {
  const {
    Layout = DefaultLayout,
    MainContainer = DefaultMainContainer,
    SidebarRoot = SidebarMenu.Root,
    SidebarHeader = SidebarMenu.Header,
    SidebarContent = SidebarMenu.Content,
    SidebarFooter = SidebarMenu.Footer,
  } = slots || ({} as NonUndefined<SidebarNavigationProps['slots']>)

  return (
    <Layout {...slotProps?.Layout}>
      <SidebarRoot
        collapsible={collapsible}
        isDrawerOpen={isDrawerOpen}
        onDrawerToggle={onDrawerToggle}
        {...slotProps?.SidebarRoot}
      >
        <SidebarHeader {...slotProps?.SidebarHeader} />
        <SidebarContent navData={navData} {...slotProps?.SidebarContent} />
        <SidebarFooter {...slotProps?.SidebarFooter} />
      </SidebarRoot>
      <MainContainer {...slotProps?.MainContainer}>{children}</MainContainer>
    </Layout>
  )
}

export default SidebarNavigation
