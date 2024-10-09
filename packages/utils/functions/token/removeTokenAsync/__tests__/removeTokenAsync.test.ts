import { deleteItemAsync } from 'expo-secure-store'

import { removeTokenAsync } from '..'
import { removeCookie } from '../../../cookie'

jest.mock('expo-secure-store', () => ({
  deleteItemAsync: jest.fn(),
}))

jest.mock('../../../cookie', () => ({
  removeCookie: jest.fn(),
}))

describe('removeTokenAsync', () => {
  const mockKey = 'test-key'

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call deleteItemAsync on mobile platform', async () => {
    process.env.EXPO_PUBLIC_PLATFORM = 'mobile'

    await removeTokenAsync(mockKey)

    expect(deleteItemAsync).toHaveBeenCalledWith(mockKey)
    expect(deleteItemAsync).toHaveBeenCalledTimes(1)
    expect(removeCookie).not.toHaveBeenCalled()
  })

  it('should call removeCookie on non-mobile platform', async () => {
    process.env.EXPO_PUBLIC_PLATFORM = undefined

    await removeTokenAsync(mockKey)

    expect(removeCookie).toHaveBeenCalledWith(mockKey)
    expect(removeCookie).toHaveBeenCalledTimes(1)
    expect(deleteItemAsync).not.toHaveBeenCalled()
  })

  it('should not throw error when deleteItemAsync fails on mobile', async () => {
    process.env.EXPO_PUBLIC_PLATFORM = 'mobile'
    ;(deleteItemAsync as jest.Mock).mockImplementationOnce(async () => {
      throw new Error('SecureStore Error')
    })

    await expect(removeTokenAsync(mockKey)).resolves.not.toThrow()

    expect(deleteItemAsync).toHaveBeenCalledWith(mockKey)
    expect(removeCookie).not.toHaveBeenCalled()
  })

  it('should not throw error when removeCookie fails on non-mobile platform', async () => {
    process.env.EXPO_PUBLIC_PLATFORM = undefined
    ;(removeCookie as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Cookie Error')
    })

    await expect(removeTokenAsync(mockKey)).resolves.not.toThrow()

    expect(removeCookie).toHaveBeenCalledWith(mockKey)
    expect(deleteItemAsync).not.toHaveBeenCalled()
  })
})
