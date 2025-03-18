import { InputAdornmentProps, InputAdornment as MUIInputAdornment } from '@mui/material'
import { styled } from '@mui/material/styles'

export const InputAdornment = styled((props: InputAdornmentProps) => (
  <MUIInputAdornment {...props} />
))(({ theme }) => ({
  marginRight: theme.spacing(1 / 4),
  marginLeft: `-${theme.spacing(1)}`,
}))
