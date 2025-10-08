import { AutocompleteProps } from '@mui/material'

export type AutocompleteFieldProps = AutocompleteProps<any, boolean, boolean, boolean, 'div'> & {
  isPending: boolean
  onClear?: () => void
}
