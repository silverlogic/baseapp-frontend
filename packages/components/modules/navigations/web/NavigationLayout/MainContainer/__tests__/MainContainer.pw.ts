import { type Locator, expect, test } from '@playwright/test'

/**
 * Pure computed-CSS assertions across the four theme layouts — the kind jsdom
 * cannot make, and the reason these run in a real browser.
 */
const STORY = 'navigations/web/NavigationLayout/MainContainer/MainContainer'

const container = (component: Locator) =>
  component.getByRole('main', { name: 'Test Content' }).locator('..')

test.describe('Component: MainContainer', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
  })

  test('GIVEN the centered layout, THEN the content fills the viewport without a margin', async ({
    mount,
  }) => {
    const component = await mount(`${STORY}/CenteredLayout`)

    await expect(container(component)).toHaveCSS('margin', '0px')
    await expect(container(component)).toHaveCSS('width', '1280px')
  })

  test('GIVEN the horizontal layout, THEN the content keeps horizontal padding', async ({
    mount,
  }) => {
    const component = await mount(`${STORY}/HorizontalLayout`)

    await expect(container(component)).not.toHaveCSS('padding-left', '0px')
    await expect(container(component)).not.toHaveCSS('padding-right', '0px')
  })

  test('GIVEN the mini layout, THEN the content leaves room for the rail', async ({ mount }) => {
    const component = await mount(`${STORY}/MiniLayout`)

    await expect(container(component)).toHaveCSS('width', '1000px')
  })

  test('GIVEN the vertical layout, THEN the content leaves room for the drawer', async ({
    mount,
  }) => {
    const component = await mount(`${STORY}/VerticalLayout`)

    await expect(container(component)).toHaveCSS('width', '1000px')
  })
})
