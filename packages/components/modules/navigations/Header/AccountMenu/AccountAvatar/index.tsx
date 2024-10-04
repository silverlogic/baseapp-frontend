import { FC, MouseEvent, useEffect, useState } from 'react'

import { ClickableAvatar } from '@baseapp-frontend/design-system'

import { Skeleton } from '@mui/material'

import { UserOrProfile } from '../../../hooks/useUserOrProfile/types'

// TODO: move to types.d.ts
interface AccountAvatarProps {
  userOrProfile: UserOrProfile | null
  popoverOpen: boolean
  popoverOnOpen: (event: MouseEvent<HTMLElement>) => void
}

const AccountAvatar: FC<AccountAvatarProps> = ({ userOrProfile, popoverOpen, popoverOnOpen }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <Skeleton variant="circular" width={40} height={40} />
  }

  return (
    <ClickableAvatar
      color="secondary" // TODO: add props to control.
      src={userOrProfile?.avatar}
      alt={`Account avatar: ${userOrProfile?.name}`}
      onClick={popoverOnOpen}
      isOpen={popoverOpen}
    />
  )
}

export default AccountAvatar
