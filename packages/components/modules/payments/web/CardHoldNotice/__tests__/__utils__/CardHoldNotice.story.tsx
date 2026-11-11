import { withDesignSystemTestProviders } from '@baseapp-frontend/design-system/tests/web'

import CardHoldNotice from '../../index'
import type { CardHoldNoticeProps } from '../../types'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * `CardHoldNotice` is plain props in, copy out, so one story covers every status: the spec
 * passes `status`, `holdOn` and `chargeOn` through `mount()` props.
 */
const CardHoldNoticeWithProviders = withDesignSystemTestProviders(CardHoldNotice)

export const Default = (props: Pick<CardHoldNoticeProps, 'status' | 'holdOn' | 'chargeOn'>) => (
  <div style={{ padding: 16, maxWidth: 560 }}>
    <CardHoldNoticeWithProviders {...(props as any)} />
  </div>
)
