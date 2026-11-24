import { getDeviceLocale } from '..'

const { isMobilePlatform, getLocales } = vi.hoisted(() => ({
  isMobilePlatform: vi.fn(() => false),
  getLocales: vi.fn<() => { languageCode: string | null }[]>(() => []),
}))

vi.mock('@baseapp-frontend/utils', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  isMobilePlatform,
}))
vi.mock('expo-localization', () => ({ getLocales }))

const setNavigatorLanguages = (languages: string[], language = languages[0] ?? '') => {
  Object.defineProperty(navigator, 'languages', { value: languages, configurable: true })
  Object.defineProperty(navigator, 'language', { value: language, configurable: true })
}

beforeEach(() => {
  isMobilePlatform.mockReset().mockReturnValue(false)
  getLocales.mockReset().mockReturnValue([])
})

describe('getDeviceLocale', () => {
  it('walks the browser languages and takes the first supported one', () => {
    setNavigatorLanguages(['fr-FR', 'pt-BR', 'en-US'])

    expect(getDeviceLocale()).toBe('pt')
  })

  it('falls back to navigator.language when the list is empty', () => {
    setNavigatorLanguages([], 'es-MX')

    expect(getDeviceLocale()).toBe('es')
  })

  it('returns undefined when no browser language is supported', () => {
    setNavigatorLanguages(['fr-FR', 'de-DE'])

    expect(getDeviceLocale()).toBeUndefined()
  })

  it('walks the device locales on native and skips entries without a language code', () => {
    isMobilePlatform.mockReturnValue(true)
    setNavigatorLanguages(['en-US'])
    getLocales.mockReturnValue([{ languageCode: null }, { languageCode: 'fr' }, { languageCode: 'pt' }])

    expect(getDeviceLocale()).toBe('pt')
  })

  it('returns undefined on native when no device locale is supported', () => {
    isMobilePlatform.mockReturnValue(true)
    getLocales.mockReturnValue([{ languageCode: 'fr' }])

    expect(getDeviceLocale()).toBeUndefined()
  })
})
