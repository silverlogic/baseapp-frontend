import { ProfileMembers, ProfileMembersProps } from '../../../..'
import { withComponentCompleteTestProviders } from '../../../../../../tests/web'

const MembersForTesting = (props?: Partial<ProfileMembersProps>) => {
  return <ProfileMembers subtitle="Members Testing" {...props} />
}

export default withComponentCompleteTestProviders(MembersForTesting)
