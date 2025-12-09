import { UserMembersListFragment$key } from '../../../../__generated__/UserMembersListFragment.graphql'
import { MembersListProps } from './MembersList/types'

export interface ProfileMembersProps {
  MembersListProps?: Partial<MembersListProps>
  title?: string
  subtitle?: string
  userRef: UserMembersListFragment$key
}
