import { getInitialLocale } from '..'
import { LANGUAGE_COOKIE_NAME } from '../../../types'

const { isMobilePlatform, getItem, getDeviceLocale } = vi.hoisted(() => ({
  isMobilePlatform: vi.fn(() => false),
  getItem: vi.fn<(key: string) => string | null>(() => null),
  getDeviceLocale: vi.fn<() => 'en' | 'es' | 'pt' | undefined>(() => undefined),
}))

vi.mock('@baseapp-frontend/utils', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  isMobilePlatform,
}))
vi.mock('expo-secure-store', () => ({ getItem }))
vi.mock('../../getDeviceLocale', () => ({ getDeviceLocale }))

beforeEach(() => {
  isMobilePlatform.mockReset().mockReturnValue(true)
  getItem.mockReset().mockReturnValue(null)
  getDeviceLocale.mockReset().mockReturnValue(undefined)
})

describe('getInitialLocale', () => {
  it('returns the fallback on web without reading storage', () => {
    isMobilePlatform.mockReturnValue(false)
    getItem.mockReturnValue('pt')

    expect(getInitialLocale('es')).toBe('es')
    expect(getItem).not.toHaveBeenCalled()
  })

  it('prefers the stored language on native', () => {
    getItem.mockReturnValue('pt')
    getDeviceLocale.mockReturnValue('es')

    expect(getInitialLocale()).toBe('pt')
    expect(getItem).toHaveBeenCalledWith(LANGUAGE_COOKIE_NAME)
  })

  it('uses the device locale for an unsupported stored language', () => {
    getItem.mockReturnValue('fr')
    getDeviceLocale.mockReturnValue('es')

    expect(getInitialLocale()).toBe('es')
  })

  it('uses the device locale when storage cannot be read', () => {
    getItem.mockImplementation(() => {
      throw new Error('no keychain')
    })
    getDeviceLocale.mockReturnValue('pt')

    expect(getInitialLocale()).toBe('pt')
  })

  it('returns the fallback when nothing is stored and no device locale is supported', () => {
    expect(getInitialLocale()).toBe('en')
    expect(getInitialLocale('es')).toBe('es')
  })
})
