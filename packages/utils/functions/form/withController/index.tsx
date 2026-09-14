'use client'

import { FC, FocusEventHandler, SyntheticEvent, useRef } from 'react'

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

      // useDebounce memoizes its function once, so a debounced wrapper that closed
      // directly over the callbacks would keep calling the first render's closure.
      // Read the latest callbacks from refs so prop updates take effect.
      const onChangeRef = useRef(onChangeWithFallback)
      onChangeRef.current = onChangeWithFallback
      const onInputChangeRef = useRef(onInputChangeWithFallback)
      onInputChangeRef.current = onInputChangeWithFallback

      const { debouncedFunction: debouncedOnChange } = useDebounce<DebouncedFunction>(
        (event) => onChangeRef.current(event),
        { debounceTime },
      )
      // useDebounce debounces single-argument functions, so pack onInputChange's
      // (event, value, reason) arguments into one tuple and spread them back out.
      const { debouncedFunction: debouncedOnInputChange } =
        useDebounce<DebouncedInputChangeFunction>((args) => onInputChangeRef.current(...args), {
          debounceTime,
        })
      const shouldDebounce = runtimeShouldDebounce ?? factoryShouldDebounce

      return (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => {
            // Autocomplete-style components pass the selected value as the second
            // argument; plain inputs pass only the change event (react-hook-form
            // reads the value from event.target). Debounce applies only to the
            // free-text path, never to a discrete selection.
            const handleOnChange = (event: unknown, ...rest: unknown[]) => {
              const hasSelectedValue = rest.length > 0
              field.onChange(hasSelectedValue ? rest[0] : event)
              if (onChange && shouldDebounce && !hasSelectedValue) {
                debouncedOnChange(event)
              } else {
                onChange?.(event, ...rest)
              }
            }
            // Free-text input for Autocomplete-style fields. Debounce the consumer
            // callback so async option queries don't fire on every keystroke; the
            // selected value flows through onChange above, so this never overwrites
            // the form field with the raw text.
            const handleOnInputChange = (event: SyntheticEvent, value: string, reason: string) => {
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
