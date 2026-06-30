'use client'

import { FC } from 'react'

import { withController } from '@baseapp-frontend/utils'

import {
  Autocomplete,
  AutocompleteRenderInputParams,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material'

import { AutocompleteFieldProps } from './types'

/**
 * Design-system autocomplete/combobox input. Wraps MUI `Autocomplete` with the
 * conventions shared by the other DS inputs (RHF integration via `withController`,
 * debounced text input, an `isPending` spinner) and a default `renderInput` so the
 * common case needs no boilerplate.
 *
 * Defaults suit a `freeSolo` search-style field; every default is overridable
 * through props (e.g. pass `freeSolo={false}` for a strict select).
 */
const AutocompleteField: FC<AutocompleteFieldProps> = ({
  isPending = false,
  placeholder = 'Search',
  renderInput,
  selectOnFocus = true,
  handleHomeEndKeys = true,
  disableClearable = true,
  freeSolo = true,
  error,
  helperText,
  ...props
}) => (
  <Autocomplete
    selectOnFocus={selectOnFocus}
    handleHomeEndKeys={handleHomeEndKeys}
    disableClearable={disableClearable}
    freeSolo={freeSolo}
    renderInput={
      renderInput ??
      ((params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            startAdornment: isPending ? (
              <InputAdornment position="start">
                <CircularProgress size={16} />
              </InputAdornment>
            ) : (
              params.InputProps.startAdornment
            ),
          }}
        />
      ))
    }
    {...props}
  />
)

export default withController(AutocompleteField, { shouldDebounce: true })
