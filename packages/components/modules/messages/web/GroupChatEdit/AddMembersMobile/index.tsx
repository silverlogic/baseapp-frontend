'use client'

import { FC, useMemo } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { CheckMarkIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { Iconify } from '@baseapp-frontend/design-system/components/web/images'
import { setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import { useAllProfilesList } from '../../../../profiles/common'
import { useUpdateChatRoomMutation } from '../../../common'
import DefaultGroupChatMembersList from '../../__shared__/GroupChatMembersList'
import {
  DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALUE as DEFAULT_FORM_VALUES,
  CREATE_OR_EDIT_GROUP_FORM_VALUE as FORM_VALUE,
} from '../../__shared__/constants'
import { CreateOrEditGroup, ProfileNode } from '../../__shared__/types'
import AddMemberCard from '../AddMemberCard'
import AddedMemberCard from '../AddedMemberCard'
import { Container as HeaderContainer } from '../Header/styled'
import { DEFAULT_FORM_VALIDATION } from './constants'
import { SearchbarContainer } from './styled'
import { AddMembersMobileProps } from './types'

const AddMembersMobile: FC<AddMembersMobileProps> = ({
  allProfilesRef,
  onClose,
  handleSubmitSuccess,
  profileId,
  roomId,
  isPending,
  GroupChatMembersList = DefaultGroupChatMembersList,
  GroupChatMembersListProps = {},
  existingMembers = [],
}) => {
  const { sendToast } = useNotification()

  const {
    data: { allProfiles },
    loadNext,
    isLoadingNext,
    hasNext,
    refetch: refetchProfiles,
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
    getFieldState,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = formReturn

  const [commit, isMutationInFlight] = useUpdateChatRoomMutation()

  // @ts-ignore TODO: fix typing issues
  const onSubmit = handleSubmit((data: CreateOrEditGroup) => {
    if (!roomId) return

    const { participants } = data
    const participantsIds = (participants || []).map((member: ProfileNode) => member?.id)

    commit({
      variables: {
        input: {
          roomId,
          profileId,
          addParticipants: participantsIds,
        },
        connections: [],
      },
      onCompleted: (response) => {
        const errors = response?.chatRoomUpdate?.errors
        if (errors) {
          sendToast('Something went wrong', { type: 'error' })
          // @ts-ignore TODO: fix typing issues
          setFormRelayErrors(formReturn, errors)
        } else {
          handleSubmitSuccess()
          reset()
        }
      },
    })
  })

  const participants = watch(FORM_VALUE.participants) as ProfileNode[]

  const profiles = useMemo(
    () =>
      allProfiles?.edges
        .filter((edge) => edge?.node && edge?.node.id !== profileId)
        .map((edge) => edge?.node) || [],
    [allProfiles, profileId],
  )

  const isEditButtonDisabled = !isDirty || getFieldState(FORM_VALUE.participants).invalid

  const handleAddMember = (profile: ProfileNode) => {
    setValue(FORM_VALUE.participants, [...participants, profile], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const handleRemoveMember = (profile: ProfileNode) => {
    setValue(
      FORM_VALUE.participants,
      participants.filter((member: ProfileNode) => member?.id !== profile?.id),
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      },
    )
  }

  const emptyParticipantsList = participants.length === 0

  return (
    <Box>
      <HeaderContainer>
        <IconButton onClick={onClose} aria-label="cancel adding member">
          <Iconify icon="eva:arrow-ios-back-fill" width={24} />
        </IconButton>
        <Typography component="span" variant="subtitle2" sx={{ textAlign: 'center' }}>
          Add Member
        </Typography>
        <IconButton
          aria-label="Add Member"
          disabled={isEditButtonDisabled || isPending}
          isLoading={isMutationInFlight || isPending}
          onClick={() => {
            onSubmit()
          }}
        >
          <CheckMarkIcon sx={{ fontSize: '24px' }} />
        </IconButton>
      </HeaderContainer>
      <GroupChatMembersList
        FORM_VALUE={FORM_VALUE}
        setValue={setValue}
        watch={watch}
        currentParticipants={participants}
        connections={profiles}
        refetch={refetchProfiles}
        SearchbarContainer={SearchbarContainer}
        connectionsLoadNext={loadNext}
        connectionsHasNext={hasNext}
        connectionsIsLoadingNext={isLoadingNext}
        ConnectionsListProps={{
          VirtuosoProps: {
            style: {
              height: '100%',
              maxHeight: emptyParticipantsList
                ? 'calc(100vh - 72px - 57px - 69px)'
                : 'calc(100vh - 72px - 57px - 69px - 130px)',
            },
          },
          title: '',
          removeTitle: emptyParticipantsList,
          renderItem: (profile) => {
            if (!profile) return null
            return (
              <AddMemberCard
                profile={profile}
                handleAddMember={handleAddMember}
                handleRemoveMember={handleRemoveMember}
                isBeingAdded={participants.some((member) => member?.id === profile?.id)}
                isExistingMember={existingMembers.some((member) => member?.id === profile?.id)}
              />
            )
          },
          ...(GroupChatMembersListProps?.ConnectionsListProps ?? {}),
        }}
        MembersListProps={{
          removeTitle: emptyParticipantsList,
          title: '',
          NormalListProps: {
            sx: {
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              padding: emptyParticipantsList ? 0 : '12px',
              scrollbarWidth: 'none',
            },
          },
          ...(GroupChatMembersListProps?.MembersListProps ?? {}),
        }}
        ProfileCard={AddedMemberCard}
        {...GroupChatMembersListProps}
      />
    </Box>
  )
}

export default AddMembersMobile
