import { RequireAllOrNone } from '@baseapp-frontend/utils'

import { ButtonProps } from '@mui/material'
import { Control, FieldValues, UseFormSetValue } from 'react-hook-form'

type ControlProps = RequireAllOrNone<{
  control?: Control<FieldValues[string]>
}>

type AvatarProps = {
  name: string
  // TODO type this better
  setFile: UseFormSetValue<any>
  label: string
}

type FileInputProps = {
  accept?: string
  maxSize?: number
}

type CustomButtonProps = Exclude<ButtonProps, 'name'>

export type FileUploadButtonProps = CustomButtonProps & ControlProps & AvatarProps & FileInputProps
