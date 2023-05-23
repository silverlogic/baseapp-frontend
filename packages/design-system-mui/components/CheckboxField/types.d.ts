import { ChangeEvent } from 'react'

import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'

export interface ICheckboxFieldProps {
  label?: string | JSX.Element
  showError: boolean
  errorMessage?: string
  helperText?: string
  variant?: 'standard' | 'outlined' | 'filled'
  form?: UseFormReturn
  name: string
  showError?: boolean
  checked?: boolean
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void
  CheckboxProps?: CheckboxProps
  FormControlProps?: FormControlProps
}

interface IControlledCheckBoxProps extends ControllerRenderProps {
  checked?: boolean
  [x: string]: any
}
