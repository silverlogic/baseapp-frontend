import { FC } from 'react'

import { VerticalDrawerProps } from '../../../types'

const MockNavSectionVertical = ({ navData }: any) => (
  <div data-testid="mock-nav-section-vertical">
    {navData.map((group: any) =>
      group.items.map((item: any) => (
        <div key={item.title} data-testid="mock-nav-item" data-path={item.path}>
          {item.title}
        </div>
      )),
    )}
  </div>
)

const MockVerticalDrawer: FC<VerticalDrawerProps> = ({
  navData,
  LogoIcon,
  openNav,
  onCloseNav,
}) => (
  <div data-testid="mock-drawer" data-open={openNav} onClick={onCloseNav} style={{ width: 280 }}>
    <div data-testid="mock-scrollbar">
      {LogoIcon && (
        <div data-testid="mock-logo">
          <LogoIcon />
        </div>
      )}
      <MockNavSectionVertical navData={navData} />
      <div data-testid="mock-spacer" style={{ flexGrow: 1 }} />
    </div>
  </div>
)

export const VerticalDrawerForTesting: FC<Partial<VerticalDrawerProps>> = (props) => {
  const defaultProps: VerticalDrawerProps = {
    navData: [
      {
        subheader: 'Test Group',
        items: [
          {
            title: 'Test Item 1',
            path: '/test1',
            icon: <div>icon1</div>,
          },
          {
            title: 'Test Item 2',
            path: '/test2',
            icon: <div>icon2</div>,
          },
        ],
      },
    ],
    openNav: false,
    onCloseNav: cy.stub().as('onCloseNav'),
    ...props,
  }

  return <MockVerticalDrawer {...defaultProps} />
}
