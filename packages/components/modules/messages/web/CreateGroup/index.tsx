'use client'

import { FC, useMemo } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { CheckMarkIcon, CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { filterDirtyValues, setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ConnectionHandler } from 'relay-runtime'

import { ProfileNode, useAllProfilesList } from '../../../profiles/common'
import { useChatRoom, useCreateChatRoomMutation } from '../../common'
import EditGroupTitleAndImage from '../__shared__/EditGroupTitleAndImage'
import DefaultGroupChatMembersList from '../__shared__/GroupChatMembersList'
import {
  DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALIDATION as DEFAULT_FORM_VALIDATION,
  DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALUE as DEFAULT_FORM_VALUES,
  CREATE_OR_EDIT_GROUP_FORM_VALUE as FORM_VALUE,
} from '../__shared__/constants'
import { CreateOrEditGroup } from '../__shared__/types'
import { HeaderContainer, ProfilesContainer } from './styled'
import { CreateGroupProps } from './types'

const CreateGroup: FC<CreateGroupProps> = ({
  allProfilesRef,
  GroupChatMembersList = DefaultGroupChatMembersList,
  GroupChatMembersListProps = {},
  onValidSubmission,
  onBackButtonClicked,
}) => {
  const { sendToast } = useNotification()
  const {
    data: { allProfiles },
    loadNext,
    isLoadingNext,
    hasNext,
    refetch,
  } = useAllProfilesList(allProfilesRef)

  const formReturn = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(DEFAULT_FORM_VALIDATION),
    mode: 'onBlur',
  })

  const {
    control,
    setValue,
    watch,
    getFieldState,
    clearErrors,
    handleSubmit,
    formState: { isValid, isDirty, dirtyFields },
    trigger,
  } = formReturn

  const { currentProfile } = useCurrentProfile()

  const [commit, isMutationInFlight] = useCreateChatRoomMutation()
  const { setChatRoom } = useChatRoom()

  const onSubmit = handleSubmit((data: CreateOrEditGroup) => {
    const dirtyValues = filterDirtyValues({ values: data, dirtyFields })
    const { title, participants, image } = data
    const participantsIds = (participants || []).map((member: ProfileNode) => member?.id)
    const uploadables: { image?: File | Blob } = {}
    if (FORM_VALUE.image in dirtyValues && image && typeof image !== 'string') {
      uploadables.image = image
    }
    commit({
      variables: {
        input: {
          title,
          isGroup: true,
          profileId: currentProfile?.id as string,
          participants: participantsIds,
        },
        connections: [
          // TODO: add filter handling (for now we can default 'unreadMessages' to false)
          ConnectionHandler.getConnectionID(currentProfile?.id as string, 'roomsList_chatRooms', {
            unreadMessages: false,
            archived: false,
            q: '',
          }),
        ],
      },
      uploadables,
      onCompleted: (response) => {
        const errors = response?.chatRoomCreate?.errors
        if (errors) {
          sendToast('Something went wrong', { type: 'error' })
          setFormRelayErrors(formReturn, errors)
        } else {
          setChatRoom({ id: response?.chatRoomCreate?.room?.node?.id })
          onValidSubmission()
        }
      },
    })
  })

  const participants = watch(FORM_VALUE.participants) as ProfileNode[]

  const profiles = useMemo(
    () =>
      allProfiles?.edges
        .filter(
          (edge) =>
            edge?.node &&
            edge?.node.id !== currentProfile?.id &&
            !participants.some((member: ProfileNode) => member?.id === edge?.node?.id),
        )
        .map((edge) => edge?.node) || [],
    [allProfiles, participants, currentProfile?.id],
  )

  const handleRemoveImage = () => {
    clearErrors(FORM_VALUE.image)
    setValue(FORM_VALUE.image, null, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const isCreateButtonDisabled = !isValid || !isDirty || isMutationInFlight

  return (
    <>
      <Box>
        <HeaderContainer>
          <IconButton onClick={onBackButtonClicked} aria-label="cancel group creation">
            <CloseIcon sx={{ fontSize: '24px' }} />
          </IconButton>
          <Typography component="span" variant="subtitle2" sx={{ textAlign: 'center' }}>
            New Group
          </Typography>
          <IconButton
            aria-label="Create group"
            disabled={isCreateButtonDisabled}
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
      <GroupChatMembersList
        FORM_VALUE={FORM_VALUE}
        setValue={setValue}
        watch={watch}
        currentParticipants={participants}
        connections={profiles}
        refetch={refetch}
        connectionsLoadNext={loadNext}
        connectionsHasNext={hasNext}
        connectionsIsLoadingNext={isLoadingNext}
        ProfilesContainer={ProfilesContainer}
        {...GroupChatMembersListProps}
      />
    </>
  )
}

export default CreateGroup
