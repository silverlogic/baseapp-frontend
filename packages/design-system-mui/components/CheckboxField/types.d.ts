import { UseFormReturn, ControllerRenderProps } from 'react-hook-form'

export interface ICheckboxFieldProps {
  label?: string
  showError: boolean
  errorMessage?: string
  helperText?: string
  variant?: 'standard' | 'outlined' | 'filled'
  form?: UseFormReturn
  name: string
  showError?: boolean
  checked?: boolean
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  CheckboxProps?: CheckboxProps
  FormControlProps?: FormControlProps
}

interface IControlledCheckBoxProps extends ControllerRenderProps {
  checked?: boolean
  [x: string]: any
}
