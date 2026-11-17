import { IntlShape } from 'react-intl'

import { formatDayLabel } from '../../../../__shared__/common/dates'

export const displayFormattedDate = (intl: IntlShape, date?: string | null) =>
  formatDayLabel(intl, date)
