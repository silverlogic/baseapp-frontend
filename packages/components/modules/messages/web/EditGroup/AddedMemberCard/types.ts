import { ProfileNode } from '../../../../profiles/common'

export interface AddedMemberCardProps {
  profile: ProfileNode
  handleRemoveMember: (profile: ProfileNode) => void
}
