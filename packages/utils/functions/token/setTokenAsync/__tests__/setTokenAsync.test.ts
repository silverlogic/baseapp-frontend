import { setItemAsync } from 'expo-secure-store'
import type { Mock } from 'vitest'

import { setTokenAsync } from '..'
import { setCookie } from '../../../cookie'
import { isMobilePlatform } from '../../../os'

vi.mock('expo-secure-store', async () => ({
  setItemAsync: vi.fn(),
}))

vi.mock('../../../cookie', async () => ({
  setCookie: vi.fn(),
}))

vi.mock('../../../os', async () => ({
  isMobilePlatform: vi.fn(),
}))

describe('setTokenAsync', () => {
  const mockKey = 'test-key'
  const mockValue = 'test-value'

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call setItemAsync on mobile platform', async () => {
    ;(isMobilePlatform as Mock).mockReturnValue(true)

    await setTokenAsync(mockKey, mockValue)

    expect(setItemAsync).toHaveBeenCalledWith(mockKey, mockValue)
    expect(setItemAsync).toHaveBeenCalledTimes(1)

    expect(setCookie).not.toHaveBeenCalled()
  })

  it('should call setCookie on non-mobile platform', async () => {
    ;(isMobilePlatform as Mock).mockReturnValue(false)

    await setTokenAsync(mockKey, mockValue)

    expect(setCookie).toHaveBeenCalledWith(mockKey, mockValue, undefined)
    expect(setCookie).toHaveBeenCalledTimes(1)

    expect(setItemAsync).not.toHaveBeenCalled()
  })

  it('should not throw error when setItemAsync fails on mobile', async () => {
    ;(isMobilePlatform as Mock).mockReturnValue(true)
    ;(setItemAsync as Mock).mockImplementationOnce(async () => {
      throw new Error('SecureStore Error')
    })

    await expect(setTokenAsync(mockKey, mockValue)).resolves.not.toThrow()

    expect(setItemAsync).toHaveBeenCalledWith(mockKey, mockValue)
    expect(setCookie).not.toHaveBeenCalled()
  })

  it('should not throw error when setCookie fails on non-mobile platform', async () => {
    ;(isMobilePlatform as Mock).mockReturnValue(false)
    ;(setCookie as Mock).mockImplementationOnce(() => {
      throw new Error('Cookie Error')
    })

    await expect(setTokenAsync(mockKey, mockValue)).resolves.not.toThrow()

    expect(setCookie).toHaveBeenCalledWith(mockKey, mockValue, undefined)
    expect(setItemAsync).not.toHaveBeenCalled()
  })

  it('should call setCookie with the configuration object on non-mobile platform', async () => {
    ;(isMobilePlatform as Mock).mockReturnValue(false)
    const mockConfig = { secure: true }

    await setTokenAsync(mockKey, mockValue, mockConfig)

    expect(setCookie).toHaveBeenCalledWith(mockKey, mockValue, mockConfig)
    expect(setCookie).toHaveBeenCalledTimes(1)

    expect(setItemAsync).not.toHaveBeenCalled()
  })
})
