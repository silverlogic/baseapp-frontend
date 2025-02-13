import { FC, useEffect } from 'react'
import React from 'react'

import { NavigationLayoutProps } from '../../../types'

const MockHeader = ({ onOpenNav, children, LogoIcon, AccountMenu, AccountMenuProps }: any) => (
  <div data-testid="mock-header">
    {LogoIcon && (
      <div data-testid="mock-logo">
        <LogoIcon />
      </div>
    )}
    <button data-testid="nav-toggle-button" onClick={onOpenNav}>
      Toggle Nav
    </button>
    {AccountMenu ? (
      <AccountMenu {...AccountMenuProps} />
    ) : (
      <div data-testid="mock-account-menu">Default Account Menu</div>
    )}
    {AccountMenuProps?.additionalComponent}
    {children}
  </div>
)

const MockMainContainer = ({ isNavCentered, isNavHorizontal, isNavMini, children }: any) => (
  <div
    data-testid="mock-main-container"
    data-nav-centered={isNavCentered}
    data-nav-horizontal={isNavHorizontal}
    data-nav-mini={isNavMini}
  >
    {children}
  </div>
)

const MockNavCentered = ({ openNav, onCloseNav }: any) => (
  <div data-testid="mock-nav-centered" data-open={openNav}>
    <button data-testid="nav-close-button" onClick={onCloseNav}>
      Close Nav
    </button>
  </div>
)

const MockNavHorizontal = ({ openNav, onCloseNav }: any) => (
  <div data-testid="mock-nav-horizontal" data-open={openNav}>
    <button data-testid="nav-close-button" onClick={onCloseNav}>
      Close Nav
    </button>
  </div>
)

const MockNavMini = ({ openNav, onCloseNav }: any) => (
  <div data-testid="mock-nav-mini" data-open={openNav}>
    <button data-testid="nav-close-button" onClick={onCloseNav}>
      Close Nav
    </button>
  </div>
)

const MockNavVertical = ({ openNav, onCloseNav }: any) => (
  <div data-testid="mock-nav-vertical" data-open={openNav}>
    <button data-testid="nav-close-button" onClick={onCloseNav}>
      Close Nav
    </button>
  </div>
)

const MockNavigationLayout: FC<NavigationLayoutProps> = ({
  navData,
  settings,
  setSettings,
  LogoIcon,
  AccountMenu,
  AccountMenuProps,
  ToolbarProps,
  children,
}) => {
  const isNavCentered = settings?.themeLayout === 'centered'
  const isNavHorizontal = settings?.themeLayout === 'horizontal'
  const isNavMini = settings?.themeLayout === 'mini'

  const [isNavOpen, setIsNavOpen] = React.useState(false)
  const handleOpenNav = () => setIsNavOpen(true)
  const handleCloseNav = () => setIsNavOpen(false)

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const isNavClick = target.closest('[data-testid^="mock-nav-"]')
      const isToggleClick = target.closest('[data-testid="nav-toggle-button"]')

      if (!isNavClick && !isToggleClick && isNavOpen) {
        handleCloseNav()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isNavOpen])

  if (isNavCentered) {
    return (
      <>
        <MockHeader
          onOpenNav={handleOpenNav}
          LogoIcon={LogoIcon}
          AccountMenu={AccountMenu}
          AccountMenuProps={AccountMenuProps}
        >
          <MockNavCentered openNav={isNavOpen} onCloseNav={handleCloseNav} />
        </MockHeader>
        <MockMainContainer isNavCentered>{children}</MockMainContainer>
      </>
    )
  }

  if (isNavHorizontal) {
    return (
      <>
        <MockHeader
          onOpenNav={handleOpenNav}
          LogoIcon={LogoIcon}
          AccountMenu={AccountMenu}
          AccountMenuProps={AccountMenuProps}
        />
        <MockNavHorizontal openNav={isNavOpen} onCloseNav={handleCloseNav} />
        <MockMainContainer isNavHorizontal>{children}</MockMainContainer>
      </>
    )
  }

  if (isNavMini) {
    return (
      <>
        <MockHeader
          onOpenNav={handleOpenNav}
          LogoIcon={LogoIcon}
          AccountMenu={AccountMenu}
          AccountMenuProps={AccountMenuProps}
        />
        <div data-testid="mock-box">
          <MockNavMini openNav={isNavOpen} onCloseNav={handleCloseNav} />
          <MockMainContainer isNavMini>{children}</MockMainContainer>
        </div>
      </>
    )
  }

  return (
    <>
      <MockHeader
        onOpenNav={handleOpenNav}
        LogoIcon={LogoIcon}
        AccountMenu={AccountMenu}
        AccountMenuProps={AccountMenuProps}
      />
      <div data-testid="mock-box">
        <MockNavVertical openNav={isNavOpen} onCloseNav={handleCloseNav} />
        <MockMainContainer>{children}</MockMainContainer>
      </div>
    </>
  )
}

const DefaultLogo = () => <div data-testid="mock-logo">Default Logo</div>

export const NavigationLayoutForTesting: FC<Partial<NavigationLayoutProps>> = (props) => {
  const defaultProps: NavigationLayoutProps = {
    navData: [],
    settings: {
      themeLayout: 'vertical',
      themeStretch: false,
      themeMode: 'light',
      themeContrast: 'default',
      themeColorPresets: 'default',
    },
    setSettings: cy.stub().as('setSettings'),
    ...(props.LogoIcon !== undefined ? {} : { LogoIcon: DefaultLogo }),
    ...props,
  }

  return <MockNavigationLayout {...defaultProps} />
}
