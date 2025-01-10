import { useMemo } from 'react'

import { graphql, usePaginationFragment } from 'react-relay'

import { ActivityLogsFragment$key } from '../../../../__generated__/ActivityLogsFragment.graphql'
import { ActivityLogsPaginationQuery } from '../../../../__generated__/ActivityLogsPaginationQuery.graphql'
import { LogGroup } from '../../ActivityLogComponent/LogGroups/types'

export const ActivityLogsFragmentQuery = graphql`
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
`

export const useActivityLogs = (targetRef: ActivityLogsFragment$key) => {
  const { data, loadNext, isLoadingNext, hasNext, refetch } = usePaginationFragment<
    ActivityLogsPaginationQuery,
    ActivityLogsFragment$key
  >(ActivityLogsFragmentQuery, targetRef)

  const logGroups = useMemo(() => {
    const groupedLogs: { [key: string]: LogGroup[] } = {}

    data?.activityLogs?.edges?.forEach((edge) => {
      const log = edge?.node
      if (!log) return
      const userId = log.user?.id as string
      const timestamp = new Date(log.createdAt).getTime()

      if (!groupedLogs[userId]) {
        groupedLogs[userId] = []
      }

      const userLogGroups = groupedLogs[userId]
      if (!userLogGroups) return

      const lastGroup = userLogGroups[userLogGroups.length - 1]

      if (
        !lastGroup ||
        timestamp - new Date(lastGroup.lastActivityTimestamp).getTime() > 15 * 60 * 1000
      ) {
        userLogGroups.push({
          lastActivityTimestamp: log.createdAt,
          logs: [log],
        })
      } else {
        lastGroup.logs.unshift(log)
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

  return { logGroups, loadNext, isLoadingNext, hasNext, refetch }
}
