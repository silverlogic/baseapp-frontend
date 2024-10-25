import ProfilePopover from '../../..'
import { ProfilePopoverProps } from '../../../types'
import withProviders from '../withProviders'

const ProfilePopoverForTesting = (props?: Partial<ProfilePopoverProps>) => (
  <ProfilePopover {...props} />
)

export default withProviders(ProfilePopoverForTesting)
