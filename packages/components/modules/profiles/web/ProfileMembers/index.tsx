import { FC, Suspense } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { Typography } from '@mui/material'

import MembersList from './MembersList'
import type { ProfileMembersProps } from './types'

const ProfileMembers: FC<ProfileMembersProps> = ({
  title = 'Members',
  subtitle,
  MembersListProps = {},
  userRef,
}) => (
  <>
    <Typography component="h4" variant="h4" mb={1}>
      {title}
    </Typography>
    {subtitle && (
      <Typography component="p" variant="body2" color="text.secondary" mb={4}>
        {subtitle}
      </Typography>
    )}
    <Suspense fallback={<LoadingState />}>
      <MembersList userRef={userRef} {...MembersListProps} />
    </Suspense>
  </>
)

export default ProfileMembers
