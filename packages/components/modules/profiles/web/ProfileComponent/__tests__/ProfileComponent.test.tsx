import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import ProfileComponent from '../index'

const { mockProfile } = vi.hoisted(() => ({
  mockProfile: {
    value: {} as Record<string, unknown>,
  },
}))

vi.mock('react-relay', async () => ({
  ...(await vi.importActual('react-relay')),
  useFragment: () => mockProfile.value,
}))

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }))

vi.mock('@baseapp-frontend/utils', async () => ({
  ...(await vi.importActual('@baseapp-frontend/utils')),
  useNotification: () => ({ sendToast: vi.fn() }),
}))

// the barrel pulls in relay documents, which the transform can't compile here
vi.mock('../../../common', () => ({
  ProfileComponentFragment: {},
  formatFollowCount: (count: number) => String(count ?? 0),
}))
vi.mock('../FollowToggleButton', () => ({ default: () => <button type="button">Follow</button> }))
vi.mock('../BlockButtonWithDialog', () => ({ default: () => null }))
vi.mock('../ReportButtonWithDialog', () => ({ default: () => null }))

const MessageButton = ({ profileId }: { profileId: string }) => (
  <button type="button">{`Message ${profileId}`}</button>
)

const renderProfile = (props: Partial<Parameters<typeof ProfileComponent>[0]> = {}) =>
  render(<ProfileComponent profile={{} as any} currentProfileId="me" {...props} />)

describe('ProfileComponent MessageButton slot', () => {
  beforeEach(() => {
    mockProfile.value = { id: 'them', name: 'Them', isBlockedByMe: false }
  })

  it('renders no message button by default', () => {
    renderProfile()

    expect(screen.getByRole('button', { name: 'Follow' })).toBeTruthy()
    expect(screen.queryByRole('button', { name: /Message/ })).toBeNull()
  })

  it('renders the given message button for another profile', () => {
    renderProfile({ MessageButton })

    expect(screen.getByRole('button', { name: 'Message them' })).toBeTruthy()
  })

  it('does not render it on the current profile', () => {
    mockProfile.value = { id: 'me', name: 'Me', isBlockedByMe: false }
    renderProfile({ MessageButton })

    expect(screen.queryByRole('button', { name: /Message/ })).toBeNull()
  })

  it('does not render it for a blocked profile', () => {
    mockProfile.value = { id: 'them', name: 'Them', isBlockedByMe: true }
    renderProfile({ MessageButton })

    expect(screen.queryByRole('button', { name: /Message/ })).toBeNull()
  })
})
