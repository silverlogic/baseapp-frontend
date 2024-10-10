import { FC } from 'react'

import AccountPopover from '../../navigations/Header/AccountMenu/AccountPopover'
import useCurrentProfile from '../hooks/useCurrentProfile'
import ProfileAccountSections from './ProfileAccountSections'
import { ProfileAccountPopoverProps } from './types'

const ProfileAccountPopover: FC<ProfileAccountPopoverProps> = ({
  switchProfileLabel = 'Switch Profile',
  addNewProfileLabel = 'New profile',
  ...props
}) => {
  const { currentProfile } = useCurrentProfile()

  if (!currentProfile || !currentProfile.profile) {
    return <AccountPopover {...props} />
  }

  return (
    <ProfileAccountSections
      {...props}
      currentProfile={currentProfile}
      switchProfileLabel={switchProfileLabel}
      addNewProfileLabel={addNewProfileLabel}
    />
  )
}

export default ProfileAccountPopover
