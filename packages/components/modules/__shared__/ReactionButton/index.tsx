import { FC } from 'react'

import { graphql, useFragment, useMutation } from 'react-relay'

import { ReactionButtonMutation } from '../../../__generated__/ReactionButtonMutation.graphql'
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
  mutation ReactionButtonMutation($input: ReactionToggleInput!) {
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

  const handleReaction = () => {
    if (isMutationInFlight) {
      return
    }

    commitMutation({
      variables: {
        input: {
          targetObjectId: target.id,
          reactionType,
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
