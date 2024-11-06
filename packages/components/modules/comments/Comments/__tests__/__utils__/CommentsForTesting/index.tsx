import { graphql, useLazyLoadQuery } from 'react-relay'

import { CommentsForTestingQuery } from '../../../../../../__generated__/CommentsForTestingQuery.graphql'
import { CommentsFragment$key } from '../../../../../../__generated__/CommentsFragment.graphql'
import withProviders from '../../../../../../__test_utils__/withProviders'
import Comments from '../../../index'
import { CommentsProps } from '../../../types'

const CommentsForTesting = (props?: Partial<CommentsProps>) => {
  const data = useLazyLoadQuery<CommentsForTestingQuery>(
    graphql`
      query CommentsForTestingQuery @relay_test_operation {
        target: node(id: "test-id") {
          ...CommentsFragment
        }
      }
    `,
    {},
  )

  return (
    <Comments
      {...props}
      target={data.target as CommentsFragment$key}
      subscriptionsEnabled={false}
    />
  )
}

export default withProviders(CommentsForTesting)
