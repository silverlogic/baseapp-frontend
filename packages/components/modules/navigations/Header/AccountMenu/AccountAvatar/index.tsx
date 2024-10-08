import { FC, useEffect, useState } from 'react'

import { ClickableAvatar } from '@baseapp-frontend/design-system'

import { Skeleton } from '@mui/material'

import { AccountAvatarProps } from './types'

const AccountAvatar: FC<AccountAvatarProps> = ({
  userOrProfile,
  popoverOpen,
  popoverOnOpen,
  ...props
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <Skeleton variant="circular" width={40} height={40} />
  }

  return (
    <ClickableAvatar
      color="secondary"
      src={userOrProfile?.avatar}
      alt={`Account avatar: ${userOrProfile?.name}`}
      onClick={popoverOnOpen}
      isOpen={popoverOpen}
      {...props}
    />
  )
}

export default AccountAvatar
