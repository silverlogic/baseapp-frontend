import { ProfileMembers, ProfileMembersProps } from '../../../..'
import withProviders from '../../../../../../../__test_utils__/withProviders'

const MembersForTesting = (props?: Partial<ProfileMembersProps>) => {
  return <ProfileMembers subtitle="Members Testing" {...props} />
}

export default withProviders(MembersForTesting)
