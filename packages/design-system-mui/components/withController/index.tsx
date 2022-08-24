import { Controller } from 'react-hook-form'
import { IControlledComponentProps } from './types'

function withController(Component: any) {
  return function ({
    name,
    form,
    value,
    helperText,
    handleChange,
    ...props
  }: IControlledComponentProps) {
    if (form) {
      return (
        <Controller
          name={name}
          control={form.control}
          render={({ field, fieldState }) => {
            const showError = !!fieldState.error
            return (
              <Component
                {...field}
                error={showError}
                helperText={helperText || (showError && fieldState.error?.message)}
                {...props}
              />
            )
          }}
        ></Controller>
      )
    }

    return (
      <Component
        name={name}
        value={value}
        onChange={handleChange}
        helperText={helperText}
        {...props}
      ></Component>
    )
  }
}

export default withController
