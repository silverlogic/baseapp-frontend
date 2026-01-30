import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../../../constants/jwt'
import { getTokens } from '../getAccessToken'
import { removeTokenAsync } from '../removeTokenAsync'
import { setTokenAsync } from '../setTokenAsync'
import { RefreshAccessTokenParams } from './types'

export const refreshAccessToken = async ({
  refreshToken,
  accessKeyName = ACCESS_KEY_NAME,
  refreshKeyName = REFRESH_KEY_NAME,
}: RefreshAccessTokenParams) => {
  try {
    const tokens = await getTokens(refreshToken)

    await setTokenAsync(accessKeyName, tokens.access, {
      secure: process.env.NODE_ENV === 'production',
    })

    if (tokens.refresh) {
      await setTokenAsync(refreshKeyName, tokens.refresh, {
        secure: process.env.NODE_ENV === 'production',
      })
    }

    return tokens.access
  } catch (error) {
    await removeTokenAsync(accessKeyName)
    await removeTokenAsync(refreshKeyName)

    return Promise.reject(error)
  }
}
