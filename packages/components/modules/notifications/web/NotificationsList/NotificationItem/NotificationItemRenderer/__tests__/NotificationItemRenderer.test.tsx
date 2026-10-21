import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import NotificationItemRenderer from '../index'

// the graphql tags in the module barrel need the relay babel transform, which this runner skips
vi.mock('react-relay', async () => ({
  ...(await vi.importActual('react-relay')),
  graphql: () => ({}),
}))

const buildNotification = (overrides = {}) =>
  ({
    id: 'notification-1',
    unread: true,
    timestamp: new Date().toISOString(),
    level: 'INFO',
    verb: 'EVENTS.REGISTRATION_CONFIRMED',
    description: 'Your registration is confirmed.',
    data: { url: '/events/12' },
    actor: { id: 'profile-1', __typename: 'Profile', name: 'Jane Doe', image: null },
    target: null,
    actionObject: null,
    ' $fragmentType': 'NotificationItemFragment',
    ...overrides,
  }) as any

describe('NotificationItemRenderer', () => {
  it('falls back to the generic item for verbs without a dedicated component', () => {
    render(<NotificationItemRenderer notification={buildNotification()} />)

    expect(screen.getByText('Jane Doe')).toBeTruthy()
    expect(screen.getByText('Your registration is confirmed.')).toBeTruthy()
    expect(screen.getByRole('link').getAttribute('href')).toBe('/events/12')
  })

  it('renders without a link or avatar when there is no url and no actor', () => {
    render(<NotificationItemRenderer notification={buildNotification({ data: {}, actor: null })} />)

    expect(screen.getByText('Your registration is confirmed.')).toBeTruthy()
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.queryByRole('img')).toBeNull()
  })

  it('ignores an unsafe url', () => {
    render(
      <NotificationItemRenderer
        notification={buildNotification({ data: { url: 'javascript:alert(1)' } })}
      />,
    )

    expect(screen.queryByRole('link')).toBeNull()
  })

  it('lets a project replace the fallback or turn it off', () => {
    const { rerender } = render(
      <NotificationItemRenderer
        notification={buildNotification()}
        GenericNotificationItem={({ notification }) => <p>custom {notification.verb}</p>}
      />,
    )
    expect(screen.getByText('custom EVENTS.REGISTRATION_CONFIRMED')).toBeTruthy()

    rerender(
      <NotificationItemRenderer
        notification={buildNotification()}
        GenericNotificationItem={null}
      />,
    )
    expect(screen.queryByText(/registration/)).toBeNull()
  })

  it('takes the url from a custom getter', () => {
    render(
      <NotificationItemRenderer
        notification={buildNotification()}
        GenericNotificationItemProps={{ getNotificationUrl: () => '/inbox' }}
      />,
    )

    expect(screen.getByRole('link').getAttribute('href')).toBe('/inbox')
  })
})
