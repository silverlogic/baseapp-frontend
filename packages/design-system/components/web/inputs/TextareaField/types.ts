import { TextFieldProps } from '../TextField/types'

type TextareaOptions = {
  hideBorder?: boolean
  resizable?: boolean
}

export type TextareaFieldProps = TextFieldProps & TextareaOptions
