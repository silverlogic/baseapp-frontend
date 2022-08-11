import { styled, makeStyles } from '@mui/material/styles'
import { TextField as MuiITextField, TextFieldProps } from '@mui/material'
import { FC } from 'react'

const TextField = styled(MuiITextField)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
})) as unknown as FC<TextFieldProps>

export { TextField }
