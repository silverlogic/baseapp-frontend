import { FC } from 'react'

import { HeaderProps } from '../../../types'

// Remove the mocks import and define components inline
const MockLogo = ({ children, sx }: any) => (
  <div data-testid="mock-logo" style={sx}>
    {children}
  </div>
)

const MockMenuIcon = () => <div data-testid="mock-menu-icon">MenuIcon</div>

const MockIconButton = ({ children, onClick, sx }: any) => (
  <button data-testid="mock-icon-button" onClick={onClick} style={sx}>
    {children}
  </button>
)

const MockToolbar = ({ children, sx, ...props }: any) => (
  <div data-testid="mock-toolbar" style={sx} {...props}>
    {children}
  </div>
)

const MockCustomAppBar = ({ children, themeLayout }: any) => (
  <header data-testid="mock-app-bar" data-theme-layout={themeLayout}>
    {children}
  </header>
)

const MockLogoIcon = () => <div data-testid="mock-logo-icon">LogoIcon</div>

const defaultSettings = {
  themeLayout: 'vertical',
  themeStretch: false,
  themeMode: 'light',
  themeContrast: 'default',
  themeColorPresets: 'default',
}

const MockHeader: FC<HeaderProps> = ({
  settings,
  children,
  onOpenNav,
  LogoIcon,
  AccountMenu = ({ children }) => <div>{children}</div>,
  AccountMenuProps,
  ToolbarProps,
}) => {
  const isNavHorizontal = settings.themeLayout === 'horizontal'
  const isNavCentered = settings.themeLayout === 'centered'

  return (
    <MockCustomAppBar themeLayout={settings.themeLayout}>
      <MockToolbar
        sx={{
          height: 1,
          px: { lg: 5 },
          justifyContent: 'center',
          gap: 2,
        }}
        {...ToolbarProps}
      >
        {LogoIcon && (isNavHorizontal || isNavCentered) && (
          <MockLogo
            sx={{
              display: { xs: 'none', lg: 'flex' },
            }}
          >
            <LogoIcon />
          </MockLogo>
        )}
        <MockIconButton
          onClick={onOpenNav}
          sx={{
            display: { xs: 'flex', lg: 'none' },
          }}
        >
          <MockMenuIcon />
        </MockIconButton>
        <AccountMenu {...AccountMenuProps}>{children}</AccountMenu>
      </MockToolbar>
    </MockCustomAppBar>
  )
}

export const HeaderForTesting: FC<Partial<HeaderProps>> = (props) => {
  const defaultProps: HeaderProps = {
    settings: {
      themeLayout: 'vertical' as const,
      themeStretch: false,
      themeMode: 'light' as const,
      themeContrast: 'default' as const,
      themeColorPresets: 'default' as const,
    },
    onOpenNav: cy.stub().as('onOpenNav'),
    ...props,
  }

  return <MockHeader {...defaultProps} />
}

export const HeaderWithLogoForTesting: FC<Partial<HeaderProps>> = (props) => {
  return <HeaderForTesting LogoIcon={MockLogoIcon} {...props} />
}
