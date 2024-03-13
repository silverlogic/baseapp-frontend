import { withController } from '@baseapp-frontend/core'

import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import { FieldValues } from 'react-hook-form'

import { ICheckboxFieldProps, IControlledCheckBoxProps } from './types'

const ControlledCheckBox = withController(
  ({ checked = false, value, ...props }: IControlledCheckBoxProps) => (
    <Checkbox checked={checked || value} {...props} />
  ),
)
const CheckboxField = <TForm extends FieldValues>({
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
}: ICheckboxFieldProps<TForm>) => {
  const formError = form?.formState?.errors?.[name]?.message
  // @ts-ignore TODO: (BA-1081) investigate react-hook-form types
  const innerShowError = (formError && form?.formState?.touchedFields?.[name]) as boolean

  return (
    <FormControl
      component="fieldset"
      variant={variant}
      error={showError || innerShowError}
      {...FormControlProps}
    >
      <FormControlLabel
        control={
          <ControlledCheckBox
            form={form}
            checked={checked}
            handleChange={handleChange}
            {...CheckboxProps}
          />
        }
        label={label}
      />
      {((showError && errorMessage) || innerShowError) && (
        <FormHelperText>{showError ? (formError as string) : errorMessage}</FormHelperText>
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default CheckboxField
