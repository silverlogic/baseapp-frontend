import React from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import {
  FavoriteIcon,
  FavoriteSelectedIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { Typography } from '@mui/material'
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay'

import ReactionButton from '../..'
import {
  CommentItem_comment$data,
  CommentItem_comment$key,
} from '../../../../../../__generated__/CommentItem_comment.graphql'
import { ReactionButtonWithQuery as Query } from '../../../../../../__generated__/ReactionButtonWithQuery.graphql'
// TODO: review this import
import { CommentItemFragmentQuery } from '../../../../../comments/common'
import { ReactionButtonProps } from '../../types'

const ReactionButtonWithQuery = (props: ReactionButtonProps) => {
  const data = useLazyLoadQuery<Query>(
    graphql`
      query ReactionButtonWithQuery @relay_test_operation {
        target: node(id: "test-id") {
          ...CommentItem_comment
        }
      }
    `,
    {},
  )
  const comment = useFragment<CommentItem_comment$key>(CommentItemFragmentQuery, data.target)

  return (
    <ReactionButton {...props} target={comment as CommentItem_comment$data}>
      {({ handleReaction, isLoading, target }) => (
        <div className="grid grid-cols-[repeat(2,minmax(20px,max-content))] gap-1">
          <IconButton onClick={handleReaction} isLoading={isLoading}>
            {target?.myReaction?.id ? (
              <FavoriteSelectedIcon sx={{ color: 'error.main' }} />
            ) : (
              <FavoriteIcon />
            )}
          </IconButton>
          <Typography variant="caption" color="text.secondary">
            {target?.reactionsCount?.total}
          </Typography>
        </div>
      )}
    </ReactionButton>
  )
}

export default ReactionButtonWithQuery
