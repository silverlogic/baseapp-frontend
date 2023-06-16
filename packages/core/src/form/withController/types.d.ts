import { UseFormReturn } from 'react-hook-form'

interface IControllerProps {
  name: string
  helperText?: string
  [x: string]: any
}

interface IBasicControllerProps extends IControllerProps {
  value?: any
  handleChange?: any
}

interface IFormControllerProps extends IControllerProps {
  form: UseFormReturn
}

export type IControlledComponentProps = IFormControllerProps | IBasicControllerProps
