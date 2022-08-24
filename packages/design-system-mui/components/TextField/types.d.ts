import type { TextFieldProps } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'
import { IControlledComponentProps } from '../withController/types'

export interface IInputBaseComponentProps
  extends React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  // Accommodate arbitrary additional props coming from the `IInputProps` prop
  [arbitrary: string]: any
}

export interface IInputProps extends IInputBaseComponentProps {
  component?: React.ElementType<IInputBaseComponentProps> | React.FC<any>
  form?: UseFormReturn
  templateComponent?: React.FC<any>
  name: string
  label?: string
  helperText?: string
  value?: string
  handleChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void
}

export type ITextField = (TextFieldProps & IInputProps) | IControlledComponentProps
