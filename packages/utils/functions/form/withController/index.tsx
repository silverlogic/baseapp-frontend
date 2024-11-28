'use client'

import { ChangeEventHandler, FC, FocusEventHandler } from 'react'

import { Controller } from 'react-hook-form'

import useDebounce from '../../../hooks/useDebounce'
import type { DebouncedFunction, WithControllerProps } from './types'

function withController<T>(Component: FC<T>, { shouldDebounce = false, debounceTime = 500 } = {}) {
  return ({ name, control, helperText, ...props }: WithControllerProps<T>) => {
    if (control) {
      const { onChange, onBlur, ...restOfTheProps } = props
      const onChangeWithFallback = onChange ?? (() => {})
      const { debouncedFunction: debouncedOnChange } = useDebounce<DebouncedFunction>(
        onChangeWithFallback,
        {
          debounceTime,
        },
      )

      return (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => {
            const handleOnChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
              event,
            ) => {
              field.onChange(event)
              if (onChange && shouldDebounce) {
                debouncedOnChange(event)
              } else {
                onChange?.(event)
              }
            }
            const handleOnBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
              event,
            ) => {
              field.onBlur()
              onBlur?.(event)
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
