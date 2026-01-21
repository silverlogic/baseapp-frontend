'use client'

import { FC } from 'react'

import { useUISettings } from '@baseapp-frontend/design-system/hooks/web'
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
  ToolbarProps,
  children,
  MainContainerProps = {},
  MainContainer = DefaultMainContainer,
  slotProps,
  VerticalDrawerProps,
  NavToggleButtonProps,
}) => {
  const { settings } = useUISettings()
  const nav = useBoolean()

  const isNavCentered = settings?.themeLayout === 'centered'
  const isNavHorizontal = settings?.themeLayout === 'horizontal'
  const isNavMini = settings?.themeLayout === 'mini'

  if (isNavCentered) {
    return (
      <>
        <Header
          LogoIcon={LogoIcon}
          LogoProps={LogoProps}
          onOpenNav={nav.onTrue}
          AccountMenu={AccountMenu}
          AccountMenuProps={AccountMenuProps}
          ToolbarProps={ToolbarProps}
        >
          <NavCentered
            navData={navData}
            openNav={nav.value}
            onCloseNav={nav.onFalse}
            VerticalDrawerProps={VerticalDrawerProps}
          />
        </Header>
        <MainContainer isNavCentered {...MainContainerProps}>
          {children}
        </MainContainer>
      </>
    )
  }

  if (isNavHorizontal) {
    return (
      <>
        <Header
          LogoIcon={LogoIcon}
          LogoProps={LogoProps}
          onOpenNav={nav.onTrue}
          AccountMenu={AccountMenu}
          AccountMenuProps={AccountMenuProps}
          ToolbarProps={ToolbarProps}
        />
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
        <Header
          LogoIcon={LogoIcon}
          LogoProps={LogoProps}
          onOpenNav={nav.onTrue}
          AccountMenu={AccountMenu}
          AccountMenuProps={AccountMenuProps}
          ToolbarProps={ToolbarProps}
        />

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
      <Header
        LogoIcon={LogoIcon}
        LogoProps={LogoProps}
        onOpenNav={nav.onTrue}
        AccountMenu={AccountMenu}
        AccountMenuProps={AccountMenuProps}
        ToolbarProps={ToolbarProps}
      />
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
        />
        <MainContainer {...MainContainerProps}>{children}</MainContainer>
      </Box>
    </>
  )
}

export default NavigationLayout
