import ClientCookies from 'js-cookie'

import { getCookie, removeCookie, setCookie } from '..'
import { SetCookieOptions } from '../types'

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}))

describe('Cookie Functions in the client side', () => {
  describe('getCookie', () => {
    it('should get a cookie from the client', () => {
      const mockCookie = 'test-cookie'
      ;(ClientCookies.get as jest.Mock).mockReturnValue(mockCookie)

      const result = getCookie('test')
      expect(result).toBe(mockCookie)
      expect(ClientCookies.get).toHaveBeenCalledWith('test')
    })

    it('should be able to parse the cookie if it is a JSON string', () => {
      const mockCookie = JSON.stringify({ key: 'value' })
      ;(ClientCookies.get as jest.Mock).mockReturnValue(mockCookie)

      const result = getCookie('test', { parseJSON: true })

      expect(result).toEqual({ key: 'value' })
    })

    it('should return raw cookie if JSON parsing fails', () => {
      ;(ClientCookies.get as jest.Mock).mockImplementation(() => '{"malformedJson":')

      const result = getCookie('test')

      expect(result).toBe('{"malformedJson":')
    })

    it('should not parse the cookie if parseJSON is false', () => {
      const mockCookie = '{"key": "value"}'
      ;(ClientCookies.get as jest.Mock).mockReturnValue(mockCookie)

      const result = getCookie('test', { parseJSON: false })

      expect(result).toBe(mockCookie)
    })
  })

  describe('setCookie', () => {
    it('should set a cookie', () => {
      const key = 'test'
      const value = { data: 'test-data' }
      const config: SetCookieOptions = { expires: 7, stringfyValue: true }

      setCookie(key, value, config)
      delete config.stringfyValue
      expect(ClientCookies.set).toHaveBeenCalledWith(key, JSON.stringify(value), config)
    })

    it('should handle errors gracefully', () => {
      ;(ClientCookies.set as jest.Mock).mockImplementation(() => {
        throw new Error('error')
      })

      expect(() => setCookie('test', 'value', {})).not.toThrow()
    })
  })

  describe('removeCookie', () => {
    it('should remove a cookie', () => {
      const key = 'test'

      removeCookie(key)
      expect(ClientCookies.remove).toHaveBeenCalledWith(key)
    })

    it('should handle errors gracefully', () => {
      ;(ClientCookies.remove as jest.Mock).mockImplementation(() => {
        throw new Error('error')
      })

      expect(() => removeCookie('test')).not.toThrow()
    })
  })
})
