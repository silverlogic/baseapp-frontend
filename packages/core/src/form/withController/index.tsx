import { Controller } from 'react-hook-form'

import { IControlledComponentProps } from './types'

export function withController(Component: any) {
  return ({ name, form, value, helperText, handleChange, ...props }: IControlledComponentProps) => {
    if (form) {
      return (
        // @ts-ignore TODO: (BA-1081) investigate 'Controller' cannot be used as a JSX component error.
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
