import { CookiesGetByNameFn } from '@baseapp-frontend/test'

import ClientCookies from 'js-cookie'

import { getLanguage } from '..'

const clientCookieValue = 'client-language-value'
const serverCookieValue = 'server-language-value'

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn().mockReturnValue({ value: serverCookieValue }),
  })),
}))

describe('getLanguage function on the client', () => {
  const cookieName = 'client-language-cookie'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('retrieves a client-side cookie', async () => {
    ;(ClientCookies.get as CookiesGetByNameFn) = jest.fn(() => clientCookieValue)

    expect(getLanguage(cookieName)).toBe(clientCookieValue)
    expect(ClientCookies.get).toHaveBeenCalledWith(cookieName)
  })
})
