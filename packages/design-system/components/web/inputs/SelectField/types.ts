import { FormControl } from '@baseapp-frontend/utils'

import { TextFieldProps as MUITextFieldProps } from '@mui/material'

type Responsive = {
  isResponsive?: boolean
}

export type SelectOption = {
  value: string
  label: string
}

export type SelectFieldProps = Omit<MUITextFieldProps, 'select'> &
  FormControl &
  Responsive & {
    options: SelectOption[]
  }

export type PureSelectFieldProps = Omit<MUITextFieldProps, 'select'> &
  Responsive & {
    options: SelectOption[]
  }
