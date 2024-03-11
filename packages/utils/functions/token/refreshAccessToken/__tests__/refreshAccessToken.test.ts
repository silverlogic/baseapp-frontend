import { MockAdapter } from '@baseapp-frontend/test'

import Cookies from 'js-cookie'

import { simpleAxios as refreshTokenAxios } from '..'
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from '../../../../constants/cookie'
import { CookieType } from '../../../../types/cookie'
import { axios } from '../../../axios'
import { isUserTokenValid } from '../../isUserTokenValid'

jest.mock('js-cookie')
jest.mock('../../../token/decodeJWT')
jest.mock('../../../token/isUserTokenValid')

describe('refreshAccessToken', () => {
  // @ts-ignore TODO: (BA-1081) investigate AxiosRequestHeaders error
  const axiosMock = new MockAdapter(axios)
  // @ts-ignore TODO: (BA-1081) investigate AxiosRequestHeaders error
  const refreshTokenAxiosMock = new MockAdapter(refreshTokenAxios)

  it('should refresh the token if token type is jwt and the token is expired ', async () => {
    const cookiesFakeStore = {
      [ACCESS_COOKIE_NAME]: 'accessToken',
      [REFRESH_COOKIE_NAME]: 'refreshToken',
    }
    ;(Cookies.set as jest.Mock).mockImplementation(
      (cookieName: CookieType, cookieValue: string) => {
        cookiesFakeStore[cookieName] = cookieValue
        return cookieValue
      },
    )
    ;(Cookies.get as jest.Mock).mockImplementation(
      (cookieName: CookieType) => cookiesFakeStore[cookieName],
    )
    ;(isUserTokenValid as jest.Mock).mockImplementation(() => false)

    axiosMock.onPost('/test-endpoint').reply(200, {})
    refreshTokenAxiosMock
      .onPost('/auth/refresh')
      .reply(200, { access: 'newAccessToken', refresh: 'newRefreshToken' })

    await axios.post('/test-endpoint')

    expect(axiosMock.history.post.length).toBe(1)
    expect(refreshTokenAxiosMock.history.post.length).toBe(1)
    expect(Cookies.set).toBeCalledTimes(1)
    expect(cookiesFakeStore[ACCESS_COOKIE_NAME]).toBe('newAccessToken')
  })

  it('should remove the token cookies if the refresh endpoint fails', async () => {
    axiosMock.resetHistory()
    refreshTokenAxiosMock.resetHistory()

    const cookiesFakeStore = {
      [ACCESS_COOKIE_NAME]: 'accessToken',
      [REFRESH_COOKIE_NAME]: 'refreshToken',
    }
    ;(Cookies.get as jest.Mock).mockImplementation(
      (cookieName: CookieType) => cookiesFakeStore[cookieName],
    )
    ;(Cookies.remove as jest.Mock).mockImplementation((cookieName: CookieType) => {
      delete cookiesFakeStore[cookieName]
    })

    axiosMock.onPost('/test-endpoint').reply(401, {})
    refreshTokenAxiosMock.onPost('/auth/refresh').reply(401, {})

    await expect(axios.post('/test-endpoint')).rejects.toThrow()

    expect(refreshTokenAxiosMock.history.post.length).toBe(1)
    expect(Cookies.remove).toBeCalledTimes(2)
    expect(cookiesFakeStore[ACCESS_COOKIE_NAME]).toBeUndefined()
    expect(cookiesFakeStore[REFRESH_COOKIE_NAME]).toBeUndefined()
  })
})
