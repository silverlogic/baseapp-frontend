import { deleteItemAsync } from 'expo-secure-store'
import type { Mock } from 'vitest'

import { removeTokenAsync } from '..'
import { removeCookie } from '../../../cookie'
import { isMobilePlatform } from '../../../os'

vi.mock('expo-secure-store', async () => ({
  deleteItemAsync: vi.fn(),
}))

vi.mock('../../../cookie', async () => ({
  removeCookie: vi.fn(),
}))

vi.mock('../../../os', async () => ({
  isMobilePlatform: vi.fn(),
}))

describe('removeTokenAsync', () => {
  const mockKey = 'test-key'

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call deleteItemAsync on mobile platform', async () => {
    ;(isMobilePlatform as Mock).mockReturnValue(true)

    await removeTokenAsync(mockKey)

    expect(deleteItemAsync).toHaveBeenCalledWith(mockKey)
    expect(deleteItemAsync).toHaveBeenCalledTimes(1)
    expect(removeCookie).not.toHaveBeenCalled()
  })

  it('should call removeCookie on non-mobile platform', async () => {
    ;(isMobilePlatform as Mock).mockReturnValue(false)

    await removeTokenAsync(mockKey)

    expect(removeCookie).toHaveBeenCalledWith(mockKey)
    expect(removeCookie).toHaveBeenCalledTimes(1)
    expect(deleteItemAsync).not.toHaveBeenCalled()
  })

  it('should not throw error when deleteItemAsync fails on mobile', async () => {
    ;(isMobilePlatform as Mock).mockReturnValue(true)
    ;(deleteItemAsync as Mock).mockImplementationOnce(async () => {
      throw new Error('SecureStore Error')
    })

    await expect(removeTokenAsync(mockKey)).resolves.not.toThrow()

    expect(deleteItemAsync).toHaveBeenCalledWith(mockKey)
    expect(removeCookie).not.toHaveBeenCalled()
  })

  it('should not throw error when removeCookie fails on non-mobile platform', async () => {
    ;(isMobilePlatform as Mock).mockReturnValue(false)
    ;(removeCookie as Mock).mockImplementationOnce(() => {
      throw new Error('Cookie Error')
    })

    await expect(removeTokenAsync(mockKey)).resolves.not.toThrow()

    expect(removeCookie).toHaveBeenCalledWith(mockKey)
    expect(deleteItemAsync).not.toHaveBeenCalled()
  })
})
