import { FC } from 'react'

import { Iconify } from '@baseapp-frontend/design-system/components/web/images'
import { useNotification } from '@baseapp-frontend/utils'

import { Button } from '@mui/material'
import { useMutation, useRelayEnvironment } from 'react-relay'
import { RecordSourceSelectorProxy, commitLocalUpdate } from 'relay-runtime'

import { FollowToggleMutation } from '../../../../../__generated__/FollowToggleMutation.graphql'
import { FollowToggleMutationQuery, FollowToggleUpdatableFragment } from '../../../common'
import { FollowToggleButtonProps } from './types'

const FollowToggleButton: FC<FollowToggleButtonProps> = ({
  targetId,
  isFollowedByMe,
  currentProfileId,
  profileRef,
}) => {
  const [commitMutation, isMutationInFlight] =
    useMutation<FollowToggleMutation>(FollowToggleMutationQuery)
  const { sendToast } = useNotification()
  const environment = useRelayEnvironment()

  const toggleFollow = () => {
    if (isMutationInFlight || !currentProfileId || !targetId) {
      return
    }

    commitMutation({
      variables: {
        input: {
          targetObjectId: targetId,
          actorObjectId: currentProfileId,
        },
      },
      onCompleted: (response, errors) => {
        errors?.forEach((error) => {
          sendToast(error.message, { type: 'error' })
        })
        if (errors) {
          return
        }
        const follow = response.followToggle?.follow

        commitLocalUpdate(environment, (store: RecordSourceSelectorProxy) => {
          if (profileRef == null) {
            return
          }

          const { updatableData } = store.readUpdatableFragment(
            FollowToggleUpdatableFragment,
            profileRef,
          )

          const updatedIsFollowedByMe = follow?.node?.target?.isFollowedByMe ?? false
          const updatedFollowersCount =
            follow?.node?.target?.followersCount ?? updatableData.followersCount - 1

          updatableData.isFollowedByMe = updatedIsFollowedByMe
          updatableData.followersCount = updatedFollowersCount
        })
      },
    })
  }

  return (
    <Button
      onClick={toggleFollow}
      startIcon={
        isFollowedByMe ? <Iconify icon="ci:check-all" /> : <Iconify icon="mingcute:add-line" />
      }
      variant={isFollowedByMe ? 'soft' : 'contained'}
      color={isFollowedByMe ? 'inherit' : 'primary'}
      disabled={isMutationInFlight}
      size="medium"
    >
      {isFollowedByMe ? 'Following' : 'Follow'}
    </Button>
  )
}

export default FollowToggleButton
