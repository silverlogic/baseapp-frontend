import {
  ACCESS_KEY_NAME,
  IMPERSONATOR_ACCESS_KEY_NAME,
  IMPERSONATOR_REFRESH_KEY_NAME,
  REFRESH_KEY_NAME,
  getToken,
  removeTokenAsync,
  setTokenAsync,
} from '@baseapp-frontend/utils'
import { CURRENT_PROFILE_KEY_NAME } from '@baseapp-frontend/utils/constants/profile'

import type { ImpersonationTokenKeyNames, SwapInImpersonationTokensParams } from './types'

const resolveKeyNames = ({
  accessKeyName = ACCESS_KEY_NAME,
  refreshKeyName = REFRESH_KEY_NAME,
  impersonatorAccessKeyName = IMPERSONATOR_ACCESS_KEY_NAME,
  impersonatorRefreshKeyName = IMPERSONATOR_REFRESH_KEY_NAME,
}: ImpersonationTokenKeyNames = {}) => ({
  accessKeyName,
  refreshKeyName,
  impersonatorAccessKeyName,
  impersonatorRefreshKeyName,
})

// same attributes `useLogin` gives the regular pair
const getTokenConfig = () => ({ secure: process.env.NODE_ENV === 'production' })

/** Whether the impersonator's tokens are kept aside, i.e. this client is in a session. */
export const hasImpersonatorTokens = (keyNames?: ImpersonationTokenKeyNames) => {
  const { impersonatorAccessKeyName, impersonatorRefreshKeyName } = resolveKeyNames(keyNames)
  return Boolean(getToken(impersonatorAccessKeyName) || getToken(impersonatorRefreshKeyName))
}

/** Removes the impersonator's kept-aside tokens. */
export const clearImpersonatorTokens = async (keyNames?: ImpersonationTokenKeyNames) => {
  const { impersonatorAccessKeyName, impersonatorRefreshKeyName } = resolveKeyNames(keyNames)
  await removeTokenAsync(impersonatorAccessKeyName)
  await removeTokenAsync(impersonatorRefreshKeyName)
}

/**
 * Starts using an impersonation session's tokens: keeps the current pair aside, stores the
 * session's pair under the regular names and forgets the current profile, which belongs to the
 * impersonator.
 *
 * When a pair is already kept aside it is left as it is, so the impersonator's own tokens are never
 * overwritten by another session's.
 */
export const swapInImpersonationTokens = async ({
  access,
  refresh,
  ...keyNames
}: SwapInImpersonationTokensParams) => {
  const keys = resolveKeyNames(keyNames)
  const config = getTokenConfig()

  if (!hasImpersonatorTokens(keys)) {
    const currentAccess = getToken(keys.accessKeyName)
    const currentRefresh = getToken(keys.refreshKeyName)
    if (currentAccess) await setTokenAsync(keys.impersonatorAccessKeyName, currentAccess, config)
    if (currentRefresh) await setTokenAsync(keys.impersonatorRefreshKeyName, currentRefresh, config)
  }

  await setTokenAsync(keys.accessKeyName, access, config)
  await setTokenAsync(keys.refreshKeyName, refresh, config)
  await removeTokenAsync(CURRENT_PROFILE_KEY_NAME)
}

/**
 * Puts the impersonator's kept-aside tokens back under the regular names, removes the kept-aside
 * copy and forgets the current profile, which belongs to the impersonated user.
 *
 * Returns `false`, changing nothing but the current profile, when no complete pair was kept aside;
 * the caller then decides what to do with the session's tokens (usually: log out).
 */
export const restoreImpersonatorTokens = async (keyNames?: ImpersonationTokenKeyNames) => {
  const keys = resolveKeyNames(keyNames)
  const access = getToken(keys.impersonatorAccessKeyName)
  const refresh = getToken(keys.impersonatorRefreshKeyName)

  await removeTokenAsync(CURRENT_PROFILE_KEY_NAME)

  if (!access || !refresh) {
    await clearImpersonatorTokens(keys)
    return false
  }

  const config = getTokenConfig()
  await setTokenAsync(keys.accessKeyName, access, config)
  await setTokenAsync(keys.refreshKeyName, refresh, config)
  await clearImpersonatorTokens(keys)
  return true
}
