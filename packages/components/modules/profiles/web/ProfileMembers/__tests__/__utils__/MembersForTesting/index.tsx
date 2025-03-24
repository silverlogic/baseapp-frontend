import { ProfileMembers, ProfileMembersProps } from '../../../..'
import { withComponentsProviders } from '../../../../../../tests/web/utils/withProviders'

const MembersForTesting = (props?: Partial<ProfileMembersProps>) => {
  return <ProfileMembers subtitle="Members Testing" {...props} />
}

export default withComponentsProviders(MembersForTesting)
