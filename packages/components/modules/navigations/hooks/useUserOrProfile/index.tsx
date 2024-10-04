import { User as BaseUser, useJWTUser } from '@baseapp-frontend/authentication'
import { JWTContent, joinWithSeparator } from '@baseapp-frontend/utils'

import { ProfileItemFragment$data } from '../../../../__generated__/ProfileItemFragment.graphql'
import { useCurrentProfile } from '../../../profiles'
import { UserOrProfile } from './types'

const getUserOrProfileData = (
  user?: (BaseUser & JWTContent) | null,
  profile?: ProfileItemFragment$data | null,
): UserOrProfile | null => {
  if (profile) {
    return {
      id: profile.id,
      name: profile.name ?? '',
      avatarPlaceholder: profile.name?.charAt(0) ?? '',
      handle: profile.urlPath?.path,
      avatar: profile.image?.url,
    }
  }
  if (user) {
    const fullName = joinWithSeparator([user.firstName, user.lastName])
    return {
      id: user.email,
      name: fullName.trim() ? fullName : user.email,
      avatarPlaceholder:
        user.firstName && user.firstName
          ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
          : user.email.charAt(0),
      avatar: user.avatar?.small,
      handle: fullName.trim() ? user.email : undefined,
    }
  }
  return null
}

const useUserOrProfile = () => {
  const { user } = useJWTUser<BaseUser & JWTContent>()
  const { currentProfile } = useCurrentProfile()

  return getUserOrProfileData(user, currentProfile?.profile)
}

export default useUserOrProfile
