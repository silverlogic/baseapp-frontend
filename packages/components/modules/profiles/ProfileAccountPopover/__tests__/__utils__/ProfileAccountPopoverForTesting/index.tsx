import ProfileAccountPopover from '../../..'
import { ProfileAccountPopoverProps } from '../../../types'
import withProviders from '../withProviders'

const ProfileAccountPopoverForTesting = (props?: Partial<ProfileAccountPopoverProps>) => (
  <ProfileAccountPopover {...props} />
)

export default withProviders(ProfileAccountPopoverForTesting)
