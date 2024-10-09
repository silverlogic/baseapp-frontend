import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../../../constants/jwt'
import { getAccessToken } from '../getAccessToken'
import { getToken } from '../getToken'
import { removeTokenAsync } from '../removeTokenAsync'
import { setTokenAsync } from '../setTokenAsync'

export const refreshAccessToken = async (
  accessKeyName = ACCESS_KEY_NAME,
  refreshKeyName = REFRESH_KEY_NAME,
) => {
  try {
    const refreshToken = getToken(refreshKeyName) ?? ''

    const accessToken = await getAccessToken(refreshToken)

    await setTokenAsync(accessKeyName, accessToken, {
      secure: process.env.NODE_ENV === 'production',
    })

    return accessToken
  } catch (error) {
    await removeTokenAsync(accessKeyName)
    await removeTokenAsync(refreshKeyName)

    return Promise.reject(error)
  }
}
