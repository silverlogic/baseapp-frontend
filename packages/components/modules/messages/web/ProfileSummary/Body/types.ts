import { PropsWithChildren } from 'react'

import { ProfileSummaryFragment$key } from '../../../../../__generated__/ProfileSummaryFragment.graphql'

export interface BodyProps extends PropsWithChildren {
  avatarSize?: number
  chatRoomRef: ProfileSummaryFragment$key
}
