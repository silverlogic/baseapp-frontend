import { FC } from 'react'

import { TextField } from '@mui/material'

import { ActivityUserSearchBarProps } from './types'

const ActivityUserSearchBar: FC<ActivityUserSearchBarProps> = ({ value, onChange }) => (
  <TextField
    fullWidth
    variant="outlined"
    placeholder="Search..."
    value={value}
    onChange={onChange}
  />
)

export default ActivityUserSearchBar
