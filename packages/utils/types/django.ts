import { ORDERING_DIRECTION } from '../constants/django'
import { ValueOf } from './typescript'

export interface DjangoPaginatedResponse<Result = any> {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}

export type OrderingDirection = ValueOf<typeof ORDERING_DIRECTION>
