'use client'

import { FC } from 'react'

import { withController } from '@baseapp-frontend/utils'

import { TextField as MUITextField, MenuItem, Theme, useMediaQuery } from '@mui/material'

import { PureSelectFieldProps, SelectFieldProps } from './types'

const SelectField: FC<SelectFieldProps> = ({ isResponsive = true, options, ...props }) => {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  return (
    <MUITextField select size={isMobile && isResponsive ? 'small' : 'medium'} fullWidth {...props}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MUITextField>
  )
}

export default withController(SelectField)

// exporting the SelectField without the controller, it's useful when a component
// that inherits from SelectField needs to use the same controller
export const PureSelectField = SelectField as FC<PureSelectFieldProps>
