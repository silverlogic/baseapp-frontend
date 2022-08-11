import type { TextFieldProps } from '@mui/material'

export interface IPasswordFieldProps extends ITextFieldProps {
  component?: React.ElementType<ITextFieldProps> | React.FC
  name?: string
  label?: string
  helperText?: string
  InputLabelProps?: TextFieldProps['InputLabelProps']
  InputProps?: TextFieldProps['InputProps']
  visibilityIconColor?: string
  error?: boolean
}
