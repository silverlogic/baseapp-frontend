import { FC } from 'react'

import { NavVerticalProps } from '../../../types'

const MockNavVertical: FC<NavVerticalProps & { isLgDown?: boolean }> = ({
  settings,
  setSettings,
  navData,
  LogoIcon,
  openNav,
  onCloseNav,
  hideToggleButton = false,
  isLgDown = false,
}) => {
  if (isLgDown) {
    return (
      <div data-testid="mock-vertical-drawer" data-open={openNav} onClick={onCloseNav}>
        Vertical Drawer
      </div>
    )
  }

  return (
    <div data-testid="mock-box">
      {!hideToggleButton && (
        <div data-testid="mock-nav-toggle-button" onClick={() => setSettings?.({ ...settings })}>
          Toggle
        </div>
      )}
      <div data-testid="mock-stack">
        <div data-testid="mock-scrollbar">
          {LogoIcon && (
            <div data-testid="mock-logo">
              <LogoIcon />
            </div>
          )}
          <div data-testid="mock-nav-section-vertical">Nav Section Vertical</div>
          <div data-testid="mock-spacer" />
        </div>
      </div>
    </div>
  )
}

export const NavVerticalForTesting: FC<Partial<NavVerticalProps> & { isLgDown?: boolean }> = (
  props,
) => {
  const defaultProps: NavVerticalProps = {
    navData: [],
    settings: {
      themeLayout: 'vertical',
      themeStretch: false,
      themeMode: 'light',
      themeContrast: 'default',
      themeColorPresets: 'default',
    },
    setSettings: cy.stub().as('setSettings'),
    openNav: false,
    onCloseNav: cy.stub().as('onCloseNav'),
    ...props,
  }

  return <MockNavVertical {...defaultProps} isLgDown={props.isLgDown} />
}
