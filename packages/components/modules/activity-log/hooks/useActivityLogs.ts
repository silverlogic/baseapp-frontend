import { useMemo } from 'react'

import { graphql, usePaginationFragment } from 'react-relay'

import { ActivityLogsFragment$key } from '../../../__generated__/ActivityLogsFragment.graphql'
import { Log, LogGroup } from '../LogGroups/types'

export const useActivityLogs = (activityLogRef: ActivityLogsFragment$key) => {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment ActivityLogsFragment on Query
      @refetchable(queryName: "ActivityLogsPaginationQuery")
      @argumentDefinitions(count: { type: "Int", defaultValue: 10 }, cursor: { type: "String" }) {
        activityLogs(first: $count, after: $cursor) @connection(key: "ActivityLogs_activityLogs") {
          edges {
            node {
              id
              createdAt
              verb
              url
              user {
                id
                fullName
                email
                avatar(width: 48, height: 48) {
                  url
                }
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `,
    activityLogRef,
  )

  const logGroups = useMemo(() => {
    const groupedLogs: { [key: string]: LogGroup[] } = {}

    data?.activityLogs?.edges?.forEach((edge) => {
      const log = edge?.node as Log
      const userId = log?.user?.id as string
      const timestamp = new Date(log.createdAt).getTime()

      if (!groupedLogs[userId]) {
        groupedLogs[userId] = []
      }

      const lastGroup = groupedLogs[userId][groupedLogs[userId].length - 1]

      if (
        !lastGroup ||
        timestamp - new Date(lastGroup.lastActivityTimestamp).getTime() > 15 * 60 * 1000
      ) {
        groupedLogs[userId].push({
          lastActivityTimestamp: log.createdAt,
          logs: [log],
        })
      } else {
        lastGroup.logs.push(log)
        lastGroup.lastActivityTimestamp = log.createdAt
      }
    })

    const result: LogGroup[] = Object.values(groupedLogs).flat()
    result.sort(
      (a, b) =>
        new Date(b.lastActivityTimestamp).getTime() - new Date(a.lastActivityTimestamp).getTime(),
    )

    return result
  }, [data])

  return { logGroups, loadNext, hasNext, isLoadingNext }
}
