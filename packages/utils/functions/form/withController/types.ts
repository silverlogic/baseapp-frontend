import { ChangeEventHandler, FocusEventHandler } from 'react'

import type { NonUndefined } from 'react-hook-form'

import { FormControl } from '../../../types/form'

type OptionalActions = {
  onChange?: (value: any) => void | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: (value?: any) => void | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onInputChange?: (event: any, newInputValue: any) => void
}

export type DebouncedFunction = NonUndefined<OptionalActions['onChange']>

export type WithControllerProps<T> = FormControl & T & OptionalActions
