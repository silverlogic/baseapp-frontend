import { graphql } from 'react-relay'

export const CommentItemFragmentQuery = graphql`
  fragment CommentItem_comment on Comment
  @refetchable(queryName: "CommentItemRefetchQuery")
  @argumentDefinitions(isRepliesExpanded: { type: "Boolean", defaultValue: false }) {
    id
    body
    isPinned

    user {
      id
      fullName
      avatar(width: 50, height: 50) {
        url
      }
    }

    created
    commentsCount {
      total
    }

    canChange: hasPerm(perm: "change")
    canDelete: hasPerm(perm: "delete")
    canReport: hasPerm(perm: "report")
    canPin: hasPerm(perm: "pin")

    ...CommentsList_comments @include(if: $isRepliesExpanded)

    ...ReactionButton_target

    ...CommentItem_target
  }
`

export const CommentItemTargetFragmentQuery = graphql`
  fragment CommentItem_target on CommentsInterface {
    id
  }
`
