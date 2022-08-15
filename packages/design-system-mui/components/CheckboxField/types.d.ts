export interface ICheckboxFieldProps {
  label?: string
  showError: boolean
  errorMessage?: string
  helperText?: string
  variant?: 'standard' | 'outlined' | 'filled'
  formik?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  name: string
  showError?: boolean
  checked?: boolean
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  CheckboxProps?: CheckboxProps
  FormControlProps?: FormControlProps
}
