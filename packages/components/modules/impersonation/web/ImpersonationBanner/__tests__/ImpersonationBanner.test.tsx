import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import ImpersonationBanner from '../index'

const { mockUseImpersonationBanner, mockEnd } = vi.hoisted(() => ({
  mockUseImpersonationBanner: vi.fn(),
  mockEnd: vi.fn(),
}))

// the common barrel pulls in relay documents, which the transform can't compile here
vi.mock('../../../common', async () => ({
  formatRemainingTime: (
    await vi.importActual<typeof import('../../../common/utils')>('../../../common/utils')
  ).formatRemainingTime,
  useImpersonationBanner: mockUseImpersonationBanner,
}))

const session = (overrides = {}) => ({
  id: 'session-1',
  readOnly: false,
  startedAt: '2026-10-22T10:00:00Z',
  expiresAt: '2026-10-22T11:00:00Z',
  impersonator: { id: 'user-1', fullName: 'Support Agent' },
  ...overrides,
})

const bannerState = (overrides = {}) => ({
  user: { id: 'user-2', fullName: 'Target User' },
  session: session(),
  remainingMs: 59 * 60 * 1000 + 5000,
  isExpired: false,
  endImpersonation: mockEnd,
  isEnding: false,
  ...overrides,
})

describe('ImpersonationBanner', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('shows who is impersonated, by whom, and the time left', () => {
    mockUseImpersonationBanner.mockReturnValue(bannerState())

    render(<ImpersonationBanner user={null} />)

    const { textContent } = screen.getByRole('region', { name: 'Impersonation session' })
    expect(textContent).toContain('Acting as Target User')
    expect(textContent).toContain('signed in as Support Agent')
    expect(textContent).toContain('ends in 59:05')
    expect(textContent).not.toContain('read only')
  })

  test('says so when the session is read only', () => {
    mockUseImpersonationBanner.mockReturnValue(
      bannerState({ session: session({ readOnly: true }) }),
    )

    render(<ImpersonationBanner user={null} />)

    expect(screen.getByRole('region').textContent).toContain('Viewing as Target User (read only)')
  })

  test('ends the session from its button', () => {
    mockUseImpersonationBanner.mockReturnValue(bannerState())

    render(<ImpersonationBanner user={null} endButtonLabel="Stop" redirectTo="/admin" />)
    fireEvent.click(screen.getByRole('button', { name: 'Stop' }))

    expect(mockEnd).toHaveBeenCalled()
    expect(mockUseImpersonationBanner).toHaveBeenCalledWith({ user: null, redirectTo: '/admin' })
  })

  test('disables the button while the session ends', () => {
    mockUseImpersonationBanner.mockReturnValue(bannerState({ isEnding: true }))

    render(<ImpersonationBanner user={null} />)

    expect(screen.getByRole<HTMLButtonElement>('button', { name: 'End session' }).disabled).toBe(
      true,
    )
  })

  test('renders nothing outside a session', () => {
    mockUseImpersonationBanner.mockReturnValue(bannerState({ session: null }))

    const { container } = render(<ImpersonationBanner user={null} />)

    expect(container.innerHTML).toBe('')
  })
})
