import { DateTime } from 'luxon'

export interface IFetchParameters {
  createdFrom: string | null
  createdTo: string | null
  userName: string
  count: number
  cursor: string | null
}

export interface DateFilterComponentProps {
  createdFrom: DateTime | null
  createdTo: DateTime | null
  executeRefetch: (params: Partial<IFetchParameters>) => void
  onApply?: () => void
  onClearFilter?: () => void
}
