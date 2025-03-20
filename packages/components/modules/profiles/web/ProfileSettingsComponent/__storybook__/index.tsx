import { useLazyLoadQuery } from 'react-relay'

import { ProfileSettingsRelayTestQuery as QueryType } from '../../../../../__generated__/ProfileSettingsRelayTestQuery.graphql'
import { ProfileSettingsRelayTest } from '../../../common/graphql/queries/ProfileSettingsRelayTest'
import ProfileSettingsComponent from '../index'
import { ProfileSettingsComponentProps } from '../types'

const ProfileSettingsComponentWithQuery = (props: ProfileSettingsComponentProps) => {
  const profileRef = useLazyLoadQuery<QueryType>(ProfileSettingsRelayTest, {})

  return <ProfileSettingsComponent {...props} profile={profileRef.profile} />
}

export default ProfileSettingsComponentWithQuery
