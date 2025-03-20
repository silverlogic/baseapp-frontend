import { DateTime } from 'luxon'

import { FetchParameters } from '../../../common/types'

export interface DateFilterComponentProps {
  createdFrom: DateTime | null
  createdTo: DateTime | null
  executeRefetch: (params: Partial<FetchParameters>) => void
  onApply?: () => void
  onClearFilter?: () => void
}
