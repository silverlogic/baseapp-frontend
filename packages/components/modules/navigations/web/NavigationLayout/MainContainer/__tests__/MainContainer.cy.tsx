import { ThemeProvider } from '@baseapp-frontend/design-system/providers/web'
import { ThemeProviderProps } from '@baseapp-frontend/design-system/providers/web'
import {
  PresetType,
  ThemeContrast,
  ThemeLayout,
  ThemeMode,
  breakpoints,
  createCustomShadows,
  createPalette,
  createShadows,
  typography,
} from '@baseapp-frontend/design-system/styles/web'

import MainContainer from '..'

const createTheme = (layout: ThemeLayout = 'vertical') =>
  ({
    palette: createPalette('light'),
    breakpoints,
    settings: {
      themeMode: 'light' as ThemeMode,
      themeContrast: 'default' as ThemeContrast,
      themeLayout: layout,
      themeColorPresets: 'default' as PresetType,
      themeStretch: false,
    },
    shadows: createShadows('light'),
    customShadows: createCustomShadows('light'),
    typography,
    primaryFont: undefined,
    secondaryFont: undefined,
  }) as ThemeProviderProps

describe('MainContainer Layout Styling', () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
  })

  it('centers content in centered layout', () => {
    cy.mount(
      <ThemeProvider {...createTheme('centered')}>
        <MainContainer isNavCentered>
          <div role="main" aria-label="Test Content">
            Test Content
          </div>
        </MainContainer>
      </ThemeProvider>,
    )

    cy.findByRole('main', { name: 'Test Content' })
      .parent()
      .should('have.css', 'margin', '0px')
      .and('have.css', 'width', '1280px')
  })

  it('provides horizontal padding in horizontal layout', () => {
    cy.mount(
      <ThemeProvider {...createTheme('horizontal')}>
        <MainContainer>
          <div role="main" aria-label="Test Content">
            Test Content
          </div>
        </MainContainer>
      </ThemeProvider>,
    )

    cy.findByRole('main', { name: 'Test Content' })
      .parent()
      .should('have.css', 'padding-left')
      .and('not.equal', '0px')

    cy.findByRole('main', { name: 'Test Content' })
      .parent()
      .should('have.css', 'padding-right')
      .and('not.equal', '0px')
  })

  it('positions content correctly in mini layout', () => {
    cy.mount(
      <ThemeProvider {...createTheme('mini')}>
        <MainContainer>
          <div role="main" aria-label="Test Content">
            Test Content
          </div>
        </MainContainer>
      </ThemeProvider>,
    )

    cy.findByRole('main', { name: 'Test Content' }).parent().should('have.css', 'width', '1000px')
  })

  it('positions content correctly in vertical layout', () => {
    cy.mount(
      <ThemeProvider {...createTheme('vertical')}>
        <MainContainer>
          <div role="main" aria-label="Test Content">
            Test Content
          </div>
        </MainContainer>
      </ThemeProvider>,
    )

    cy.findByRole('main', { name: 'Test Content' }).parent().should('have.css', 'width', '1000px')
  })
})
