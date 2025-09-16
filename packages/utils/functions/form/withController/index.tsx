'use client'

import { ChangeEventHandler, FC, FocusEventHandler } from 'react'

import { Controller } from 'react-hook-form'

import useDebounce from '../../../hooks/useDebounce'
import type { WithControllerProps } from './types'

function withController<T>(Component: FC<T>, { shouldDebounce = false, debounceTime = 500 } = {}) {
  return ({ name, control, helperText, ...props }: WithControllerProps<T>) => {
    if (control) {
      const { onChange, onBlur, onInputChange, ...restOfTheProps } = props
      const onChangeWithFallback = onChange ?? (() => {})
      const onInputChangeWithFallback = onInputChange ?? (() => {})
      const onChangeWrapper = (params: any) => {
        const [event] = params
        onChangeWithFallback(event)
      }
      const { debouncedFunction: debouncedOnChange } = useDebounce(onChangeWrapper, {
        debounceTime,
      })
      const onInputChangeWrapper = (params: any) => {
        const [event, newInputValue] = params
        onInputChangeWithFallback(event, newInputValue)
      }
      const { debouncedFunction: debouncedOnInputChange } = useDebounce(onInputChangeWrapper, {
        debounceTime,
      })

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
                debouncedOnChange([event])
              } else {
                onChange?.(event)
              }
            }
            const handleOnInputChange = (event: any, newInputValue: any) => {
              field.onChange({ target: { value: newInputValue } })
              if (onInputChange && shouldDebounce) {
                debouncedOnInputChange([event, newInputValue])
              } else {
                onInputChange?.(event, newInputValue)
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
                onInputChange={handleOnInputChange}
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
