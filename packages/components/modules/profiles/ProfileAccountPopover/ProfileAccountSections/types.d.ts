import type { ProfileItemFragment$data } from '../../../../__generated__/ProfileItemFragment.graphql'
import type { ProfileAccountPopoverProps } from '../types'

export interface ProfileAccountSectionsProps extends ProfileAccountPopoverProps {
  currentProfile: ProfileItemFragment$data
}
