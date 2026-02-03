'use client'

import { FC } from 'react'

import { useResponsive, useUISettings } from '@baseapp-frontend/design-system/hooks/web'
import { useBoolean } from '@baseapp-frontend/utils'

import Box from '@mui/material/Box'

import Header from '../Header'
import NavCentered from '../NavCentered'
import NavHorizontal from '../NavHorizontal'
import NavMini from '../NavMini'
import NavVertical from '../NavVertical'
import DefaultMainContainer from './MainContainer'
import { NavigationLayoutProps } from './types'

const NavigationLayout: FC<NavigationLayoutProps> = ({
  navData,
  LogoIcon,
  LogoProps,
  AccountMenu,
  AccountMenuProps,
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
}) => {
  const { settings } = useUISettings()
  const nav = useBoolean()
  const isMobileOrTablet = useResponsive('down', 'lg')

  const isNavCentered = settings?.themeLayout === 'centered'
  const isNavHorizontal = settings?.themeLayout === 'horizontal'
  const isNavMini = settings?.themeLayout === 'mini'

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
              additionalComponent:
                notificationsComponent ?? AccountMenuProps?.additionalComponent,
            }}
            ToolbarProps={ToolbarProps}
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
              additionalComponent:
                notificationsComponent ?? AccountMenuProps?.additionalComponent,
            }}
            ToolbarProps={ToolbarProps}
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
              additionalComponent:
                notificationsComponent ?? AccountMenuProps?.additionalComponent,
            }}
            ToolbarProps={ToolbarProps}
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
            additionalComponent:
              notificationsComponent ?? AccountMenuProps?.additionalComponent,
          }}
          ToolbarProps={ToolbarProps}
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
          NotificationsPopover={!enableHeader ? NotificationsPopover : undefined}
          NotificationsPopoverProps={!enableHeader ? NotificationsPopoverProps : undefined}
        />
        <MainContainer {...MainContainerProps}>{children}</MainContainer>
      </Box>
    </>
  )
}

export default NavigationLayout
