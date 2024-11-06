import { TransitionStartFunction } from 'react'

import type { TextFieldProps } from '../inputs/TextField/types'

export type SearchbarProps = TextFieldProps & {
  isPending: boolean
  refetch: any
  startTransition: TransitionStartFunction
}
