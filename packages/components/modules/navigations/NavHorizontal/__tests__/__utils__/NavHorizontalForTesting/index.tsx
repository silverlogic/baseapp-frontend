import { FC } from 'react'

import { NavHorizontalProps } from '../../../types'

const MockNavHorizontal: FC<NavHorizontalProps & { isLgDown?: boolean }> = ({
  navData,
  settings,
  openNav,
  onCloseNav,
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
    <div data-testid="mock-app-bar">
      <div data-testid="mock-toolbar">
        <div data-testid="mock-scrollbar">
          <div
            data-testid="mock-nav-section-horizontal"
            data-theme={settings?.themeMode}
            data-color={settings?.themeColorPresets}
          >
            Nav Section
          </div>
        </div>
      </div>
      <div data-testid="mock-header-shadow" />
    </div>
  )
}

export const NavHorizontalForTesting: FC<Partial<NavHorizontalProps> & { isLgDown?: boolean }> = (
  props,
) => {
  const defaultProps: NavHorizontalProps = {
    settings: {
      themeLayout: 'horizontal',
      themeStretch: false,
      themeMode: 'light',
      themeContrast: 'default',
      themeColorPresets: 'default',
    },
    navData: [],
    openNav: false,
    onCloseNav: cy.stub().as('onCloseNav'),
    ...props,
  }

  return <MockNavHorizontal {...defaultProps} isLgDown={props.isLgDown} />
}
