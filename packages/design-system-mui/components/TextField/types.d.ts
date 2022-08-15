import type { TextFieldProps } from '@mui/material'

export interface IInputBaseComponentProps
  extends React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  // Accommodate arbitrary additional props coming from the `IInputProps` prop
  [arbitrary: string]: any
}

export interface IInputProps extends IInputBaseComponentProps {
  component?: React.ElementType<IInputBaseComponentProps> | React.FC<any>
  formik?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  templateComponent?: React.FC<any>
  name: string
  label?: string
  helperText?: string
  value?: string
  handleChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void
}

export type ITextField = TextFieldProps & IInputProps
