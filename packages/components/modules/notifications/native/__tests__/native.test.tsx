import { ReactNode } from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import NotificationSettingsGroups from '../NotificationSettingsGroups'
import NotificationsList from '../NotificationsList'
import NotificationItem from '../NotificationsList/NotificationItem'
import NotificationItemRenderer from '../NotificationsList/NotificationItem/NotificationItemRenderer'

/*
 * This runner renders to the DOM: react-native, react-native-paper and the native design system are
 * replaced by plain elements, so these tests check what the native components render and send, not
 * how they look.
 */
const {
  mockUseNotificationSettingsGroups,
  mockUseGroupNotificationsList,
  mockUseNotificationsSubscription,
  mockMarkAllAsReadButton,
  mockMarkAsRead,
} = vi.hoisted(() => ({
  mockMarkAsRead: vi.fn(),
  mockUseNotificationSettingsGroups: vi.fn(),
  mockUseGroupNotificationsList: vi.fn(),
  mockUseNotificationsSubscription: vi.fn(),
  mockMarkAllAsReadButton: vi.fn(),
}))

vi.mock('react-native', () => ({
  Platform: { OS: 'web' },
  StyleSheet: { create: (styles: unknown) => styles },
  Pressable: ({ children, onPress }: { children: ReactNode; onPress: () => void }) => (
    <button type="button" onClick={onPress}>
      {children}
    </button>
  ),
}))

vi.mock('react-native-paper', () => ({
  Switch: ({ value, disabled, onValueChange, accessibilityLabel }: any) => (
    <input
      type="checkbox"
      aria-label={accessibilityLabel}
      checked={value}
      disabled={disabled}
      onChange={(event) => onValueChange(event.target.checked)}
    />
  ),
}))

vi.mock('@baseapp-frontend/design-system/components/native/typographies', () => ({
  Text: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}))

vi.mock('@baseapp-frontend/design-system/components/native/views', () => ({
  View: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  InfiniteScrollerView: ({ data, renderItem }: any) => (
    <ul>
      {data.map((item: any, index: number) => (
        <li key={item.id}>{renderItem({ item, index })}</li>
      ))}
    </ul>
  ),
}))

vi.mock('@baseapp-frontend/design-system/components/native/avatars', () => ({
  AvatarWithPlaceholder: () => <img alt="avatar" />,
}))

vi.mock('@baseapp-frontend/design-system/components/native/badges', () => ({
  Badge: () => <span>unread</span>,
}))

vi.mock('@baseapp-frontend/design-system/components/native/icons', () => ({
  BellIcon: () => <span>bell</span>,
}))

vi.mock('@baseapp-frontend/design-system/components/native/displays', () => ({
  LoadingScreen: () => <span>loading</span>,
}))

vi.mock('@baseapp-frontend/design-system/providers/native', () => ({
  useTheme: () => ({ colors: { surface: { border: '', active: '' }, error: { main: '' } } }),
}))

// the graphql tags need the relay babel transform, which this runner does not apply
vi.mock('react-relay', async () => ({
  ...(await vi.importActual('react-relay')),
  graphql: () => ({}),
  useFragment: (_fragment: unknown, ref: unknown) => ref,
}))

vi.mock('../../common', async () => ({
  ...(await vi.importActual('../../common')),
  useNotificationSettingsGroups: mockUseNotificationSettingsGroups,
  useGroupNotificationsList: mockUseGroupNotificationsList,
  useNotificationsSubscription: mockUseNotificationsSubscription,
  useNotificationsMarkAsRead: () => [mockMarkAsRead, false],
}))

vi.mock('../NotificationsList/MarkAllAsReadButton', () => ({
  default: (props: any) => {
    mockMarkAllAsReadButton(props)
    return <span>Mark all as read</span>
  },
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

describe('native NotificationItemRenderer', () => {
  it('falls back to the generic item for verbs without a dedicated component', () => {
    render(<NotificationItemRenderer notification={buildNotification()} />)

    expect(screen.getByText('Jane Doe')).toBeTruthy()
    expect(screen.getByText('Your registration is confirmed.')).toBeTruthy()
    expect(screen.getByAltText('avatar')).toBeTruthy()
  })

  it('renders no avatar for an actor without a name', () => {
    render(
      <NotificationItemRenderer
        notification={buildNotification({ actor: { id: 'user-1', __typename: 'User' } })}
      />,
    )

    expect(screen.getByText('Your registration is confirmed.')).toBeTruthy()
    expect(screen.queryByAltText('avatar')).toBeNull()
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
})

describe('native NotificationItem', () => {
  beforeEach(() => mockMarkAsRead.mockClear())

  it('marks an unread notification as read and hands it to onPress', () => {
    const onPress = vi.fn()
    const notification = buildNotification()
    render(<NotificationItem notification={notification} refetch={vi.fn()} onPress={onPress} />)

    fireEvent.click(screen.getByRole('button'))

    expect(mockMarkAsRead).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { input: { read: true, notificationIds: ['notification-1'] } },
      }),
    )
    expect(onPress).toHaveBeenCalledWith(notification)
  })

  it('passes renderer props through', () => {
    render(
      <NotificationItem
        notification={buildNotification()}
        refetch={vi.fn()}
        NotificationItemRendererProps={{ GenericNotificationItem: null }}
      />,
    )

    expect(screen.queryByText('Your registration is confirmed.')).toBeNull()
  })
})

describe('native NotificationSettingsGroups', () => {
  const setChannelActive = vi.fn()

  beforeEach(() => {
    setChannelActive.mockClear()
    mockUseNotificationSettingsGroups.mockReturnValue({
      groups: [
        {
          key: 'EVENTS',
          label: 'Events',
          description: 'Registrations and reminders.',
          isLocked: false,
          channels: [
            { channel: 'IN_APP', isActive: true },
            { channel: 'EMAIL', isActive: false },
          ],
        },
        {
          key: 'ACCOUNT',
          label: 'Account',
          description: null,
          isLocked: true,
          channels: [{ channel: 'EMAIL', isActive: true }],
        },
      ],
      channels: ['IN_APP', 'EMAIL'],
      setChannelActive,
      isMutationInFlight: false,
    })
  })

  it('renders one switch per group channel and sends a change', () => {
    render(<NotificationSettingsGroups user={{} as any} />)

    expect(screen.getByText('Registrations and reminders.')).toBeTruthy()
    const eventsEmail = screen.getByLabelText('Email notifications for Events') as HTMLInputElement
    expect(eventsEmail.checked).toBe(false)
    expect(
      (screen.getByLabelText('In-app notifications for Events') as HTMLInputElement).checked,
    ).toBe(true)

    fireEvent.click(eventsEmail)
    expect(setChannelActive).toHaveBeenCalledWith('EVENTS', 'EMAIL', true)
  })

  it('disables a locked group and shows the hint', () => {
    render(<NotificationSettingsGroups user={{} as any} lockedHint="Always on" />)

    const lockedSwitch = screen.getByLabelText(
      'Email notifications for Account',
    ) as HTMLInputElement
    expect(lockedSwitch.disabled).toBe(true)
    expect(screen.getByText('Always on')).toBeTruthy()
  })

  it('takes copy from props and shows the empty state', () => {
    const { rerender } = render(
      <NotificationSettingsGroups
        user={{} as any}
        channelLabels={{ EMAIL: 'E-mail' }}
        getSwitchLabel={(group, channel) => `${group} by ${channel}`}
      />,
    )
    expect(screen.getByLabelText('Events by E-mail')).toBeTruthy()

    mockUseNotificationSettingsGroups.mockReturnValue({
      groups: [],
      channels: [],
      setChannelActive,
      isMutationInFlight: false,
    })
    rerender(<NotificationSettingsGroups user={{} as any} emptyStateText="Nothing to configure." />)
    expect(screen.getByText('Nothing to configure.')).toBeTruthy()
  })
})

describe('native NotificationsList with a group', () => {
  const groupList = (unreadNotificationIds: string[]) => ({
    data: {
      id: 'user-1',
      notificationsUnreadCount: 5,
      notifications: {
        edges: [
          { node: { id: 'n1', unread: unreadNotificationIds.includes('n1') } },
          { node: { id: 'n2', unread: false } },
        ],
      },
    },
    loadNext: vi.fn(),
    isLoadingNext: false,
    hasNext: false,
    refetchNotifications: vi.fn(),
    unreadNotificationIds,
  })

  const NotificationItem = ({ notification }: any) => <p>item {notification.id}</p>

  beforeEach(() => {
    mockMarkAllAsReadButton.mockClear()
    mockUseNotificationsSubscription.mockClear()
  })

  it("lists the group and marks only the group's unread notifications", () => {
    mockUseGroupNotificationsList.mockReturnValue(groupList(['n1']))

    render(<NotificationsList group="EVENTS" NotificationItem={NotificationItem} />)

    expect(mockUseGroupNotificationsList).toHaveBeenCalledWith('EVENTS')
    expect(mockUseNotificationsSubscription).toHaveBeenCalledWith('user-1')
    expect(screen.getByText('item n1')).toBeTruthy()
    expect(screen.getByText('item n2')).toBeTruthy()
    expect(mockMarkAllAsReadButton).toHaveBeenLastCalledWith(
      expect.objectContaining({ disabled: false, notificationIds: ['n1'] }),
    )
  })

  it('disables "Mark all as read" when the group has nothing unread, whatever the user count', () => {
    mockUseGroupNotificationsList.mockReturnValue(groupList([]))

    render(<NotificationsList group="EVENTS" NotificationItem={NotificationItem} />)

    expect(mockMarkAllAsReadButton).toHaveBeenLastCalledWith(
      expect.objectContaining({ disabled: true, notificationIds: [] }),
    )
  })
})
