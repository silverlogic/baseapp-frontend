'use client'

import { FC } from 'react'

import { useResponsive, useUISettings } from '@baseapp-frontend/design-system/hooks/web'
import { AttachmentIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useBoolean } from '@baseapp-frontend/utils'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

import Header from '../Header'
import NavCentered from '../NavCentered'
import NavHorizontal from '../NavHorizontal'
import NavMini from '../NavMini'
import NavVertical from '../NavVertical'
import VerticalLayout from '../nav2/NavigationLayout/VerticalLayout'
import SidebarMenu from '../nav2/SidebarMenu'
import SidebarMenuListGroupRoot from '../nav2/SidebarMenu/SidebarMenuListGroup'
import SidebarMenuListHeader from '../nav2/SidebarMenu/SidebarMenuListHeader'
import SidebarMenuNavItem from '../nav2/SidebarMenu/SidebarMenuNavItem'
import SidebarMenuNavItemArrow from '../nav2/SidebarMenu/SidebarMenuNavItem/SidebarMenuNavItemArrow'
import SidebarMenuNavItemIcon from '../nav2/SidebarMenu/SidebarMenuNavItem/SidebarMenuNavItemIcon'
import SidebarMenuNavItemTitle from '../nav2/SidebarMenu/SidebarMenuNavItem/SidebarMenuNavItemTitle'
import DefaultMainContainer from './MainContainer'
import { NavigationLayoutProps } from './types'

const NavigationLayout: FC<NavigationLayoutProps> = ({
  navData,
  LogoIcon,
  LogoProps,
  AccountMenu,
  AccountMenuProps,
  NavAccountSection,
  NavAccountSectionProps,
  NotificationsPopover,
  NotificationsPopoverProps,
  ToolbarProps,
  children,
  MainContainerProps = {},
  MainContainer = DefaultMainContainer,
  slotProps,
  VerticalDrawerProps,
  NavToggleButtonProps,
  enableHeader = true,
  CustomAppBarProps,
}) => {
  const { settings } = useUISettings()
  const nav = useBoolean()
  const isMobileOrTablet = useResponsive('down', 'lg')

  const isNavCentered = settings?.themeLayout === 'centered'
  const isNavHorizontal = settings?.themeLayout === 'horizontal'
  const isNavMini = settings?.themeLayout === 'mini'
  const isNavSidebar = settings?.themeLayout === 'sidebar'

  console.log('isNavSidebar', isNavSidebar)

  const notificationsComponent = NotificationsPopover ? (
    <NotificationsPopover {...NotificationsPopoverProps} currentLayout={settings?.themeLayout} />
  ) : undefined

  if (isNavCentered) {
    return (
      <>
        {(enableHeader || isMobileOrTablet) && (
          <Header
            LogoIcon={LogoIcon}
            LogoProps={LogoProps}
            onOpenNav={nav.onTrue}
            AccountMenu={AccountMenu}
            AccountMenuProps={{
              ...AccountMenuProps,
              additionalComponent: notificationsComponent ?? AccountMenuProps?.additionalComponent,
            }}
            ToolbarProps={ToolbarProps}
            CustomAppBarProps={CustomAppBarProps}
          >
            <NavCentered
              navData={navData}
              openNav={nav.value}
              onCloseNav={nav.onFalse}
              VerticalDrawerProps={VerticalDrawerProps}
              slotProps={slotProps}
            />
          </Header>
        )}
        <MainContainer isNavCentered {...MainContainerProps}>
          {children}
        </MainContainer>
      </>
    )
  }

  if (isNavHorizontal) {
    return (
      <>
        {(enableHeader || isMobileOrTablet) && (
          <Header
            LogoIcon={LogoIcon}
            LogoProps={LogoProps}
            onOpenNav={nav.onTrue}
            AccountMenu={AccountMenu}
            AccountMenuProps={{
              ...AccountMenuProps,
              additionalComponent: notificationsComponent ?? AccountMenuProps?.additionalComponent,
            }}
            ToolbarProps={ToolbarProps}
            CustomAppBarProps={CustomAppBarProps}
          />
        )}
        <NavHorizontal
          navData={navData}
          openNav={nav.value}
          onCloseNav={nav.onFalse}
          slotProps={slotProps}
          VerticalDrawerProps={VerticalDrawerProps}
        />
        <MainContainer isNavHorizontal {...MainContainerProps}>
          {children}
        </MainContainer>
      </>
    )
  }

  if (isNavMini) {
    return (
      <>
        {(enableHeader || isMobileOrTablet) && (
          <Header
            LogoIcon={LogoIcon}
            LogoProps={LogoProps}
            onOpenNav={nav.onTrue}
            AccountMenu={AccountMenu}
            AccountMenuProps={{
              ...AccountMenuProps,
              additionalComponent: notificationsComponent ?? AccountMenuProps?.additionalComponent,
            }}
            ToolbarProps={ToolbarProps}
            CustomAppBarProps={CustomAppBarProps}
          />
        )}

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          <NavMini
            navData={navData}
            openNav={nav.value}
            onCloseNav={nav.onFalse}
            LogoIcon={LogoIcon}
            LogoProps={LogoProps}
            slotProps={slotProps}
            VerticalDrawerProps={VerticalDrawerProps}
            NavToggleButtonProps={NavToggleButtonProps}
            AccountMenu={AccountMenu}
            AccountMenuProps={AccountMenuProps}
            NavAccountSection={NavAccountSection}
            NavAccountSectionProps={NavAccountSectionProps}
            NotificationsPopover={!enableHeader ? NotificationsPopover : undefined}
            NotificationsPopoverProps={!enableHeader ? NotificationsPopoverProps : undefined}
          />
          <MainContainer isNavMini {...MainContainerProps}>
            {children}
          </MainContainer>
        </Box>
      </>
    )
  }

  if (isNavSidebar) {
    return (
      <>
        {/* <Header
          LogoIcon={LogoIcon}
          LogoProps={LogoProps}
          onOpenNav={nav.onTrue}
          AccountMenu={AccountMenu}
          AccountMenuProps={AccountMenuProps}
          ToolbarProps={ToolbarProps}
        /> */}
        <VerticalLayout>
          <SidebarMenu.Root open={nav.value} onClose={nav.onFalse}>
            <SidebarMenu.Header>
              <Typography variant="h6">Header Slot</Typography>
            </SidebarMenu.Header>
            <SidebarMenu.Content>
              <SidebarMenuListGroupRoot>
                <SidebarMenuListHeader title="Group 1">
                  <SidebarMenuListGroupRoot>
                    <SidebarMenuNavItem.Root>
                      <SidebarMenuNavItemTitle title="First Item testing a long size header" />
                    </SidebarMenuNavItem.Root>
                    <SidebarMenuNavItem.Root>
                      <SidebarMenuNavItemTitle title="Second Item" caption="Second Item Caption" />
                      <SidebarMenuNavItemIcon Icon={AttachmentIcon} />
                    </SidebarMenuNavItem.Root>
                    <SidebarMenuNavItem.Root>
                      <SidebarMenuNavItemTitle title="Third Item" />
                      <SidebarMenuNavItemArrow Icon={AttachmentIcon} />
                    </SidebarMenuNavItem.Root>
                  </SidebarMenuListGroupRoot>
                </SidebarMenuListHeader>
              </SidebarMenuListGroupRoot>
              <Typography variant="h6">Content Slot</Typography>
            </SidebarMenu.Content>
            <SidebarMenu.Footer>
              <Typography variant="h6">Footer Slot</Typography>
            </SidebarMenu.Footer>
          </SidebarMenu.Root>
          <MainContainer {...MainContainerProps}>{children}</MainContainer>
        </VerticalLayout>
      </>
    )
  }

  return (
    <>
      {(enableHeader || isMobileOrTablet) && (
        <Header
          LogoIcon={LogoIcon}
          LogoProps={LogoProps}
          onOpenNav={nav.onTrue}
          AccountMenu={AccountMenu}
          AccountMenuProps={{
            ...AccountMenuProps,
            additionalComponent: notificationsComponent ?? AccountMenuProps?.additionalComponent,
          }}
          ToolbarProps={ToolbarProps}
          CustomAppBarProps={CustomAppBarProps}
        />
      )}
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <NavVertical
          navData={navData}
          LogoIcon={LogoIcon}
          LogoProps={LogoProps}
          openNav={nav.value}
          onCloseNav={nav.onFalse}
          slotProps={slotProps}
          VerticalDrawerProps={VerticalDrawerProps}
          NavToggleButtonProps={NavToggleButtonProps}
          AccountMenu={!enableHeader ? AccountMenu : undefined}
          AccountMenuProps={!enableHeader ? AccountMenuProps : undefined}
          NavAccountSection={NavAccountSection}
          NavAccountSectionProps={NavAccountSectionProps}
          NotificationsPopover={!enableHeader ? NotificationsPopover : undefined}
          NotificationsPopoverProps={!enableHeader ? NotificationsPopoverProps : undefined}
        />
        <MainContainer {...MainContainerProps}>{children}</MainContainer>
      </Box>
    </>
  )
}

export default NavigationLayout
