'use client'

import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { CheckMarkIcon, CloseIcon, IconButton, LoadingState } from '@baseapp-frontend/design-system'
import { filterDirtyValues, setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { usePreloadedQuery } from 'react-relay'

import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../__generated__/GroupDetailsQuery.graphql'
import { EditGroupTitleAndImage } from '../__shared__'
import { useUpdateChatRoomMutation } from '../graphql/mutations/UpdateChatRoom'
import { GroupDetailsQuery } from '../graphql/queries/GroupDetailsQuery'
import { DEFAULT_FORM_VALIDATION, FORM_VALUE, getDefaultFormValues } from './constants'
import { HeaderContainer } from './styled'
import { EditGroupProps } from './types'

const EditGroup: FC<EditGroupProps> = ({ queryRef, roomId, onValidSubmission, onCancellation }) => {
  const { sendToast } = useNotification()
  const { chatRoom: group } = usePreloadedQuery<GroupDetailsQueryType>(GroupDetailsQuery, queryRef)

  const formReturn = useForm({
    defaultValues: getDefaultFormValues(group?.title ? group.title : '', group?.image?.url),
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

  const { currentProfile } = useCurrentProfile()

  const [commit, isMutationInFlight] = useUpdateChatRoomMutation()

  const onSubmit = handleSubmit((data: any) => {
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
          profileId: currentProfile?.id as string,
          ...dirtyValues,
        },
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
        {isMutationInFlight ? (
          <LoadingState CircularProgressProps={{ size: '24px' }} />
        ) : (
          <IconButton
            aria-label="Edit group"
            disabled={isEditButtonDisabled}
            onClick={() => {
              onSubmit()
            }}
          >
            <CheckMarkIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        )}
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

export default EditGroup
