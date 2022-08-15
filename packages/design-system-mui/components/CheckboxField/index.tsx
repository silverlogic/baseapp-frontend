import { ICheckboxFieldProps } from './types'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

export default function CheckboxField({
  label,
  name,
  formik,
  checked,
  handleChange,
  showError,
  errorMessage,
  helperText,
  variant = 'standard',
  CheckboxProps,
  FormControlProps,
}: ICheckboxFieldProps) {
  const _showError = (formik?.errors?.[name] && formik?.touched?.[name]) as boolean

  return (
    <FormControl
      component="fieldset"
      variant={variant}
      error={showError || _showError}
      {...FormControlProps}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={formik?.values?.[name] || checked}
            onChange={formik?.handleChange || handleChange}
            {...CheckboxProps}
          />
        }
        label={label}
      />
      {((showError && errorMessage) || _showError) && (
        <FormHelperText>{showError ? formik.errors?.[name] : errorMessage}</FormHelperText>
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
