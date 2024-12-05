'use client'

import { FC, Suspense, useState } from 'react'

import { AddIcon } from '@baseapp-frontend/design-system'

import { ButtonBase, MenuItem, Stack } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { AddProfilePopoverUserQuery as AddProfilePopoverUserQueryType } from '../../../../__generated__/AddProfilePopoverUserQuery.graphql'
import { AddProfilePopoverUserQuery } from '../../graphql/queries/AddProfilePopover'
import AddProfileModal from '../AddProfileModal'
import { AddProfileMenuItemProps } from './types'

const AddProfileMenuItem: FC<AddProfileMenuItemProps> = ({
  addNewProfileLabel = 'New organization',
  CreateProfileModal = AddProfileModal,
}) => {
  const [open, setOpen] = useState(false)
  const { me } = useLazyLoadQuery<AddProfilePopoverUserQueryType>(AddProfilePopoverUserQuery, {})

  if (!me?.canAdd) return null

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
      <CreateProfileModal open={open} setOpen={setOpen} userId={me?.id} />
    </>
  )
}

const AddProfileMenuItemSuspended: FC<AddProfileMenuItemProps> = (props) => (
  <Suspense>
    <AddProfileMenuItem {...props} />
  </Suspense>
)

export default AddProfileMenuItemSuspended
