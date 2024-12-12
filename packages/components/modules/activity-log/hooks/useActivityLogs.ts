import { graphql, useFragment } from 'react-relay'

import { ActivityLogsFragment$key } from '../../../__generated__/ActivityLogsFragment.graphql'

export const useActivityLogs = (activityLogRef: ActivityLogsFragment$key) => {
  const data = useFragment<ActivityLogsFragment$key>(
    graphql`
      fragment ActivityLogsFragment on Query @refetchable(queryName: "ActivityLogGroupsQuery") {
        activityLogGroups(intervalMinutes: 15) {
          logs {
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
      }
    `,
    activityLogRef,
  )

  return data.activityLogGroups
}
