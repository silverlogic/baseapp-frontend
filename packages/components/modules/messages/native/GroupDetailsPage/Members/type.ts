import { FC } from 'react'

import { FabButtonProps } from '@baseapp-frontend/design-system/components/native/buttons'
import { LoadingScreenProps } from '@baseapp-frontend/design-system/components/native/displays'

import { MembersListFragment$data } from '../../../../../__generated__/MembersListFragment.graphql'
import { MemberItemProps } from './MemberItem/type'

export interface MembersProps {
  participantsCount?: number | null
  members?: MembersListFragment$data['participants']
  loadNext: () => void
  isLoadingNext: boolean
  hasNext?: boolean
  currentProfileIsAdmin?: boolean
  groupId: string
  MemberItem?: FC<MemberItemProps>
  MemberItemProps?: Partial<MemberItemProps>
  FabButton?: FC<FabButtonProps>
  FabButtonProps?: Partial<FabButtonProps>
  LoadingScreen?: FC<LoadingScreenProps>
  LoadingScreenProps?: Partial<LoadingScreenProps>
  setMemberToRemoveId: (id: string | null) => void
}
