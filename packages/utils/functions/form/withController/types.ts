import { ChangeEventHandler, FocusEventHandler } from 'react'

import { FormControl } from '../../../types/form'

type OptionalActions = {
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export type WithControllerProps<T> = FormControl & T & OptionalActions
