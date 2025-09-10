import { AutocompleteProps } from '@mui/material'

export type AutoCompleteFieldProps = AutocompleteProps<any, boolean, boolean, boolean, 'div'> & {
  isPending: boolean
  onClear?: () => void
}
