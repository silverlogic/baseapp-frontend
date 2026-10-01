import { useMemo } from 'react'

import { graphql, usePaginationFragment } from 'react-relay'

import { ActivityLogsFragment$key } from '../../../../../__generated__/ActivityLogsFragment.graphql'
import { ActivityLogsPaginationQuery } from '../../../../../__generated__/ActivityLogsPaginationQuery.graphql'
import { LogGroup } from '../../types'

export const ActivityLogsFragmentQuery = graphql`
  fragment ActivityLogsFragment on Query
  @refetchable(queryName: "ActivityLogsPaginationQuery")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 }
    cursor: { type: "String" }
    userName: { type: "String", defaultValue: null }
    createdFrom: { type: "Date", defaultValue: null }
    createdTo: { type: "Date", defaultValue: null }
  ) {
    activityLogs(
      first: $count
      after: $cursor
      userName: $userName
      createdFrom: $createdFrom
      createdTo: $createdTo
    )
      @connection(
        key: "ActivityLogs_activityLogs"
        filters: ["userName", "createdFrom", "createdTo"]
      ) {
      edges {
        node {
          id
          createdAt
          events {
            edges {
              node {
                label
                diff
              }
            }
          }
          verb
          url
          user {
            id
            fullName
            email
            avatar(width: 48, height: 48)
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
