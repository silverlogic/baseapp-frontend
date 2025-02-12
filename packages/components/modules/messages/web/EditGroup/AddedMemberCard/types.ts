import { ProfileItemFragment$key } from '../../../../../__generated__/ProfileItemFragment.graphql'

export interface AddedMemberCardProps {
  profile: ProfileItemFragment$key
  // TODO: type this better
  handleRemoveMember: (profile: any) => void
}
