import { ChangeEvent, FC } from 'react'

import { Controller } from 'react-hook-form'

import { WithControllerProps } from './types'

function withController<T>(Component: FC<T>) {
  return ({ name, control, helperText, ...props }: WithControllerProps<T>) => {
    if (control) {
      const { onChange, onBlur, ...restOfTheProps } = props
      return (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => {
            const handleOnChange = (event: ChangeEvent) => {
              field.onChange(event)
              onChange?.(event)
            }
            const handleOnBlur = () => {
              field.onBlur()
              onBlur?.()
            }

            return (
              <Component
                {...field}
                error={!!fieldState.error}
                name={name}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                helperText={helperText || (!!fieldState.error && fieldState.error?.message)}
                {...(restOfTheProps as any)}
              />
            )
          }}
        />
      )
    }

    return <Component name={name} helperText={helperText} {...(props as T)} />
  }
}

export default withController
