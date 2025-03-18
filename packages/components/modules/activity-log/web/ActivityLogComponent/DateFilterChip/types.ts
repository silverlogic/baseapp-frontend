import { FetchParameters } from '../../../common/types'

export interface DateFilterChipProps {
  fetchParameters: FetchParameters
  executeRefetch: (params: Partial<FetchParameters>) => void
}
