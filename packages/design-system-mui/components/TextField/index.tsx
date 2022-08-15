import MuiTextField from '@mui/material/TextField'
import { ITextField } from './types'

function TextField({ name, formik, helperText, value, handleChange, ...props }: ITextField) {
  const showError = (formik?.errors?.[name] && formik?.touched?.[name]) as boolean
  return (
    <MuiTextField
      name={name}
      onChange={formik?.handleChange || handleChange}
      value={formik?.values?.[name] || value}
      error={showError}
      helperText={showError ? formik.errors?.[name] : helperText}
      {...props}
    />
  )
}

export default TextField
