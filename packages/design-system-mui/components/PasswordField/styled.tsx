import { styled } from '@mui/material/styles'
import TextField from '../TextField'

const StyledPasswordTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}))

export { StyledPasswordTextField }
