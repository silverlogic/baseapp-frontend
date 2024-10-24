'use client'

import { FC, useState } from 'react'

import { AddIcon, ChevronIcon } from '@baseapp-frontend/design-system'

import { ButtonBase, MenuItem, Stack } from '@mui/material'

import AccountPopover from '../../../navigations/Header/AccountMenu/AccountPopover'
import CurrentProfilePlaceholder from '../CurrentProfilePlaceholder'
import ProfilesSubmenusList from '../ProfilesSubmenusList'
import { ProfileAccountSectionsProps } from './types'

const ProfileAccountSections: FC<ProfileAccountSectionsProps> = ({
  currentProfile,
  switchProfileLabel,
  addNewProfileLabel,
  ProfilesSubmenusListProps,
  ...props
}) => {
  const [openProfilesSubmenus, setOpenProfilesSubmenus] = useState(false)

  const onPopoverClose = () => {
    if (openProfilesSubmenus) {
      setTimeout(() => {
        setOpenProfilesSubmenus(false)
      }, 500) // Popover close transaction timeout
    }
  }

  const SwitchProfileMenu = (
    <Stack sx={{ mt: 0.5 }}>
      <MenuItem
        component={ButtonBase}
        sx={{ justifyContent: 'space-between' }}
        onClick={() => setOpenProfilesSubmenus(true)}
      >
        {switchProfileLabel}
        <ChevronIcon position="right" color="action" />
      </MenuItem>
    </Stack>
  )

  const AddProfileMenu = openProfilesSubmenus ? (
    <Stack>
      <MenuItem component={ButtonBase} sx={{ justifyContent: 'space-between' }}>
        {addNewProfileLabel}
        <AddIcon color="action" />
      </MenuItem>
    </Stack>
  ) : null

  const extraSections = openProfilesSubmenus
    ? [
        <ProfilesSubmenusList
          key={1}
          openSubmenu={openProfilesSubmenus}
          handleCloseSubmenu={() => setOpenProfilesSubmenus(false)}
          {...ProfilesSubmenusListProps}
        />,
      ]
    : []

  return (
    <AccountPopover
      accountAvatarUrl={currentProfile?.image?.url}
      onCloseCallback={onPopoverClose}
      PopoverStyles={{ width: 256 }}
      accountSection={{
        show: !openProfilesSubmenus,
        items: [CurrentProfilePlaceholder, SwitchProfileMenu],
      }}
      menuSection={{ show: !openProfilesSubmenus, items: [] }}
      accountActionsSection={{ show: true, items: [AddProfileMenu] }}
      extraSections={[{ show: openProfilesSubmenus, items: extraSections }]}
      disableCurrentUserPlaceholder
      {...props}
    />
  )
}

export default ProfileAccountSections