'use client'

import { useBoolean } from '@baseapp-frontend/utils'
import DefaultMainContainer from '../NavigationLayout/MainContainer'
import VerticalLayout from '../NavigationLayout/VerticalLayout'
import SidebarMenu from '../SidebarMenu'
import { SidebarNavigationProps } from './types'

const SidebarNavigation = ({
  children,
  slots,
  open,
  defaultOpen = false,
  onOpenChange,
  navData,
}: SidebarNavigationProps) => {
  const internal = useBoolean(defaultOpen)
  const isControlled = typeof open === 'boolean'
  const isOpen = isControlled ? open : internal.value

  const closeNav = () => {
    if (!isControlled) internal.onFalse()
    onOpenChange?.(false)
  }

  const {
    Layout = VerticalLayout,
    MainContainer = DefaultMainContainer,
    SidebarRoot = SidebarMenu.Root,
    SidebarHeader = SidebarMenu.Header,
    SidebarContent = SidebarMenu.Content,
    SidebarFooter = SidebarMenu.Footer,
  } = slots?.expandedSidebar ?? {}

  return (
    <Layout>
      <SidebarRoot
        open={isOpen}
        onClose={() => {
          closeNav()
        }}
      >
        <SidebarHeader />
        <SidebarContent navData={navData} />
        <SidebarFooter />
      </SidebarRoot>
      <MainContainer>{children}</MainContainer>
    </Layout>
  )
}

export default SidebarNavigation
