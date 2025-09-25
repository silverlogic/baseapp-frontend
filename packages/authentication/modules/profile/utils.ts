import { setTokenAsync } from '@baseapp-frontend/utils'

import { MinimalProfile } from '../../types/profile'
import { CURRENT_PROFILE_KEY_NAME } from './useCurrentProfile/constants'

export const setProfileExpoStorage = async (profile: MinimalProfile) => {
  await setTokenAsync(CURRENT_PROFILE_KEY_NAME, JSON.stringify(profile))
}
