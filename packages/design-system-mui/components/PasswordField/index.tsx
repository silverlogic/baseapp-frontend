import { FC, useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

import { ITextField } from '../TextField/types'
import { StyledPasswordTextField } from './styled'

const PasswordField: FC<ITextField> = ({
  name = 'password',
  visibilityIconColor,
  InputLabelProps,
  InputProps,
  form,
  ...props
}) => {
  const [viewPassword, setViewPassword] = useState(false)
  const theme = useTheme()
  return (
    <StyledPasswordTextField
      label="Password"
      placeholder="Password"
      type={viewPassword ? 'text' : 'password'}
      name={name}
      form={form}
      InputLabelProps={{ ...InputLabelProps }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setViewPassword((state: any) => !state)}
              edge="end"
            >
              {viewPassword ? (
                <VisibilityOff
                  htmlColor={visibilityIconColor || theme.palette.grey[500]}
                  sx={{ marginRight: '4px' }}
                />
              ) : (
                <Visibility
                  htmlColor={visibilityIconColor || theme.palette.grey[500]}
                  sx={{ marginRight: '4px' }}
                />
              )}
            </IconButton>
          </InputAdornment>
        ),
        ...InputProps,
      }}
      {...props}
    />
  )
}

export default PasswordField
