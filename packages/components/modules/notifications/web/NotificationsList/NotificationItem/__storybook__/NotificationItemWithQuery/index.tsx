import { graphql, useLazyLoadQuery } from 'react-relay'

import NotificationItem from '../..'
import { NotificationItemFragment$key } from '../../../../../../../__generated__/NotificationItemFragment.graphql'
import { NotificationItemWithQuery as Query } from '../../../../../../../__generated__/NotificationItemWithQuery.graphql'
import { NotificationItemProps } from '../../types'

const NotificationItemWithQuery = (props: NotificationItemProps) => {
  const data = useLazyLoadQuery<Query>(
    graphql`
      query NotificationItemWithQuery @relay_test_operation {
        target: node(id: "test-id") {
          ...NotificationItemFragment
        }
      }
    `,
    {},
  )

  return <NotificationItem {...props} notification={data.target as NotificationItemFragment$key} />
}

export default NotificationItemWithQuery
