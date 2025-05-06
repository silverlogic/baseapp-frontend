import { graphql, useLazyLoadQuery } from 'react-relay'

import ActivityLog from '..'
import { ActivityLogsPaginationQuery } from '../../../../../__generated__/ActivityLogsPaginationQuery.graphql'
import { ActivityLogComponentProps } from '../types'

const ActivityLogWithQuery = (props: ActivityLogComponentProps) => {
  const query = graphql`
    query ActivityLogWithQuery @relay_test_operation {
      ...ActivityLogsFragment
    }
  `
  const data = useLazyLoadQuery<ActivityLogsPaginationQuery>(query, {})

  return <ActivityLog {...props} queryRef={data} />
}

export default ActivityLogWithQuery
