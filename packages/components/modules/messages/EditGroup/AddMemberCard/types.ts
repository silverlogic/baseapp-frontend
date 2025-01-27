import { ProfileItemFragment$key } from '../../../../__generated__/ProfileItemFragment.graphql'

export interface AddMemberCardProps {
  profile: ProfileItemFragment$key
  // TODO: type this better
  handleAddMember: (profile: any) => void
  handleRemoveMember: (profile: any) => void
  isBeingAdded: boolean
  isExistingMember: boolean
}
