import { ChangeEventHandler, FocusEventHandler, SyntheticEvent } from 'react'

import type { NonUndefined } from 'react-hook-form'

import { FormControl } from '../../../types/form'

type OptionalActions = {
  onChange?: (value: any) => void | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: (value?: any) => void | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  /**
   * Text-input callback for Autocomplete-style fields. Separate from `onChange`
   * (which carries the selected option) — `onInputChange` carries the typed text.
   */
  onInputChange?: (event: SyntheticEvent, value: string, reason: string) => void
}

export type DebouncedFunction = NonUndefined<OptionalActions['onChange']>

/**
 * `onInputChange`'s `(event, value, reason)` arguments packed into a single tuple,
 * because `useDebounce` debounces single-argument functions.
 */
export type InputChangeArgs = [event: SyntheticEvent, value: string, reason: string]
export type DebouncedInputChangeFunction = (args: InputChangeArgs) => void

export type WithControllerProps<T> = FormControl &
  T &
  OptionalActions & {
    /**
     * Per-instance override for the factory-time `shouldDebounce` flag.
     * `true` debounces the consumer-side onChange (RHF state still updates synchronously).
     * Leave undefined to fall back to the factory default.
     */
    shouldDebounce?: boolean
  }
