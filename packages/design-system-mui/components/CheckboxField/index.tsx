import { ICheckboxFieldProps } from './types'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import withController from '../withController'

const ControlledCheckBox = withController(({ checked, value, helperText, ...props }) => (
  <Checkbox checked={checked || value} {...props} />
))

export default function CheckboxField({
  label,
  name,
  form,
  checked,
  handleChange,
  showError,
  errorMessage,
  helperText,
  variant = 'standard',
  CheckboxProps,
  FormControlProps,
}: ICheckboxFieldProps) {
  const formErrors = form?.formState?.errors?.[name]
  const _showError = (formErrors && form?.formState?.touchedFields?.[name]) as boolean

  return (
    <FormControl
      component="fieldset"
      variant={variant}
      error={showError || _showError}
      {...FormControlProps}
    >
      <FormControlLabel
        control={
          <ControlledCheckBox
            form={form}
            checked={checked}
            handleChange={handleChange}
            {...CheckboxProps}
          ></ControlledCheckBox>
        }
        label={label}
      />
      {((showError && errorMessage) || _showError) && (
        <FormHelperText>{showError ? formErrors : errorMessage}</FormHelperText>
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
