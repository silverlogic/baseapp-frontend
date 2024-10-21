import { setItemAsync } from 'expo-secure-store'

import { setTokenAsync } from '..'
import { setCookie } from '../../../cookie'

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
}))

jest.mock('../../../cookie', () => ({
  setCookie: jest.fn(),
}))

describe('setTokenAsync', () => {
  const mockKey = 'test-key'
  const mockValue = 'test-value'

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call setItemAsync on mobile platform', async () => {
    process.env.EXPO_PUBLIC_PLATFORM = 'mobile'

    await setTokenAsync(mockKey, mockValue)

    expect(setItemAsync).toHaveBeenCalledWith(mockKey, mockValue)
    expect(setItemAsync).toHaveBeenCalledTimes(1)

    expect(setCookie).not.toHaveBeenCalled()
  })

  it('should call setCookie on non-mobile platform', async () => {
    process.env.EXPO_PUBLIC_PLATFORM = undefined

    await setTokenAsync(mockKey, mockValue)

    expect(setCookie).toHaveBeenCalledWith(mockKey, mockValue, undefined)
    expect(setCookie).toHaveBeenCalledTimes(1)

    expect(setItemAsync).not.toHaveBeenCalled()
  })

  it('should not throw error when setItemAsync fails on mobile', async () => {
    process.env.EXPO_PUBLIC_PLATFORM = 'mobile'
    ;(setItemAsync as jest.Mock).mockImplementationOnce(async () => {
      throw new Error('SecureStore Error')
    })

    await expect(setTokenAsync(mockKey, mockValue)).resolves.not.toThrow()

    expect(setItemAsync).toHaveBeenCalledWith(mockKey, mockValue)
    expect(setCookie).not.toHaveBeenCalled()
  })

  it('should not throw error when setCookie fails on non-mobile platform', async () => {
    process.env.EXPO_PUBLIC_PLATFORM = undefined
    ;(setCookie as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Cookie Error')
    })

    await expect(setTokenAsync(mockKey, mockValue)).resolves.not.toThrow()

    expect(setCookie).toHaveBeenCalledWith(mockKey, mockValue, undefined)
    expect(setItemAsync).not.toHaveBeenCalled()
  })

  it('should call setCookie with the configuration object on non-mobile platform', async () => {
    process.env.EXPO_PUBLIC_PLATFORM = 'web'
    const mockConfig = { secure: true }

    await setTokenAsync(mockKey, mockValue, mockConfig)

    expect(setCookie).toHaveBeenCalledWith(mockKey, mockValue, mockConfig)
    expect(setCookie).toHaveBeenCalledTimes(1)

    expect(setItemAsync).not.toHaveBeenCalled()
  })
})
