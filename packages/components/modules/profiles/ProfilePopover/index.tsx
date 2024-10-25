import { FC } from 'react'

import AccountPopover from '../../navigations/Header/AccountMenu/AccountPopover'
import useCurrentProfile from '../context/useCurrentProfile'
import ProfilePopoverSections from './ProfilePopoverSections'
import { ProfilePopoverProps } from './types'

const ProfilePopover: FC<ProfilePopoverProps> = ({
  switchProfileLabel = 'Switch Profile',
  addNewProfileLabel = 'New profile',
  ProfilesSubmenusListProps,
  ...props
}) => {
  const { profile: currentProfile } = useCurrentProfile()

  if (!currentProfile) {
    return <AccountPopover {...props} />
  }

  return (
    <ProfilePopoverSections
      {...props}
      currentProfile={currentProfile}
      switchProfileLabel={switchProfileLabel}
      addNewProfileLabel={addNewProfileLabel}
      ProfilesSubmenusListProps={ProfilesSubmenusListProps}
    />
  )
}

export default ProfilePopover
