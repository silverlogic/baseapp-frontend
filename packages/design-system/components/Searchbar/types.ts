import { TransitionStartFunction } from 'react'

import { FieldValues, UseFormReturn } from 'react-hook-form'

import type { TextFieldProps } from '../inputs/TextField/types'

export type SearchbarProps = Omit<TextFieldProps, 'name'> & {
  isPending: boolean
  refetch: any
  startTransition: TransitionStartFunction
  form: UseFormReturn<FieldValues, any, any>
  name: string
}
