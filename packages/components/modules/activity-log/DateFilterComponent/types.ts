import { Dayjs } from 'dayjs'

export interface IFetchParameters {
  createdFrom: string | null
  createdTo: string | null
  userName: string
  count: number
  cursor: string | null
}

export interface DateFilterComponentProps {
  createdFrom: Dayjs | null
  createdTo: Dayjs | null
  executeRefetch: (params: Partial<IFetchParameters>) => void
  onApply?: () => void
  onClearFilter?: () => void
}
