import { FC } from 'react'

import { NavCenteredProps } from '../../../types'

// Mock components inline
const MockScrollbar = ({ children, sx }: any) => (
  <div data-testid="mock-scrollbar" style={sx}>
    {children}
  </div>
)

const MockNavSectionHorizontal = ({ navData, hasTabLayout }: any) => (
  <div data-testid="mock-nav-section-horizontal" data-has-tab-layout={hasTabLayout}>
    Nav Section
  </div>
)

const MockVerticalDrawer = ({ navData, openNav, onCloseNav }: any) => (
  <div data-testid="mock-vertical-drawer" data-open={openNav} onClick={onCloseNav}>
    Vertical Drawer
  </div>
)

const MockNavCentered: FC<NavCenteredProps & { isLgDown?: boolean }> = ({
  navData,
  openNav,
  onCloseNav,
  isLgDown = false,
}) => {
  if (isLgDown) {
    return (
      <>
        <div data-testid="mock-vertical-drawer" data-open={openNav} onClick={onCloseNav}>
          Vertical Drawer
        </div>
        <div />
      </>
    )
  }

  return (
    <div data-testid="mock-scrollbar">
      <div data-testid="mock-nav-section-horizontal" data-has-tab-layout>
        Nav Section
      </div>
    </div>
  )
}

export const NavCenteredForTesting: FC<Partial<NavCenteredProps> & { isLgDown?: boolean }> = (
  props,
) => {
  const defaultProps: NavCenteredProps = {
    navData: [],
    openNav: false,
    onCloseNav: cy.stub().as('onCloseNav'),
    ...props,
  }

  return <MockNavCentered {...defaultProps} isLgDown={props.isLgDown} />
}
