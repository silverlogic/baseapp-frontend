'use client'

import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { CheckMarkIcon, CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { filterDirtyValues, setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { usePreloadedQuery } from 'react-relay'

import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../../__generated__/GroupDetailsQuery.graphql'
import {
  GroupDetailsQuery,
  useGroupNameAndAvatar,
  useRoomListSubscription,
  useUpdateChatRoomMutation,
} from '../../common'
import EditGroupTitleAndImage from '../__shared__/EditGroupTitleAndImage'
import { DEFAULT_FORM_VALIDATION, FORM_VALUE, getDefaultFormValues } from './constants'
import { HeaderContainer } from './styled'
import { EditGroupProps } from './types'

const EditGroup: FC<EditGroupProps & { profileId: string }> = ({
  profileId,
  queryRef,
  roomId,
  onCancellation,
  onRemovalFromGroup,
  onValidSubmission,
}) => {
  const { sendToast } = useNotification()
  const { chatRoom: group } = usePreloadedQuery<GroupDetailsQueryType>(GroupDetailsQuery, queryRef)
  const { avatar, title } = useGroupNameAndAvatar(group)
  useRoomListSubscription({ profileId, connections: [], onRemoval: onRemovalFromGroup })

  const formReturn = useForm({
    defaultValues: getDefaultFormValues(title || '', avatar),
    resolver: zodResolver(DEFAULT_FORM_VALIDATION),
    mode: 'onBlur',
  })

  const {
    control,
    setValue,
    watch,
    getFieldState,
    clearErrors,
    trigger,
    handleSubmit,
    formState: { isValid, isDirty, dirtyFields },
  } = formReturn

  const [commit, isMutationInFlight] = useUpdateChatRoomMutation()

  const onSubmit = handleSubmit((data: any) => {
    if (!roomId) return

    const dirtyValues = filterDirtyValues({ values: data, dirtyFields })
    const { image } = data
    const uploadables: { image?: File | Blob } = {}
    if ('image' in dirtyValues) {
      if (image) {
        uploadables.image = image
      } else {
        dirtyValues.deleteImage = true
      }
      delete dirtyValues.image
    }

    commit({
      variables: {
        input: {
          roomId,
          profileId,
          ...dirtyValues,
        },
        connections: [],
      },
      uploadables,
      onCompleted: (response) => {
        const errors = response?.chatRoomUpdate?.errors
        if (errors) {
          sendToast('Something went wrong', { type: 'error' })
          setFormRelayErrors(formReturn, errors)
        } else {
          onValidSubmission()
        }
      },
    })
  })

  const handleRemoveImage = () => {
    clearErrors(FORM_VALUE.image)
    setValue(FORM_VALUE.image, null, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const isEditButtonDisabled = !isValid || !isDirty

  return (
    <Box>
      <HeaderContainer>
        <IconButton onClick={onCancellation} aria-label="cancel editing group">
          <CloseIcon sx={{ fontSize: '24px' }} />
        </IconButton>
        <Typography component="span" variant="subtitle2" sx={{ textAlign: 'center' }}>
          Edit Group
        </Typography>
        <IconButton
          aria-label="Edit group"
          disabled={isEditButtonDisabled}
          isLoading={isMutationInFlight}
          onClick={() => {
            onSubmit()
          }}
        >
          <CheckMarkIcon sx={{ fontSize: '24px' }} />
        </IconButton>
      </HeaderContainer>
      <EditGroupTitleAndImage
        control={control}
        FORM_VALUE={FORM_VALUE}
        handleRemoveImage={handleRemoveImage}
        imageError={getFieldState(FORM_VALUE.image).error}
        isMutationInFlight={isMutationInFlight}
        setValue={setValue}
        trigger={trigger}
        watch={watch}
      />
    </Box>
  )
}

const WrappedEditGroup: FC<EditGroupProps> = (props) => {
  const { currentProfile } = useCurrentProfile()
  if (!currentProfile?.id) {
    return null
  }
  return <EditGroup profileId={currentProfile.id} {...props} />
}

export default WrappedEditGroup
