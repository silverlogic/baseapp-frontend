import type { ReactNode } from 'react'

import type { AutocompleteProps } from '@mui/material'

/**
 * Props for the design-system `AutocompleteField`.
 *
 * Mirrors MUI's `AutocompleteProps` but makes `renderInput` optional (the field
 * provides a sensible default that surfaces `isPending`) and adds the `isPending`
 * flag shared by the other DS inputs.
 *
 * The boolean flags default to `boolean` (not a literal) so any default can be
 * overridden through props without fighting MUI's conditional generics. Options
 * default to `unknown` — pass a concrete `Option` for typed
 * `options`/`getOptionLabel`/`renderOption`.
 */
export type AutocompleteFieldProps<
  Option = unknown,
  Multiple extends boolean | undefined = boolean,
  DisableClearable extends boolean | undefined = boolean,
  FreeSolo extends boolean | undefined = boolean,
> = Omit<AutocompleteProps<Option, Multiple, DisableClearable, FreeSolo>, 'renderInput'> & {
  isPending?: boolean
  placeholder?: string
  /** Forwarded to the default input (supplied by `withController` for validation). */
  error?: boolean
  /** Forwarded to the default input (supplied by `withController` for validation). */
  helperText?: ReactNode
  renderInput?: AutocompleteProps<Option, Multiple, DisableClearable, FreeSolo>['renderInput']
}
