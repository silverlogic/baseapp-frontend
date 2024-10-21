/**
 * @jest-environment node
 */
import { CookiesGetByNameFn } from '@baseapp-frontend/test'

import ClientCookies from 'js-cookie'

import { getLanguage } from '..'

const clientCookieValue = 'client-value'
const serverCookieValue = 'server-value'

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn().mockReturnValue({ value: serverCookieValue }),
  })),
}))

describe('getLanguage function on the server', () => {
  const accessKeyName = 'client-cookie'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('retrieves a server-side language cookie', () => {
    ;(ClientCookies.get as CookiesGetByNameFn) = jest.fn(() => clientCookieValue)

    expect(getLanguage(accessKeyName)).toBe(serverCookieValue)
  })
})
