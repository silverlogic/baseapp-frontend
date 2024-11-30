import { useFragment } from 'react-relay'

import { ProfileItemFragment } from '../../../../../graphql/queries/ProfileItem'
import useCurrentProfile from '../../../../useCurrentProfile'

const TestComponent = () => {
  const { profile } = useCurrentProfile()

  if (!profile) {
    return null
  }

  const profileData = useFragment(ProfileItemFragment, profile)

  return (
    <>
      <span id="profile-id">{profileData?.id}</span>
    </>
  )
}

export default TestComponent
