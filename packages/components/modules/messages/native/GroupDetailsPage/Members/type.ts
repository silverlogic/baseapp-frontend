import { MembersListFragment$data } from '../../../../../__generated__/MembersListFragment.graphql'

export interface MembersProps {
  participantsCount?: number | null
  members?: MembersListFragment$data['participants']
  loadNext: () => void
  isLoadingNext: boolean
  hasNext?: boolean
  roomId?: string
}
