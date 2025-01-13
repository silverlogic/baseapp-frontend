import { ProfileItemFragment$key } from '../../../../__generated__/ProfileItemFragment.graphql'

export interface ProfileCardProps {
  hasAdminPermissions: boolean
  profile: ProfileItemFragment$key
  role: string | null | undefined
}
