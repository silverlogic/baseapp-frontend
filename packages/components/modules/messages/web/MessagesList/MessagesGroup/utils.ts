import { formatDayLabel } from '@baseapp-frontend/utils'

import { IntlShape } from 'react-intl'

export const displayFormattedDate = (intl: IntlShape, date?: string | null) =>
  formatDayLabel(date, { intl })
