import { graphql, useLazyLoadQuery } from 'react-relay'

import BlockButtonWithDialog from '../..'
import { BlockButtonWithDialogWithQuery as Query } from '../../../../../../__generated__/BlockButtonWithDialogWithQuery.graphql'
import { BlockToggleFragment$key } from '../../../../../../__generated__/BlockToggleFragment.graphql'

const BlockButtonWithDialogWithQuery = () => {
  const data = useLazyLoadQuery<Query>(
    graphql`
      query BlockButtonWithDialogWithQuery @relay_test_operation {
        target: node(id: "test-id") {
          ...BlockToggleFragment
        }
      }
    `,
    {},
  )

  return (
    <BlockButtonWithDialog
      target={data.target as BlockToggleFragment$key}
      currentProfileId="current-user-id"
    />
  )
}

export default BlockButtonWithDialogWithQuery
