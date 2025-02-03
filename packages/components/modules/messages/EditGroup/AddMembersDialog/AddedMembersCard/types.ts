import { ProfileItemFragment$key } from '../../../../../__generated__/ProfileItemFragment.graphql'

export interface AddedMembersCardProps {
  profile: ProfileItemFragment$key
  // TODO: type this better
  handleRemoveMember: (profile: any) => void
}
