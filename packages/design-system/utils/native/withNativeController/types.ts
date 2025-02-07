import type { ChangeEventHandler, FocusEventHandler } from 'react'

import type { FormControl } from '@baseapp-frontend/utils/types/form'

type OptionalActions = {
  onChangeText?: (value: any) => void | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: (value?: any) => void | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export type WithNativeControllerProps<T> = FormControl & T & OptionalActions
