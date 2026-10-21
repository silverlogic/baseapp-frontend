import { useMemo } from 'react'

import { createTestEnvironment } from '@baseapp-frontend/graphql'

import NotificationSettingsGroupsForTesting from '../NotificationSettingsGroupsForTesting'
import {
  emptyNotificationSettingGroupsMockData,
  notificationSettingGroupsMockData,
  notificationSettingsUpdateMockData,
  notificationSettingsUpdateRejectedMockData,
} from '../__mocks__/requests'

/**
 * Stories for the Playwright component-testing gallery. The settings query resolves as soon as it
 * runs; each mutation stays pending until the spec resolves or rejects it through
 * `window.__notificationSettingsControls`, so the optimistic state can be asserted in between.
 */
export interface NotificationSettingsControls {
  resolveUpdate: () => void
  resolveUpdateWithErrors: () => void
  rejectUpdate: () => void
  lastUpdateVariables: () => unknown
}

declare global {
  interface Window {
    __notificationSettingsControls: NotificationSettingsControls
  }
}

const useSeededEnvironment = (data: unknown) =>
  useMemo(() => {
    const testEnvironment = createTestEnvironment()

    testEnvironment.queueOperationResolver({ queryName: 'NotificationSettingsGroupsQuery', data })

    const { environment, resolveMostRecentOperation, rejectMostRecentOperation } = testEnvironment

    window.__notificationSettingsControls = {
      resolveUpdate: () => resolveMostRecentOperation({ data: notificationSettingsUpdateMockData }),
      resolveUpdateWithErrors: () =>
        resolveMostRecentOperation({ data: notificationSettingsUpdateRejectedMockData }),
      rejectUpdate: () => rejectMostRecentOperation('Network request failed'),
      lastUpdateVariables: () => environment.mock.getMostRecentOperation().request.variables,
    }

    return environment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

/** Three groups: one editable with two channels, one locked, one email-only. */
export const WithGroups = () => {
  const environment = useSeededEnvironment(notificationSettingGroupsMockData)

  return <NotificationSettingsGroupsForTesting environment={environment} />
}

/** The same groups, with every piece of copy replaced through props. */
export const WithCustomCopy = () => {
  const environment = useSeededEnvironment(notificationSettingGroupsMockData)

  return (
    <NotificationSettingsGroupsForTesting
      environment={environment}
      channelLabels={{ IN_APP: 'Portal', EMAIL: 'E-mail' }}
      groupColumnLabel="Topic"
      lockedHint="Always on"
      getSwitchLabel={(group: string, channel: string) => `${group} by ${channel}`}
    />
  )
}

/** The viewer has no groups. */
export const Empty = () => {
  const environment = useSeededEnvironment(emptyNotificationSettingGroupsMockData)

  return (
    <NotificationSettingsGroupsForTesting
      environment={environment}
      emptyStateText="Nothing to configure."
    />
  )
}
