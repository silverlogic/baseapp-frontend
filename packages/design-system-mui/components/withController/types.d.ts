import { Controller, UseFormReturn } from 'react-hook-form'

interface ControllerProps {
  name: string
  helperText?: string
  [x: string]: any
}

interface BasicControllerProps extends ControllerProps {
  value: any
  handleChange: (event?: any) => void
}

interface FormControllerProps extends ControllerProps {
  form: UseFormReturn
}

export type ControlledComponentProps = FormControllerProps | BasicControllerProps
