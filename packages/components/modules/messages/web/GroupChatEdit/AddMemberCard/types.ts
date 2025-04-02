import { ProfileNode } from '../../../../profiles/common'

export interface AddMemberCardProps {
  profile: ProfileNode
  handleAddMember: (profile: ProfileNode) => void
  handleRemoveMember: (profile: ProfileNode) => void
  isBeingAdded: boolean
  isExistingMember: boolean
}
