import { setTokenAsync } from '@baseapp-frontend/utils'
import { CURRENT_PROFILE_KEY_NAME } from '@baseapp-frontend/utils/constants/profile'

import { MinimalProfile } from '../../types/profile'

export const setProfileExpoStorage = async (profile: MinimalProfile) => {
  await setTokenAsync(CURRENT_PROFILE_KEY_NAME, JSON.stringify(profile))
}
