import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormattedMessage } from 'react-intl'

import IntlProvider from '..'
import { LANGUAGE_COOKIE_NAME, Locale } from '../../../types'
import { useLocale } from '../hooks'

const { getLanguage, setLanguage, isMobilePlatform, getItem, getLocales } = vi.hoisted(() => ({
  getLanguage: vi.fn<() => Promise<string | null>>(),
  setLanguage: vi.fn<(locale: string) => Promise<void>>(),
  isMobilePlatform: vi.fn(() => false),
  getItem: vi.fn<(key: string) => string | null>(() => null),
  getLocales: vi.fn<() => { languageCode: string | null }[]>(() => []),
}))

vi.mock('../../../functions/getLanguage', () => ({ getLanguage }))
vi.mock('../../../functions/setLanguage', () => ({ setLanguage }))
vi.mock('expo-secure-store', () => ({ getItem }))
vi.mock('expo-localization', () => ({ getLocales }))
vi.mock('@baseapp-frontend/utils', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  isMobilePlatform,
}))

const Probe = ({ next = 'pt' }: { next?: Locale }) => {
  const { locale, setLocale } = useLocale()
  return (
    <button type="button" onClick={() => setLocale(next)}>
      {locale}
    </button>
  )
}

const cookie = (locale: string) => ({ [LANGUAGE_COOKIE_NAME]: locale })

beforeEach(() => {
  getLanguage.mockReset().mockResolvedValue(null)
  setLanguage.mockReset().mockResolvedValue(undefined)
  isMobilePlatform.mockReset().mockReturnValue(false)
  getItem.mockReset().mockReturnValue(null)
  getLocales.mockReset().mockReturnValue([])
})

describe('IntlProvider', () => {
  it('uses the locale prop over the cookie and skips detection', () => {
    render(
      <IntlProvider locale="es" initialCookies={cookie('pt')}>
        <Probe />
      </IntlProvider>,
    )

    expect(screen.getByRole('button').textContent).toBe('es')
    expect(getLanguage).not.toHaveBeenCalled()
  })

  it('uses a supported cookie over storage detection', () => {
    getLanguage.mockResolvedValue('es')
    render(
      <IntlProvider initialCookies={cookie('pt')}>
        <Probe />
      </IntlProvider>,
    )

    expect(screen.getByRole('button').textContent).toBe('pt')
    expect(getLanguage).not.toHaveBeenCalled()
  })

  it('ignores an unsupported cookie and detects the stored language', async () => {
    getLanguage.mockResolvedValue('es')
    render(
      <IntlProvider initialCookies={cookie('fr')}>
        <Probe />
      </IntlProvider>,
    )

    expect(screen.getByRole('button').textContent).toBe('en')
    await waitFor(() => expect(screen.getByRole('button').textContent).toBe('es'))
  })

  it('keeps the default locale when the stored language cannot be read', async () => {
    getLanguage.mockRejectedValue(new Error('no storage'))
    render(
      <IntlProvider defaultLocale="pt">
        <Probe />
      </IntlProvider>,
    )

    await waitFor(() => expect(getLanguage).toHaveBeenCalled())
    expect(screen.getByRole('button').textContent).toBe('pt')
  })

  it('follows the locale prop when it changes', () => {
    const { rerender } = render(
      <IntlProvider locale="en">
        <Probe />
      </IntlProvider>,
    )

    rerender(
      <IntlProvider locale="pt">
        <Probe />
      </IntlProvider>,
    )

    expect(screen.getByRole('button').textContent).toBe('pt')
  })

  it('renders the additional messages of the active locale', () => {
    render(
      <IntlProvider locale="es" additionalMessages={{ es: { greeting: 'Hola' } }}>
        <FormattedMessage id="greeting" defaultMessage="Hello" />
      </IntlProvider>,
    )

    expect(screen.getByText('Hola')).toBeTruthy()
  })

  it('renders the stored language on native from the first frame', () => {
    isMobilePlatform.mockReturnValue(true)
    getItem.mockReturnValue('pt')
    getLocales.mockReturnValue([{ languageCode: 'es' }])
    render(
      <IntlProvider>
        <Probe />
      </IntlProvider>,
    )

    expect(screen.getByRole('button').textContent).toBe('pt')
    expect(getLanguage).not.toHaveBeenCalled()
  })

  it('renders the device language on native when nothing is stored', () => {
    isMobilePlatform.mockReturnValue(true)
    getLocales.mockReturnValue([{ languageCode: 'fr' }, { languageCode: 'es' }])
    render(
      <IntlProvider>
        <Probe />
      </IntlProvider>,
    )

    expect(screen.getByRole('button').textContent).toBe('es')
    expect(getLanguage).not.toHaveBeenCalled()
  })

  it('switches in place on native', async () => {
    isMobilePlatform.mockReturnValue(true)
    render(
      <IntlProvider>
        <Probe next="pt" />
      </IntlProvider>,
    )
    expect(screen.getByRole('button').textContent).toBe('en')

    await userEvent.click(screen.getByRole('button'))

    expect(setLanguage).toHaveBeenCalledWith('pt')
    await waitFor(() => expect(screen.getByRole('button').textContent).toBe('pt'))
  })
})
