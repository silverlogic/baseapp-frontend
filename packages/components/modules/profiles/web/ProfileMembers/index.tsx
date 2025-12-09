import { FC, Suspense } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import MembersList from './MembersList'
import type { ProfileMembersProps } from './types'

const ProfileMembers: FC<ProfileMembersProps> = ({ MembersListProps = {}, userRef }) => (
  <Suspense fallback={<LoadingState />}>
    <MembersList userRef={userRef} {...MembersListProps} />
  </Suspense>
)

export default ProfileMembers
