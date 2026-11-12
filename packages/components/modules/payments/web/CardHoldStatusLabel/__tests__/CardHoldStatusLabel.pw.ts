import { expect, test } from '@playwright/test'

import type { Default } from './__utils__/CardHoldStatusLabel.story'

const STORY = 'payments/web/CardHoldStatusLabel/CardHoldStatusLabel'

/** Statuses whose label is the same for customers and staff. */
const SHARED_LABELS = [
  { status: 'pending', label: 'Processing' },
  { status: 'authorized', label: 'Card held' },
  { status: 'released', label: 'Released' },
  { status: 'captured', label: 'Charged' },
  { status: 'scheduled', label: 'Hold scheduled' },
  { status: 'saved', label: 'Card saved' },
] as const

const VIEWS = ['customer', 'staff'] as const

test.describe('Component: CardHoldStatusLabel', () => {
  for (const view of VIEWS) {
    for (const { status, label } of SHARED_LABELS) {
      test(`GIVEN a ${status} hold in the ${view} view, THEN it reads "${label}"`, async ({
        mount,
      }) => {
        const component = await mount<typeof Default>(`${STORY}/Default`, { status, view })

        await expect(component.getByText(label, { exact: true })).toBeVisible()
      })
    }
  }

  for (const kept of [false, true]) {
    test(`GIVEN a failed hold (kept: ${kept}) in the customer view, THEN it reads "Hold scheduled" and never "failed"`, async ({
      mount,
    }, testInfo) => {
      const component = await mount<typeof Default>(`${STORY}/Default`, {
        status: 'failed',
        kept,
        view: 'customer',
      })

      await expect(component.getByText('Hold scheduled', { exact: true })).toBeVisible()
      await expect(component).not.toContainText(/fail/i)

      await component
        .locator('.MuiChip-root')
        .screenshot({ path: testInfo.outputPath(`card-hold-label-customer-failed-kept-${kept}.png`) })
    })
  }

  test('GIVEN a failed hold in the staff view, THEN it reads "Hold failed" in the error color', async ({
    mount,
  }, testInfo) => {
    const component = await mount<typeof Default>(`${STORY}/Default`, {
      status: 'failed',
      view: 'staff',
    })

    const chip = component.locator('.MuiChip-root')
    await expect(chip).toHaveText('Hold failed')
    await expect(chip).toHaveClass(/MuiChip-colorError/)

    await chip.screenshot({ path: testInfo.outputPath('card-hold-label-staff-failed.png') })
  })

  test('GIVEN a failed hold that was kept in the staff view, THEN it reads "Hold failed · kept" in the warning color', async ({
    mount,
  }, testInfo) => {
    const component = await mount<typeof Default>(`${STORY}/Default`, {
      status: 'failed',
      kept: true,
      view: 'staff',
    })

    const chip = component.locator('.MuiChip-root')
    await expect(chip).toHaveText('Hold failed · kept')
    await expect(chip).toHaveClass(/MuiChip-colorWarning/)

    await chip.screenshot({ path: testInfo.outputPath('card-hold-label-staff-failed-kept.png') })
  })

  test('GIVEN every status in both views, THEN the matrix matches the label contract', async ({
    mount,
  }, testInfo) => {
    const component = await mount(`${STORY}/AllStates`)

    const row = (status: string, kept = false) => component.getByTestId(`row-${status}-${kept}`)

    for (const { status, label } of SHARED_LABELS) {
      await expect(row(status).getByTestId('customer')).toHaveText(label)
      await expect(row(status).getByTestId('staff')).toHaveText(label)
    }
    await expect(row('failed').getByTestId('customer')).toHaveText('Hold scheduled')
    await expect(row('failed', true).getByTestId('customer')).toHaveText('Hold scheduled')
    await expect(row('failed').getByTestId('staff')).toHaveText('Hold failed')
    await expect(row('failed', true).getByTestId('staff')).toHaveText('Hold failed · kept')

    await component
      .locator('table')
      .screenshot({ path: testInfo.outputPath('card-hold-label-all-states.png') })
  })
})
