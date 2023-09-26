import { MockAdapter } from '@baseapp-frontend/test'

import Cookies from 'js-cookie'

import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from '../../../../constants/cookie'
import { CookieType } from '../../../../types/cookie'
import { axios } from '../index'

jest.mock('js-cookie')

describe('refreshAccessToken', () => {
  // @ts-ignore TODO: (BA-1081) investigate AxiosRequestHeaders error
  const axiosMock = new MockAdapter(axios)

  it('should refresh the token if token type is jwt and endpoint returns 401 error ', async () => {
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

    let timesCalled = 0
    axiosMock.onPost('/test-endpoint').reply(() => {
      timesCalled += 1
      if (timesCalled === 1) {
        return [401, {}]
      }
      return [200, {}]
    })
    axiosMock
      .onPost('/auth/refresh')
      .reply(200, { access: 'newAccessToken', refresh: 'newRefreshToken' })

    await axios.post('/test-endpoint')

    expect(timesCalled).toBe(2)
    expect(Cookies.set).toBeCalledTimes(1)
    expect(cookiesFakeStore[ACCESS_COOKIE_NAME]).toBe('newAccessToken')
  })

  it('should remove the token cookies if the refresh endpoint fails', async () => {
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
    axiosMock.onPost('/auth/refresh').reply(401, {})

    await expect(axios.post('/test-endpoint')).rejects.toThrow()

    expect(Cookies.remove).toBeCalledTimes(2)
    expect(cookiesFakeStore[ACCESS_COOKIE_NAME]).toBeUndefined()
    expect(cookiesFakeStore[REFRESH_COOKIE_NAME]).toBeUndefined()
  })
})
