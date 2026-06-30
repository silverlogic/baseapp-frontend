'use client'

import { ChangeEventHandler, FC, FocusEventHandler } from 'react'

import { Controller } from 'react-hook-form'

import useDebounce from '../../../hooks/useDebounce'
import type { DebouncedFunction, DebouncedInputChangeFunction, WithControllerProps } from './types'

function withController<T>(
  Component: FC<T>,
  { shouldDebounce: factoryShouldDebounce = false, debounceTime = 500 } = {},
) {
  return ({
    name,
    control,
    helperText,
    shouldDebounce: runtimeShouldDebounce,
    ...props
  }: WithControllerProps<T>) => {
    if (control) {
      const { onChange, onBlur, onInputChange, ...restOfTheProps } = props
      const onChangeWithFallback = onChange ?? (() => {})
      const onInputChangeWithFallback = onInputChange ?? (() => {})
      const { debouncedFunction: debouncedOnChange } = useDebounce<DebouncedFunction>(
        onChangeWithFallback,
        {
          debounceTime,
        },
      )
      // useDebounce debounces single-argument functions, so pack onInputChange's
      // (event, value, reason) arguments into one tuple and spread them back out.
      const { debouncedFunction: debouncedOnInputChange } =
        useDebounce<DebouncedInputChangeFunction>((args) => onInputChangeWithFallback(...args), {
          debounceTime,
        })
      const shouldDebounce = runtimeShouldDebounce ?? factoryShouldDebounce

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
            // Autocomplete-style fields surface the typed text through onInputChange
            // (onChange carries the selected option). Keep the RHF value in sync with
            // the input text, and debounce the consumer callback when enabled.
            const handleOnInputChange = (event: unknown, value: string, reason: string) => {
              field.onChange(value)
              if (onInputChange && shouldDebounce) {
                debouncedOnInputChange([event, value, reason])
              } else {
                onInputChange?.(event, value, reason)
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
                onInputChange={onInputChange ? handleOnInputChange : undefined}
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
