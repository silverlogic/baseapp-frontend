import { renderHook } from '@baseapp-frontend/test'

import ClientCookies from 'js-cookie'

import { getCookie, removeCookie, setCookie } from '..'
import {
  getCookieFromStore,
  removeCookieFromStore,
  setCookieInStore,
} from '../../../hooks/useCookie/store'
import { SetCookieOptions } from '../types'

jest.mock('../../../hooks/useCookie/store', () => ({
  getCookieFromStore: jest.fn(),
  setCookieInStore: jest.fn(),
  removeCookieFromStore: jest.fn(),
}))

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}))

describe('Cookie Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getCookie', () => {
    it('should get a cookie from ClientCookies', () => {
      const mockCookie = 'test-cookie'
      ;(ClientCookies.get as jest.Mock).mockReturnValue(mockCookie)
      ;(getCookieFromStore as jest.Mock).mockReturnValue(undefined)

      const result = getCookie('test')

      expect(result).toBe(mockCookie)
      expect(ClientCookies.get).toHaveBeenCalledWith('test')
      expect(getCookieFromStore).toHaveBeenCalledWith('test')
    })

    it('should get a cookie from global store when ClientCookies returns undefined', () => {
      const mockCookie = 'store-cookie'
      ;(ClientCookies.get as jest.Mock).mockReturnValue(undefined)
      ;(getCookieFromStore as jest.Mock).mockReturnValue(mockCookie)

      const result = getCookie('test')

      expect(result).toBe(mockCookie)
      expect(ClientCookies.get).toHaveBeenCalledWith('test')
      expect(getCookieFromStore).toHaveBeenCalledWith('test')
    })

    it('should parse JSON when parseJSON is true', () => {
      const mockCookie = JSON.stringify({ key: 'value' })
      ;(ClientCookies.get as jest.Mock).mockReturnValue(mockCookie)
      ;(getCookieFromStore as jest.Mock).mockReturnValue(undefined)

      const result = getCookie('test', { parseJSON: true })

      expect(result).toEqual({ key: 'value' })
    })

    it('should return raw cookie if JSON parsing fails', () => {
      const malformedJson = '{"malformedJson":'
      ;(ClientCookies.get as jest.Mock).mockReturnValue(malformedJson)
      ;(getCookieFromStore as jest.Mock).mockReturnValue(undefined)

      const result = getCookie('test', { parseJSON: true })

      expect(result).toBe(malformedJson)
    })

    it('should not parse the cookie if parseJSON is false', () => {
      const mockCookie = '{"key": "value"}'
      ;(ClientCookies.get as jest.Mock).mockReturnValue(mockCookie)
      ;(getCookieFromStore as jest.Mock).mockReturnValue(undefined)

      const result = getCookie('test', { parseJSON: false })

      expect(result).toBe(mockCookie)
    })

    it('should return undefined if cookie does not exist in both places', () => {
      ;(ClientCookies.get as jest.Mock).mockReturnValue(undefined)
      ;(getCookieFromStore as jest.Mock).mockReturnValue(undefined)

      const result = getCookie('nonexistent')

      expect(result).toBeUndefined()
    })

    it('should return undefined and parse correctly when cookie is undefined and parseJSON is true', () => {
      ;(ClientCookies.get as jest.Mock).mockReturnValue(undefined)
      ;(getCookieFromStore as jest.Mock).mockReturnValue(undefined)

      const result = getCookie('nonexistent', { parseJSON: true })

      expect(result).toBeUndefined()
    })

    it('should prioritize ClientCookies over global store', () => {
      const clientCookie = 'client-cookie'
      const storeCookie = 'store-cookie'
      ;(ClientCookies.get as jest.Mock).mockReturnValue(clientCookie)
      ;(getCookieFromStore as jest.Mock).mockReturnValue(storeCookie)

      const result = getCookie('test')

      expect(result).toBe(clientCookie)
    })
  })

  describe('setCookie', () => {
    it('should set a cookie without stringifying', () => {
      const key = 'test'
      const value = 'test-value'
      const config: SetCookieOptions = { expires: 7 }

      setCookie(key, value, config)

      expect(ClientCookies.set).toHaveBeenCalledWith(key, value, config)
      expect(setCookieInStore).toHaveBeenCalledWith(key, value)
    })

    it('should set a cookie with stringifying when stringfyValue is true', () => {
      const key = 'test'
      const value = { data: 'test-data' }
      const config: SetCookieOptions = { expires: 7, stringfyValue: true }

      setCookie(key, value, config)

      const expectedConfig = { expires: 7 }
      const expectedValue = JSON.stringify(value)

      expect(ClientCookies.set).toHaveBeenCalledWith(key, expectedValue, expectedConfig)
      expect(setCookieInStore).toHaveBeenCalledWith(key, expectedValue)
    })

    it('should set a cookie with default options', () => {
      const key = 'test'
      const value = 'test-value'

      setCookie(key, value)

      expect(ClientCookies.set).toHaveBeenCalledWith(key, value, {})
      expect(setCookieInStore).toHaveBeenCalledWith(key, value)
    })

    it('should handle errors gracefully and log them', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const error = new Error('Cookie set error')
      ;(ClientCookies.set as jest.Mock).mockImplementation(() => {
        throw error
      })

      expect(() => setCookie('test', 'value', {})).not.toThrow()
      expect(consoleSpy).toHaveBeenCalledWith(error)

      consoleSpy.mockRestore()
    })

    it('should pass through additional config options', () => {
      const key = 'test'
      const value = 'test-value'
      const config: SetCookieOptions = {
        expires: 7,
        domain: 'example.com',
        secure: true,
        sameSite: 'strict',
      }

      setCookie(key, value, config)

      expect(ClientCookies.set).toHaveBeenCalledWith(key, value, config)
    })
  })

  describe('removeCookie', () => {
    it('should remove a cookie', () => {
      const key = 'test'

      removeCookie(key)

      expect(ClientCookies.remove).toHaveBeenCalledWith(key)
      expect(removeCookieFromStore).toHaveBeenCalledWith(key)
    })

    it('should handle errors gracefully and log them', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const error = new Error('Cookie remove error')
      ;(ClientCookies.remove as jest.Mock).mockImplementation(() => {
        throw error
      })

      expect(() => removeCookie('test')).not.toThrow()
      expect(consoleSpy).toHaveBeenCalledWith(error)

      consoleSpy.mockRestore()
    })
  })
})
