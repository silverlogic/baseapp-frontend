import { getCurrentLocale } from '..'

const { getLanguage } = vi.hoisted(() => ({ getLanguage: vi.fn<() => Promise<string | null>>() }))

vi.mock('../../getLanguage', () => ({ getLanguage }))

const setNavigatorLanguage = (language: string) => {
  Object.defineProperty(navigator, 'languages', { value: [language], configurable: true })
  Object.defineProperty(navigator, 'language', { value: language, configurable: true })
}

beforeEach(() => {
  getLanguage.mockReset().mockResolvedValue(null)
})

describe('getCurrentLocale', () => {
  it('returns the stored language when it is supported', async () => {
    getLanguage.mockResolvedValue('pt')
    setNavigatorLanguage('es-ES')

    await expect(getCurrentLocale()).resolves.toBe('pt')
  })

  it('falls back to the browser language for an unsupported stored one', async () => {
    getLanguage.mockResolvedValue('fr')
    setNavigatorLanguage('es-ES')

    await expect(getCurrentLocale()).resolves.toBe('es')
  })

  it('returns the fallback when neither is supported', async () => {
    setNavigatorLanguage('fr-FR')

    await expect(getCurrentLocale()).resolves.toBe('en')
    await expect(getCurrentLocale('pt')).resolves.toBe('pt')
  })
})
