'use client'

import { FC, useState } from 'react'

import { AddIcon } from '@baseapp-frontend/design-system'

import { ButtonBase, MenuItem, Stack } from '@mui/material'

import AddProfileModal from '../AddProfileModal'
import { AddProfileMenuItemProps } from './types'

const AddProfileMenuItem: FC<AddProfileMenuItemProps> = ({
  addNewProfileLabel = 'New organization',
  CreateProfileModal = AddProfileModal,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Stack>
        <MenuItem
          tabIndex={0}
          component={ButtonBase}
          sx={{ justifyContent: 'space-between' }}
          onClick={() => setOpen(true)}
        >
          {addNewProfileLabel}
          <AddIcon color="action" />
        </MenuItem>
      </Stack>
      <CreateProfileModal open={open} setOpen={setOpen} />
    </>
  )
}

export default AddProfileMenuItem
