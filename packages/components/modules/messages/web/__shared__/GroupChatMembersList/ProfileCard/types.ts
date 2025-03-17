import { ProfileNode } from '../../types'

export interface ProfileCardProps {
  profile: ProfileNode
  handleAddMember: (profile: ProfileNode) => void
  handleRemoveMember: (profile: ProfileNode) => void
  isMember?: boolean
}
