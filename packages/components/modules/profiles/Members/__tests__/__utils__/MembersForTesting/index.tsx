import withProviders from '../../../../../../__test_utils__/withProviders'
import Members from '../../../index'
import { UserMembersProps } from '../../../types'

const MembersForTesting = (props?: Partial<UserMembersProps>) => {
  return <Members subtitle="Members Testing" {...props} />
}

export default withProviders(MembersForTesting)
