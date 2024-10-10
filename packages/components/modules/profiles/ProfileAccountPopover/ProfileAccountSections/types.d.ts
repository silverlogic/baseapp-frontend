import type { CurrentProfile } from '../../hooks/useCurrentProfile/types'
import type { ProfileAccountPopoverProps } from '../types'

export interface ProfileAccountSectionsProps extends ProfileAccountPopoverProps {
  currentProfile: CurrentProfile
}
