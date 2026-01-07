import { graphql } from 'react-relay'

export const CommentItemFragmentQuery = graphql`
  fragment CommentItem_comment on Comment
  @refetchable(queryName: "CommentItemRefetchQuery")
  @argumentDefinitions(isRepliesExpanded: { type: "Boolean", defaultValue: false }) {
    id
    body
    isPinned
    isEdited

    profile {
      id
      name
      image(width: 50, height: 50) {
        url
      }
      urlPath {
        path
      }
    }
    # Presence-only: web CommentItem shows a "Deleted User" state when the author
    # account is gone. Name and avatar are read from profile, not user.
    user {
      id
    }

    created
    commentsCount {
      total
    }

    canReply
    canChange: hasPerm(perm: "change")
    canDelete: hasPerm(perm: "delete")
    canReport: hasPerm(perm: "report")
    canPin: hasPerm(perm: "pin")

    mentions(first: 50) {
      edges {
        node {
          id
          profile {
            id
          }
        }
      }
    }

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
