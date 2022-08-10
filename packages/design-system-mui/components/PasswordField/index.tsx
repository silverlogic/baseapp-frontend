import { useState, ReactElement } from 'react'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { TextField } from './styled'
import { useTheme } from '@mui/material'
import { IPasswordFieldProps } from './types'

function PasswordField({
  name = 'password',
  visibilityIconColor,
  InputLabelProps,
  InputProps,
  ...props
}: IPasswordFieldProps): ReactElement {
  const [viewPassword, setViewPassword] = useState(false)
  const theme = useTheme()
  return (
    <TextField
      label="Password"
      placeholder="Password"
      type={viewPassword ? 'text' : 'password'}
      name={name}
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
