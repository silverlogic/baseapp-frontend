import { FC } from 'react'

import { withController } from '@baseapp-frontend/utils'

import { Autocomplete } from '@mui/material'

import { AutocompleteFieldProps } from './types'

const AutocompleteField: FC<AutocompleteFieldProps> = ({ ...props }) => (
  <Autocomplete selectOnFocus handleHomeEndKeys disableClearable freeSolo {...props} />
)

export default withController(AutocompleteField, { shouldDebounce: true })
