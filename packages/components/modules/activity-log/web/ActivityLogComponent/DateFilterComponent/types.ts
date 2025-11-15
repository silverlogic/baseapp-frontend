import { FetchParameters } from '../../../common/types'

export interface DateFilterComponentProps {
  createdFrom: Date | null
  createdTo: Date | null
  executeRefetch: (params: Partial<FetchParameters>) => void
  onApply?: () => void
  onClearFilter?: () => void
}
