'use client'

import { FC, useState } from 'react'

import { AddIcon, ChevronIcon } from '@baseapp-frontend/design-system'

import { ButtonBase, MenuItem, Stack } from '@mui/material'

import AccountPopover from '../../../navigations/Header/AccountMenu/AccountPopover'
import CurrentProfilePlaceholder from '../CurrentProfilePlaceholder'
import ProfilesSubmenusList from '../ProfilesList'
import { ProfilePopoverSectionsProps } from './types'

const ProfilePopoverSections: FC<ProfilePopoverSectionsProps> = ({
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
      accountInfoSectionController={{
        show: !openProfilesSubmenus,
        items: [CurrentProfilePlaceholder, SwitchProfileMenu],
      }}
      menuItemsSectionController={{ show: !openProfilesSubmenus, items: [] }}
      menuActionsSectionController={{ show: true, items: [AddProfileMenu] }}
      extraSectionControllersList={[{ show: openProfilesSubmenus, items: extraSections }]}
      disableCurrentUserPlaceholder
      {...props}
    />
  )
}

export default ProfilePopoverSections
