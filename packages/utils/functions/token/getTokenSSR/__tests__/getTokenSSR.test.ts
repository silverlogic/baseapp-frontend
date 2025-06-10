import { cookies } from 'next/headers'

import { getTokenSSR } from '..'
import { ACCESS_KEY_NAME } from '../../../../constants/jwt'

const mockTokenValue = 'mock-jwt-token'

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}))

describe('getTokenSSR', () => {
  const mockCookieStore = {
    get: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(cookies as jest.Mock).mockResolvedValue(mockCookieStore)
  })

  it('should retrieve the token from cookies when token exists', async () => {
    mockCookieStore.get.mockReturnValue({ value: mockTokenValue })

    const result = await getTokenSSR(ACCESS_KEY_NAME)

    expect(result).toBe(mockTokenValue)
    expect(cookies).toHaveBeenCalledTimes(1)
    expect(mockCookieStore.get).toHaveBeenCalledWith(ACCESS_KEY_NAME)
  })

  it('should return undefined when no token exists', async () => {
    mockCookieStore.get.mockReturnValue(undefined)

    const result = await getTokenSSR(ACCESS_KEY_NAME)

    expect(result).toBeUndefined()
    expect(cookies).toHaveBeenCalledTimes(1)
    expect(mockCookieStore.get).toHaveBeenCalledWith(ACCESS_KEY_NAME)
  })

  it('should use default ACCESS_KEY_NAME when no key is provided', async () => {
    mockCookieStore.get.mockReturnValue({ value: mockTokenValue })

    const result = await getTokenSSR()

    expect(result).toBe(mockTokenValue)
    expect(mockCookieStore.get).toHaveBeenCalledWith(ACCESS_KEY_NAME)
  })

  it('should use provided key when specified', async () => {
    const customKey = 'custom-token-key'
    mockCookieStore.get.mockReturnValue({ value: mockTokenValue })

    const result = await getTokenSSR(customKey)

    expect(result).toBe(mockTokenValue)
    expect(mockCookieStore.get).toHaveBeenCalledWith(customKey)
  })

  it('should return undefined when cookie exists but has no value', async () => {
    mockCookieStore.get.mockReturnValue({})

    const result = await getTokenSSR(ACCESS_KEY_NAME)

    expect(result).toBeUndefined()
    expect(mockCookieStore.get).toHaveBeenCalledWith(ACCESS_KEY_NAME)
  })
})
