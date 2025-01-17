'use client'

import { FC } from 'react'

import { withController } from '@baseapp-frontend/utils'

import { TextField as MUITextField, Theme, useMediaQuery } from '@mui/material'

import { PureTextFieldProps, TextFieldProps } from './types'

const TextField: FC<TextFieldProps> = ({ isResponsive = true, ...props }) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  return <MUITextField size={isMobile && isResponsive ? 'small' : 'medium'} fullWidth {...props} />
}

export default withController(TextField)

// exporting the TextField without the controller, it's useful when a component
// that inherits from TextField needs to use the same controller
export const PureTextField = TextField as FC<PureTextFieldProps>
