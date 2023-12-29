import { ChangeEventHandler, FocusEventHandler } from 'react'

import { FormControl } from '../../../types/form'

type OptionalActions = {
  onChange?: (value: any) => void | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: (value?: any) => void | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export type WithControllerProps<T> = FormControl & T & OptionalActions
