import { IFetchParameters } from '../DateFilterComponent/types'

export interface DateFilterChipProps {
  fetchParameters: IFetchParameters
  executeRefetch: (params: Partial<IFetchParameters>) => void
}
