import { Control, ControllerProps, FieldError, FieldValues } from 'react-hook-form'

import { RequireAllOrNone } from './typescript'

export interface IFormControl extends Pick<ControllerProps, 'name'> {
  control?: Control<FieldValues[string]>
  error?: FieldError
  enableError?: boolean
}

export type ControlProps = RequireAllOrNone<{
  control?: Control<FieldValues[string]>
  name?: ControllerProps<FieldValues>['name']
}>

export type FormControl = ControlProps & {
  error?: FieldError
  enableError?: boolean
}
