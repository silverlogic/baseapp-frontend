import { FC } from 'react'

import { LoadingStateProps } from '@baseapp-frontend/design-system/components/web/displays'

import type { GraphQLTaggedNode } from 'react-relay'
import type { FragmentRefs } from 'relay-runtime'

import { UserMembersListFragment$key } from '../../../../../__generated__/UserMembersListFragment.graphql'
import { InviteMemberDialogProps } from '../InviteMemberDialog/types'
import { MemberItemProps } from '../MemberItem/types'

export interface MembersListProps extends Pick<
  MemberItemProps,
  'roleOptions' | 'inactiveMemberOptions' | 'roleLabels' | 'statusLabels'
> {
  MemberItem?: FC<MemberItemProps>
  MemberItemProps?: Partial<MemberItemProps>
  /** The profile, as a ref of `UserMembersListFragment` or of the `membersListFragment` given. */
  userRef: UserMembersListFragment$key | { readonly ' $fragmentSpreads': FragmentRefs<string> }
  /**
   * A project's `@refetchable` pagination fragment on `Profile`, used instead of
   * `UserMembersListFragment` to page through `members` with more arguments (`status`, say) or to
   * spread the project's own `ProfileUserRole` fragment next to `...MemberItemFragment`, which a
   * custom `MemberItem` reads from `memberRef`. It must select everything `UserMembersListFragment`
   * selects, under the same names and arguments `count`, `cursor`, `orderBy` and `q`.
   */
  membersListFragment?: GraphQLTaggedNode
  LoadingState?: FC<LoadingStateProps>
  LoadingStateProps?: LoadingStateProps
  /** The dialog behind "Add Member". Receives `open`, `onClose` and `connections`. */
  InviteMemberDialog?: FC<InviteMemberDialogProps>
  InviteMemberDialogProps?: Partial<InviteMemberDialogProps>
}
