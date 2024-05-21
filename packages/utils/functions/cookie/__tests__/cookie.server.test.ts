/**
 * @jest-environment node
 */
import { getCookie } from '..'

const serverCookieValue = 'server-value'
const cookiesGetMock = jest.fn()
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: cookiesGetMock,
  })),
}))

describe('Cookie Functions in the server side', () => {
  describe('getCookie', () => {
    it('should get a cookie from the server', () => {
      cookiesGetMock.mockReturnValue({ value: serverCookieValue })

      const result = getCookie('test-key')

      expect(result).toBe(serverCookieValue)
    })

    it('should be able to parse the cookie if it is a JSON string', () => {
      const mockCookie = '{"key": "value"}'
      cookiesGetMock.mockReturnValue({ value: mockCookie })

      const result = getCookie('test')

      expect(result).toEqual({ key: 'value' })
    })

    it('should return the value if there is an error during json parse', () => {
      cookiesGetMock.mockReturnValue({ value: 'unparsable string' })
      expect(getCookie('test')).toBe('unparsable string')
    })

    it('should not parse the cookie if parseJSON is false', () => {
      const mockCookie = '{"key": "value"}'
      cookiesGetMock.mockReturnValue({ value: mockCookie })

      const result = getCookie('test', { parseJSON: false })

      expect(result).toBe(mockCookie)
    })
  })
})
