import { Control, ControllerProps, FieldValues } from 'react-hook-form'

import { RequireAllOrNone } from './typescript'

export type ControlProps = RequireAllOrNone<{
  control?: Control<FieldValues[string]>
  name?: ControllerProps<FieldValues>['name']
}>

export type FormControl = ControlProps & {
  helperText?: any
}
