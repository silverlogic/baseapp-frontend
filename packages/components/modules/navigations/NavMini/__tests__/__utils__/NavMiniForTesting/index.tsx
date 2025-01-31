import { FC } from 'react'

import { NavMiniProps } from '../../../types'

const MockNavSectionMini = ({ navData, collapsed = true }: any) => (
  <div data-testid="mock-nav-section-mini" data-collapsed={collapsed}>
    {navData.map((group: any) =>
      group.items.map((item: any) => (
        <div key={item.title} data-testid="mock-nav-item">
          {item.icon && <div data-testid="mock-nav-item-icon">{item.icon}</div>}
          {!collapsed && <div data-testid="mock-nav-item-label">{item.title}</div>}
        </div>
      )),
    )}
  </div>
)

const MockNavMini: FC<NavMiniProps & { isLgDown?: boolean }> = ({
  navData,
  settings,
  setSettings,
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

  const isCollapsed = settings?.themeLayout === 'mini'

  const handleToggle = () => {
    if (setSettings && settings) {
      setSettings({
        ...settings,
        themeLayout: isCollapsed ? 'vertical' : 'mini',
      })
    }
  }

  return (
    <div data-testid="mock-box">
      {!hideToggleButton && (
        <div data-testid="mock-nav-toggle-button" onClick={handleToggle}>
          Toggle
        </div>
      )}
      <div data-testid="mock-stack">
        {LogoIcon && (
          <div data-testid="mock-logo">
            <LogoIcon />
          </div>
        )}
        <MockNavSectionMini navData={navData} collapsed={isCollapsed} />
      </div>
    </div>
  )
}

export const NavMiniForTesting: FC<Partial<NavMiniProps> & { isLgDown?: boolean }> = (props) => {
  const defaultProps: NavMiniProps = {
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
    settings: {
      themeLayout: 'mini',
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

  return <MockNavMini {...defaultProps} isLgDown={props.isLgDown} />
}
