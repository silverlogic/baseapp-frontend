'use client'

import { FC, useMemo } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { filterDirtyValues, setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ConnectionHandler } from 'relay-runtime'

import { ProfileNode, useAllProfilesList } from '../../../profiles/common'
import { useChatRoom, useCreateChatRoomMutation } from '../../common'
import {
  DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALIDATION as DEFAULT_FORM_VALIDATION,
  DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALUE as DEFAULT_FORM_VALUES,
  CREATE_OR_EDIT_GROUP_FORM_VALUE as FORM_VALUE,
} from '../../common/constants'
import { CreateOrEditGroup } from '../../common/types'
import DefaultEditGroupTitleAndImage from '../__shared__/EditGroupTitleAndImage'
import DefaultGroupChatMembersList from '../__shared__/GroupChatMembersList'
import DefaultHeader from './Header'
import { ProfilesContainer } from './styled'
import { GroupChatCreateProps } from './types'

const GroupChatCreate: FC<GroupChatCreateProps> = ({
  allProfilesRef,
  EditGroupTitleAndImage = DefaultEditGroupTitleAndImage,
  EditGroupTitleAndImageProps = {},
  GroupChatMembersList = DefaultGroupChatMembersList,
  GroupChatMembersListProps = {},
  Header = DefaultHeader,
  HeaderProps = {},
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

  const formReturn = useForm<CreateOrEditGroup>({
    defaultValues: DEFAULT_FORM_VALUES,
    // @ts-ignore TODO: check typing issue with zodResolver
    resolver: zodResolver(DEFAULT_FORM_VALIDATION),
    mode: 'onBlur',
  })

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { isValid, isDirty, dirtyFields },
  } = formReturn

  const { currentProfile } = useCurrentProfile()

  const [commit, isMutationInFlight] = useCreateChatRoomMutation()
  const { setChatRoom } = useChatRoom()

  // @ts-ignore TODO: check typing issue with zodResolver
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
          // @ts-ignore TODO: check typing issue with zodResolver
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

  const isCreateButtonDisabled = !isValid || !isDirty || isMutationInFlight

  return (
    <Box>
      <Header
        isDisabled={isCreateButtonDisabled}
        onCreateButtonClicked={onSubmit}
        onBackButtonClicked={onBackButtonClicked}
        {...HeaderProps}
      />
      <EditGroupTitleAndImage
        // @ts-ignore TODO: check typing issue with zodResolver
        form={formReturn}
        FORM_VALUE={FORM_VALUE}
        isMutationInFlight={isMutationInFlight}
        {...EditGroupTitleAndImageProps}
      />

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
    </Box>
  )
}

export default GroupChatCreate
