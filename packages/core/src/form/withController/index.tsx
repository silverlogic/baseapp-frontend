import { Controller } from 'react-hook-form'

import { IControlledComponentProps } from './types'

export function withController(Component: any) {
  return ({ name, form, value, helperText, handleChange, ...props }: IControlledComponentProps) => {
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
        />
      )
    }

    return (
      <Component
        name={name}
        value={value}
        onChange={handleChange}
        helperText={helperText}
        {...props}
      />
    )
  }
}
