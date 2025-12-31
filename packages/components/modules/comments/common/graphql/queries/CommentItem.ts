import { graphql } from 'react-relay'

export const CommentItemFragmentQuery = graphql`
  fragment CommentItem_comment on Comment
  @refetchable(queryName: "CommentItemRefetchQuery")
  @argumentDefinitions(isRepliesExpanded: { type: "Boolean", defaultValue: false }) {
    id
    pk
    body
    isPinned

    profile {
      id
      pk
      name
      image(width: 50, height: 50) {
        url
      }
      urlPath {
        path
      }
    }
    user {
      id
      pk
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

    ...FilesList_target
  }
`

export const CommentItemTargetFragmentQuery = graphql`
  fragment CommentItem_target on CommentsInterface {
    id
  }
`
