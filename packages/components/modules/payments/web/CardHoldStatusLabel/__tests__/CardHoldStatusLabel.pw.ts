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

/** `paymentStatus` wins over `status`: a short payment, or one paid in full. */
const PAYMENT_LABELS = [
  { status: 'captured', paymentStatus: 'partially_paid', label: 'Partially paid', color: 'Warning' },
  { status: 'captured', paymentStatus: 'paid', label: 'Paid', color: 'Success' },
  { status: 'released', paymentStatus: 'paid', label: 'Paid', color: 'Success' },
  /** A failed hold staff kept, then charged: the backend leaves it `failed`. */
  { status: 'failed', paymentStatus: 'paid', label: 'Paid', color: 'Success' },
  /** The same hold as customers receive it. */
  { status: 'scheduled', paymentStatus: 'paid', label: 'Paid', color: 'Success' },
] as const

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

  for (const view of VIEWS) {
    for (const { status, paymentStatus, label, color } of PAYMENT_LABELS) {
      test(`GIVEN a ${status} hold whose payment is ${paymentStatus} in the ${view} view, THEN it reads "${label}" in the ${color.toLowerCase()} color`, async ({
        mount,
      }, testInfo) => {
        const component = await mount<typeof Default>(`${STORY}/Default`, {
          status,
          paymentStatus,
          view,
        })

        const chip = component.locator('.MuiChip-root')
        await expect(chip).toHaveText(label)
        await expect(chip).toHaveClass(new RegExp(`MuiChip-color${color}`))

        await chip.screenshot({
          path: testInfo.outputPath(`card-hold-label-${view}-${status}-${paymentStatus}.png`),
        })
      })
    }
  }

  for (const { status, label } of SHARED_LABELS.filter(({ status: s }) =>
    ['released', 'captured'].includes(s),
  )) {
    test(`GIVEN an unpaid ${status} hold, THEN it still reads "${label}"`, async ({ mount }) => {
      const component = await mount<typeof Default>(`${STORY}/Default`, {
        status,
        paymentStatus: 'unpaid',
      })

      await expect(component.locator('.MuiChip-root')).toHaveText(label)
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

    const row = (status: string, kept = false, paymentStatus = 'unpaid') =>
      component.getByTestId(`row-${status}-${kept}-${paymentStatus}`)

    for (const { status, label } of SHARED_LABELS) {
      await expect(row(status).getByTestId('customer')).toHaveText(label)
      await expect(row(status).getByTestId('staff')).toHaveText(label)
    }
    await expect(row('failed').getByTestId('customer')).toHaveText('Hold scheduled')
    await expect(row('failed', true).getByTestId('customer')).toHaveText('Hold scheduled')
    await expect(row('failed').getByTestId('staff')).toHaveText('Hold failed')
    await expect(row('failed', true).getByTestId('staff')).toHaveText('Hold failed · kept')
    for (const { status, paymentStatus, label } of PAYMENT_LABELS) {
      for (const view of VIEWS) {
        await expect(row(status, false, paymentStatus).getByTestId(view)).toHaveText(label)
      }
    }
    for (const view of VIEWS) {
      await expect(row('failed', true, 'paid').getByTestId(view)).toHaveText('Paid')
      await expect(
        row('failed', true, 'paid').getByTestId(view).locator('.MuiChip-root'),
      ).toHaveClass(/MuiChip-colorSuccess/)
    }

    await component
      .locator('table')
      .screenshot({ path: testInfo.outputPath('card-hold-label-all-states.png') })
  })
})
