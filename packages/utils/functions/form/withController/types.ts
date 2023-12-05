import { FormControl } from '../../../types/form'

type OptionalActions = {
  onChange?: (value: any) => void
  onBlur?: () => void
}

export type WithControllerProps<T> = FormControl & T & OptionalActions
