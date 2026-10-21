import { useMemo } from 'react'

import { createTestEnvironment } from '@baseapp-frontend/graphql'

import { commitLocalUpdate } from 'react-relay'

import CustomNotificationItemForTesting from '../CustomNotificationItemForTesting'
import CustomNotificationListForTesting from '../CustomNotificationListForTesting'
import NotificationsPopoverForTesting from '../NotificationsPopoverForTesting'
import {
  emptyNotificationsListMockData,
  groupMarkAsReadMockData,
  groupNotificationsListAllReadMockData,
  groupNotificationsListMockData,
  markNotificationAsReadMockData,
  notificationsListMockData,
  notificationsListNextPageMockData,
  unreadNotificationsEmptyMockData,
  unreadNotificationsMockData,
} from '../__mocks__/requests'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * Ported from `__tests__/NotificationsPopover.cy.tsx` — the heaviest spec in the
 * suite, with 23 Relay resolution points across five scenarios.
 *
 * Two things force one story per scenario rather than `mount()` props: the
 * initial `NotificationsPopoverQuery` payload differs, and three of the five
 * scenarios swap in custom React components (`NotificationsList`,
 * `NotificationsListProps.NotificationItem`), which cannot cross the
 * Node/browser boundary.
 *
 * The mocks are deterministic, so the spec imports them directly for expected
 * values instead of bridging fixtures back.
 */
export interface NotificationsControls {
  resolvePopoverQuery: () => void
  resolveEmptyList: () => void
  resolveList: () => void
  resolveNextPage: () => void
  resolveMarkAsRead: () => void
  resolveGroupList: () => void
  resolveGroupListAllRead: () => void
  resolveGroupMarkAsRead: () => void
  /** Raises the user's unread count in the store, as a notification from the subscription does. */
  receiveNotification: () => void
  lastOperation: () => { name: string; variables: Record<string, unknown> }
}

declare global {
  interface Window {
    __notificationsControls: NotificationsControls
  }
}

const useSeededEnvironment = (data: unknown) =>
  useMemo(() => {
    const testEnvironment = createTestEnvironment()

    testEnvironment.queueOperationResolver({
      queryName: 'NotificationsPopoverQuery',
      data,
    })

    const { resolveMostRecentOperation } = testEnvironment

    window.__notificationsControls = {
      resolvePopoverQuery: () => resolveMostRecentOperation({ data: unreadNotificationsMockData }),
      resolveEmptyList: () => resolveMostRecentOperation({ data: emptyNotificationsListMockData }),
      resolveList: () => resolveMostRecentOperation({ data: notificationsListMockData }),
      resolveNextPage: () =>
        resolveMostRecentOperation({ data: notificationsListNextPageMockData }),
      resolveMarkAsRead: () => resolveMostRecentOperation({ data: markNotificationAsReadMockData }),
      resolveGroupList: () => resolveMostRecentOperation({ data: groupNotificationsListMockData }),
      resolveGroupListAllRead: () =>
        resolveMostRecentOperation({ data: groupNotificationsListAllReadMockData }),
      resolveGroupMarkAsRead: () => resolveMostRecentOperation({ data: groupMarkAsReadMockData }),
      receiveNotification: () =>
        commitLocalUpdate(testEnvironment.environment, (store) => {
          const user = store.get('user-1')
          const count = Number(user?.getValue('notificationsUnreadCount') ?? 0)
          user?.setValue(count + 1, 'notificationsUnreadCount')
        }),
      lastOperation: () => {
        const { request } = testEnvironment.environment.mock.getMostRecentOperation()
        return { name: request.node.operation.name, variables: request.variables }
      },
    }

    return testEnvironment.environment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

/** No unread notifications — drives the empty-state test. */
export const EmptyState = () => {
  const environment = useSeededEnvironment(unreadNotificationsEmptyMockData)

  return <NotificationsPopoverForTesting environment={environment} />
}

/** Two unread notifications, twelve in the list. */
export const WithNotifications = () => {
  const environment = useSeededEnvironment(unreadNotificationsMockData)

  return <NotificationsPopoverForTesting environment={environment} />
}

/** The list component is replaced wholesale. */
export const CustomList = () => {
  const environment = useSeededEnvironment(unreadNotificationsMockData)

  return (
    <NotificationsPopoverForTesting
      environment={environment}
      NotificationsList={CustomNotificationListForTesting}
    />
  )
}

/** Only the per-item component is replaced. */
export const CustomItem = () => {
  const environment = useSeededEnvironment(unreadNotificationsMockData)

  return (
    <NotificationsPopoverForTesting
      environment={environment}
      NotificationsListProps={{ NotificationItem: CustomNotificationItemForTesting }}
    />
  )
}

/** Both the list and the item are replaced. */
export const CustomListAndItem = () => {
  const environment = useSeededEnvironment(unreadNotificationsMockData)

  return (
    <NotificationsPopoverForTesting
      environment={environment}
      NotificationsList={CustomNotificationListForTesting}
      NotificationsListProps={{ NotificationItem: CustomNotificationItemForTesting }}
    />
  )
}

/** The list is filtered by a notification setting group. */
export const WithGroup = () => {
  const environment = useSeededEnvironment(unreadNotificationsMockData)

  return (
    <NotificationsPopoverForTesting
      environment={environment}
      NotificationsListProps={{ group: 'COMMENTS' }}
    />
  )
}
