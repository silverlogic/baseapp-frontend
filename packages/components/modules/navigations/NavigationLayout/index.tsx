'use client'

import { FC } from 'react'

import { useBoolean } from '@baseapp-frontend/utils'

import Box from '@mui/material/Box'

import Header from '../Header'
import NavCentered from '../NavCentered'
import NavHorizontal from '../NavHorizontal'
import NavMini from '../NavMini'
import NavVertical from '../NavVertical'
import MainContainer from './MainContainer'
import { NavigationLayoutProps } from './types'

const NavigationLayout: FC<NavigationLayoutProps> = ({
  navData,
  settings,
  setSettings,
  LogoIcon,
  AccountMenu,
  AccountMenuProps,
  ToolbarProps,
  children,
}) => {
  const nav = useBoolean()

  const isNavCentered = settings?.themeLayout === 'centered'
  const isNavHorizontal = settings?.themeLayout === 'horizontal'
  const isNavMini = settings?.themeLayout === 'mini'

  if (isNavCentered) {
    return (
      <>
        <Header
          settings={settings}
          LogoIcon={LogoIcon}
          onOpenNav={nav.onTrue}
          AccountMenu={AccountMenu}
          AccountMenuProps={AccountMenuProps}
          ToolbarProps={ToolbarProps}
        >
          <NavCentered navData={navData} openNav={nav.value} onCloseNav={nav.onFalse} />
        </Header>
        <MainContainer isNavCentered>{children}</MainContainer>
      </>
    )
  }

  if (isNavHorizontal) {
    return (
      <>
        <Header
          settings={settings}
          LogoIcon={LogoIcon}
          onOpenNav={nav.onTrue}
          AccountMenu={AccountMenu}
          AccountMenuProps={AccountMenuProps}
          ToolbarProps={ToolbarProps}
        />
        <NavHorizontal navData={navData} openNav={nav.value} onCloseNav={nav.onFalse} />
        <MainContainer isNavHorizontal>{children}</MainContainer>
      </>
    )
  }

  if (isNavMini) {
    return (
      <>
        <Header
          settings={settings}
          LogoIcon={LogoIcon}
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
            settings={settings}
            setSettings={setSettings}
          />
          <MainContainer isNavMini>{children}</MainContainer>
        </Box>
      </>
    )
  }

  return (
    <>
      <Header
        settings={settings}
        LogoIcon={LogoIcon}
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
          settings={settings}
          setSettings={setSettings}
          LogoIcon={LogoIcon}
          openNav={nav.value}
          onCloseNav={nav.onFalse}
        />
        <MainContainer>{children}</MainContainer>
      </Box>
    </>
  )
}

export default NavigationLayout
