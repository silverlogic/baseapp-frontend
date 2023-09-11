import { FC } from 'react'

import { Controller } from 'react-hook-form'

import { WithControllerProps } from './types'

function withController<T>(Component: FC<T>) {
  return ({ name, control, ...props }: WithControllerProps<T>) => {
    if (control) {
      return (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <Component {...field} error={fieldState.error} name={name} {...(props as any)} />
          )}
        />
      )
    }

    return <Component name={name} {...(props as T)} />
  }
}

export default withController
