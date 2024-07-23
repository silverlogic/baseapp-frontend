import { FormControl } from '@baseapp-frontend/utils'

import { TextFieldProps as MUITextFieldProps } from '@mui/material'

type Resposive = {
  isResponsive?: boolean
}

export type TextFieldProps = MUITextFieldProps & FormControl & Resposive
