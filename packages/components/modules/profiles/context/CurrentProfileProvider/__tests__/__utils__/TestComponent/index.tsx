import { useFragment } from 'react-relay'

import { ProfileItemFragment } from '../../../../../graphql/queries/ProfileItem'
import useCurrentProfile from '../../../../useCurrentProfile'

const TestComponent = () => {
  const { profile } = useCurrentProfile()

  if (!profile) {
    return null
  }

  return (
    <>
      <span id="profile-id">{profile?.id}</span>
    </>
  )
}

export default TestComponent
