import React, { FC, forwardRef } from 'react'

import { Controller } from 'react-hook-form'
import type { TextInput, TextInputProps } from 'react-native'

import type { WithNativeControllerProps } from './types'

// TODO: consider moving this to @baseapp-frontend/utils
const withNativeController = <T extends TextInputProps>(Component: FC<T>) =>
  forwardRef<TextInput, WithNativeControllerProps<T>>(
    ({ name, control, helperText, ...props }, ref) => {
      if (control) {
        const { onChangeText, onBlur, ...restOfTheProps } = props

        return (
          <Controller
            name={name}
            // @ts-ignore TODO: check type inconsistency
            control={control}
            render={({ field, fieldState }) => {
              const handleOnChangeText = (text: string) => {
                field.onChange(text)
                onChangeText?.(text)
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
                  onChangeText={handleOnChangeText}
                  onBlur={handleOnBlur}
                  helperText={helperText || (!!fieldState.error && fieldState.error?.message)}
                  ref={ref}
                  {...(restOfTheProps as unknown as T)}
                />
              )
            }}
          />
        )
      }

      return (
        <Component name={name} helperText={helperText} ref={ref} {...(props as unknown as T)} />
      )
    },
  )

export default withNativeController
