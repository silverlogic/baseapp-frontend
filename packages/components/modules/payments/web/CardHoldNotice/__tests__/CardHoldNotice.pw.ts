import { expect, test } from '@playwright/test'

import type { Default } from './__utils__/CardHoldNotice.story'

const STORY = 'payments/web/CardHoldNotice/CardHoldNotice'

const HOLD_ON = '2026-11-14'
const CHARGE_ON = '2026-11-20'

const CASES = [
  {
    name: 'placed',
    props: { status: 'placed' },
    copy: 'A hold has been placed on your card. You will be charged the final amount later, and any difference is released.',
  },
  {
    name: 'scheduled-with-date',
    props: { status: 'scheduled', holdOn: HOLD_ON, chargeOn: CHARGE_ON },
    copy: 'Your card has been saved. Your card will be held on Nov 14, 2026. You will be charged on Nov 20, 2026.',
  },
  {
    name: 'scheduled-without-date',
    props: { status: 'scheduled' },
    copy: 'Your card has been saved. Your card will be held closer to the date.',
  },
  {
    name: 'card-saved',
    props: { status: 'card_saved', chargeOn: CHARGE_ON },
    copy: 'Your card has been saved and will be charged on Nov 20, 2026.',
  },
  {
    name: 'charge-now',
    props: { status: 'charge_now' },
    copy: 'Your card will be charged now.',
  },
] as const

test.describe('Component: CardHoldNotice', () => {
  for (const { name, props, copy } of CASES) {
    test(`GIVEN a ${name} hold, THEN the notice explains it and never says it failed`, async ({
      mount,
    }, testInfo) => {
      const component = await mount<typeof Default>(`${STORY}/Default`, props)
      const notice = component.getByRole('status')

      await expect(notice).toHaveText(copy)
      await expect(notice).not.toContainText(/fail/i)

      await notice.screenshot({ path: testInfo.outputPath(`card-hold-notice-${name}.png`) })
    })
  }
})
