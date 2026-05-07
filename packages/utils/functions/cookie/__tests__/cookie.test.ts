import ClientCookies from 'js-cookie'

import { getCookie, removeCookie, setCookie } from '..'
import {
  COOKIE_CHANGE_EVENT,
  type CookieChangeEventDetail,
} from '../../../hooks/useCookie/constants'
import { SetCookieOptions } from '../types'

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}))

describe('Cookie Functions', () => {
  let dispatchSpy: jest.SpyInstance

  beforeEach(() => {
    jest.clearAllMocks()
    dispatchSpy = jest.spyOn(window, 'dispatchEvent')
  })

  afterEach(() => {
    dispatchSpy.mockRestore()
  })

  describe('getCookie', () => {
    it('should get a cookie from ClientCookies', () => {
      const mockCookie = 'test-cookie'
      ;(ClientCookies.get as jest.Mock).mockReturnValue(mockCookie)

      const result = getCookie('test')

      expect(result).toBe(mockCookie)
      expect(ClientCookies.get).toHaveBeenCalledWith('test')
    })

    it('should parse JSON when parseJSON is true', () => {
      const mockCookie = JSON.stringify({ key: 'value' })
      ;(ClientCookies.get as jest.Mock).mockReturnValue(mockCookie)

      const result = getCookie('test', { parseJSON: true })

      expect(result).toEqual({ key: 'value' })
    })

    it('should return raw cookie if JSON parsing fails', () => {
      const malformedJson = '{"malformedJson":'
      ;(ClientCookies.get as jest.Mock).mockReturnValue(malformedJson)

      const result = getCookie('test', { parseJSON: true })

      expect(result).toBe(malformedJson)
    })

    it('should not parse the cookie if parseJSON is false', () => {
      const mockCookie = '{"key": "value"}'
      ;(ClientCookies.get as jest.Mock).mockReturnValue(mockCookie)

      const result = getCookie('test', { parseJSON: false })

      expect(result).toBe(mockCookie)
    })

    it('should return undefined when cookie does not exist', () => {
      ;(ClientCookies.get as jest.Mock).mockReturnValue(undefined)

      const result = getCookie('nonexistent')

      expect(result).toBeUndefined()
    })

    it('should return undefined when cookie is undefined and parseJSON is true', () => {
      ;(ClientCookies.get as jest.Mock).mockReturnValue(undefined)

      const result = getCookie('nonexistent', { parseJSON: true })

      expect(result).toBeUndefined()
    })
  })

  describe('setCookie', () => {
    it('should set a cookie without stringifying and dispatch a set event', () => {
      const key = 'test'
      const value = 'test-value'
      const config: SetCookieOptions = { expires: 7 }

      setCookie(key, value, config)

      expect(ClientCookies.set).toHaveBeenCalledWith(key, value, config)
      expect(dispatchSpy).toHaveBeenCalledWith(expect.any(CustomEvent))
      const event = dispatchSpy.mock.calls[0]![0] as CustomEvent<CookieChangeEventDetail>
      expect(event.type).toBe(COOKIE_CHANGE_EVENT)
      expect(event.detail).toEqual({ type: 'set', key, value })
    })

    it('should set a cookie with stringifying when stringfyValue is true', () => {
      const key = 'test'
      const value = { data: 'test-data' }
      const config: SetCookieOptions = { expires: 7, stringfyValue: true }

      setCookie(key, value, config)

      const expectedValue = JSON.stringify(value)
      expect(ClientCookies.set).toHaveBeenCalledWith(key, expectedValue, { expires: 7 })
      const event = dispatchSpy.mock.calls[0]![0] as CustomEvent<CookieChangeEventDetail>
      expect(event.detail).toEqual({ type: 'set', key, value: expectedValue })
    })

    it('should set a cookie with default options', () => {
      const key = 'test'
      const value = 'test-value'

      setCookie(key, value)

      expect(ClientCookies.set).toHaveBeenCalledWith(key, value, {})
    })

    it('should handle errors gracefully and not dispatch on failure', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const error = new Error('Cookie set error')
      ;(ClientCookies.set as jest.Mock).mockImplementation(() => {
        throw error
      })

      expect(() => setCookie('test', 'value', {})).not.toThrow()
      expect(consoleSpy).toHaveBeenCalledWith(error)
      expect(dispatchSpy).not.toHaveBeenCalled()

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
    it('should remove a cookie and dispatch a remove event', () => {
      const key = 'test'

      removeCookie(key)

      expect(ClientCookies.remove).toHaveBeenCalledWith(key)
      const event = dispatchSpy.mock.calls[0]![0] as CustomEvent<CookieChangeEventDetail>
      expect(event.type).toBe(COOKIE_CHANGE_EVENT)
      expect(event.detail).toEqual({ type: 'remove', key })
    })

    it('should handle errors gracefully and not dispatch on failure', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const error = new Error('Cookie remove error')
      ;(ClientCookies.remove as jest.Mock).mockImplementation(() => {
        throw error
      })

      expect(() => removeCookie('test')).not.toThrow()
      expect(consoleSpy).toHaveBeenCalledWith(error)
      expect(dispatchSpy).not.toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })
})
