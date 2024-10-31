import { FC } from 'react'

import { AddIcon } from '@baseapp-frontend/design-system'

import { ButtonBase, MenuItem, Stack } from '@mui/material'

import { AddProfileMenuItemProps } from './types'

const AddProfileMenuItem: FC<AddProfileMenuItemProps> = ({
  addNewProfileLabel = 'New profile',
}) => (
  <Stack>
    <MenuItem component={ButtonBase} sx={{ justifyContent: 'space-between' }}>
      {addNewProfileLabel}
      <AddIcon color="action" />
    </MenuItem>
  </Stack>
)

export default AddProfileMenuItem
