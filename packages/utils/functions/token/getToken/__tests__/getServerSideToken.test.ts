/**
 * @jest-environment node
 */
import { CookiesGetByNameFn } from '@baseapp-frontend/test'

import ClientCookies from 'js-cookie'

import { getToken } from '..'

const clientCookieValue = 'client-value'
const serverCookieValue = 'server-value'

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn().mockReturnValue({ value: serverCookieValue }),
  })),
}))

describe('getToken function on the server', () => {
  const cookieName = 'client-cookie'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('retrieves a server-side cookie', async () => {
    ;(ClientCookies.get as CookiesGetByNameFn) = jest.fn(() => clientCookieValue)

    expect(await getToken(cookieName)).toBe(serverCookieValue)
  })
})
