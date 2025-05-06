import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'

import { graphql, useFragment, useMutation } from 'react-relay'

import { ReactionButtonMutation } from '../../../../__generated__/ReactionButtonMutation.graphql'
import { ReactionButtonProps } from './types'

const fragmentQuery = graphql`
  fragment ReactionButton_target on ReactionsInterface {
    id
    reactionsCount {
      total
    }
    myReaction {
      id
      reactionType
    }
  }
`

const mutationQuery = graphql`
  mutation ReactionButtonMutation($input: ReactionToggleInput!) @raw_response_type {
    reactionToggle(input: $input) {
      reaction {
        node {
          id
          reactionType
        }
      }
      reactionDeletedId @deleteRecord
      target {
        id
        ...ReactionButton_target
      }
    }
  }
`

const ReactionButton: FC<ReactionButtonProps> = ({
  target: targetRef,
  reactionType,
  children,
  handleSuccess,
  handleError,
}) => {
  const target = useFragment(fragmentQuery, targetRef)
  const [commitMutation, isMutationInFlight] = useMutation<ReactionButtonMutation>(mutationQuery)
  const { currentProfile } = useCurrentProfile()
  const handleReaction = () => {
    if (isMutationInFlight) {
      return
    }

    const currentReactionsCount = target.reactionsCount?.total ?? 0

    commitMutation({
      variables: {
        input: {
          targetObjectId: target.id,
          reactionType,
          profileObjectId: currentProfile?.id,
        },
      },
      optimisticResponse: {
        reactionToggle: {
          reaction: {
            node: {
              id: `client:newReaction:${Date.now()}`,
              reactionType,
            },
          },
          reactionDeletedId: target.myReaction?.id,
          target: {
            id: target.id,
            __typename: 'Comment',
            __isReactionsInterface: 'Comment',
            myReaction: !target.myReaction?.id
              ? {
                  id: `client:myReaction:${Date.now()}`,
                  reactionType,
                }
              : null,
            reactionsCount: {
              total: target.myReaction?.id ? currentReactionsCount - 1 : currentReactionsCount + 1,
            },
          },
        },
      },
      onCompleted: () => {
        handleSuccess?.()
      },
      onError: () => {
        handleError?.()
      },
    })
  }

  return children({ handleReaction, isLoading: isMutationInFlight, target })
}

export default ReactionButton
