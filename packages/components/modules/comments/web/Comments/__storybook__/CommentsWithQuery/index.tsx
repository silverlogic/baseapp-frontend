import { graphql, useLazyLoadQuery } from 'react-relay'

import Comments from '../..'
import type { CommentsFragment$key } from '../../../../../../__generated__/CommentsFragment.graphql'
import type { CommentsWithQuery as Query } from '../../../../../../__generated__/CommentsWithQuery.graphql'
import type { CommentsProps } from '../../types'

const CommentsWithQuery = (props: CommentsProps) => {
  const data = useLazyLoadQuery<Query>(
    graphql`
      query CommentsWithQuery @relay_test_operation {
        target: node(id: "test-id") {
          ...CommentsFragment
        }
      }
    `,
    {},
  )

  return <Comments {...props} target={data.target as CommentsFragment$key} />
}

export default CommentsWithQuery
