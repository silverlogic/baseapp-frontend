import { FC } from 'react'

import AccountPopover from '../../navigations/Header/AccountMenu/AccountPopover'
import useCurrentProfile from '../context/useCurrentProfile'
import ProfileAccountSections from './ProfileAccountSections'
import { ProfileAccountPopoverProps } from './types'

const ProfileAccountPopover: FC<ProfileAccountPopoverProps> = ({
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
    <ProfileAccountSections
      {...props}
      currentProfile={currentProfile}
      switchProfileLabel={switchProfileLabel}
      addNewProfileLabel={addNewProfileLabel}
      ProfilesSubmenusListProps={ProfilesSubmenusListProps}
    />
  )
}

export default ProfileAccountPopover
