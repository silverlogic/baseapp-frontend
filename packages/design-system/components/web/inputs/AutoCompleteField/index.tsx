import { FC } from 'react'

import { withController } from '@baseapp-frontend/utils'

import { Autocomplete } from '@mui/material'

import { AutoCompleteFieldProps } from './types'

const AutoCompleteField: FC<AutoCompleteFieldProps> = ({ ...props }) => (
  <Autocomplete selectOnFocus handleHomeEndKeys freeSolo {...props} />
)

export default withController(AutoCompleteField, { shouldDebounce: true })
