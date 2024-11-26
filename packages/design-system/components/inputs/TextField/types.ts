import { FormControl } from '@baseapp-frontend/utils'

import { TextFieldProps as MUITextFieldProps } from '@mui/material'

type Responsive = {
  isResponsive?: boolean
}

export type TextFieldProps = MUITextFieldProps & FormControl & Responsive

export type PureTextFieldProps = MUITextFieldProps & Responsive
