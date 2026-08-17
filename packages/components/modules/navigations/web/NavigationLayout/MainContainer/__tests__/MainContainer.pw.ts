import { expect, test } from '@playwright/test'

/**
 * Playwright port of `MainContainer.cy.tsx` in this folder.
 *
 * Pure computed-CSS assertions across the four theme layouts — the kind jsdom
 * cannot make, and the reason these run in a real browser.
 *
 * Translation rules:
 *   cy.viewport(w, h)                        -> page.setViewportSize(...)
 *   .parent()                                -> .locator('..')
 *   .should('have.css', p, v)                -> toHaveCSS(p, v)
 *   .should('have.css', p).and('not.equal', v) -> not.toHaveCSS(p, v)
 */
const STORY = 'navigations/web/NavigationLayout/MainContainer/MainContainer'

test.describe('MainContainer Layout Styling', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
  })

  test('centers content in centered layout', async ({ mount }) => {
    const component = await mount(`${STORY}/CenteredLayout`)
    const container = component.getByRole('main', { name: 'Test Content' }).locator('..')

    await expect(container).toHaveCSS('margin', '0px')
    await expect(container).toHaveCSS('width', '1280px')
  })

  test('provides horizontal padding in horizontal layout', async ({ mount }) => {
    const component = await mount(`${STORY}/HorizontalLayout`)
    const container = component.getByRole('main', { name: 'Test Content' }).locator('..')

    await expect(container).not.toHaveCSS('padding-left', '0px')
    await expect(container).not.toHaveCSS('padding-right', '0px')
  })

  test('positions content correctly in mini layout', async ({ mount }) => {
    const component = await mount(`${STORY}/MiniLayout`)
    const container = component.getByRole('main', { name: 'Test Content' }).locator('..')

    await expect(container).toHaveCSS('width', '1000px')
  })

  test('positions content correctly in vertical layout', async ({ mount }) => {
    const component = await mount(`${STORY}/VerticalLayout`)
    const container = component.getByRole('main', { name: 'Test Content' }).locator('..')

    await expect(container).toHaveCSS('width', '1000px')
  })
})
