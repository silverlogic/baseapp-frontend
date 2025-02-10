'use client'

import { FC, useMemo } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system'
import { setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'

import { useAllProfilesList } from '../../../profiles/graphql/queries/AllProfilesList'
import DefaultGroupChatMembersList from '../../__shared__/GroupChatMembersList'
import {
  DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALUE as DEFAULT_FORM_VALUES,
  CREATE_OR_EDIT_GROUP_FORM_VALUE as FORM_VALUE,
} from '../../__shared__/constants'
import { CreateOrEditGroup, ProfileNode } from '../../__shared__/types'
import { useUpdateChatRoomMutation } from '../../graphql/mutations/UpdateChatRoom'
import AddMemberCard from '../AddMemberCard'
import AddedMemberCard from '../AddedMemberCard'
import './VirtuosoStyles.css'
import { DEFAULT_FORM_VALIDATION } from './constants'
import { SearchbarContainer } from './styled'
import { AddMembersDialogProps } from './types'

const AddMembersDialog: FC<AddMembersDialogProps> = ({
  allProfilesRef,
  onClose,
  handleSubmitSuccess,
  open,
  profileId,
  roomId,
  isPending,
  GroupChatMembersList = DefaultGroupChatMembersList,
  GroupChatMembersListProps = {},
  existingMembers,
}) => {
  const { sendToast } = useNotification()

  const {
    data: { allProfiles },
    loadNext,
    isLoadingNext,
    hasNext,
    refetch: refetchProfiles,
  } = useAllProfilesList(allProfilesRef)

  const formReturn = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
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

  const handleClose = () => {
    onClose()
    reset()
  }

  const emptyParticipantsList = participants.length === 0

  return (
    <ConfirmDialog
      title="Add Members"
      customMaxWidth={480}
      DialogContentProps={{
        sx: {
          padding: 0,
          typography: 'body1',
          color: 'text.primary',
        },
      }}
      content={
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
                height: '100vh',
                maxHeight: '500px',
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
              },
            },
            ...(GroupChatMembersListProps?.MembersListProps ?? {}),
          }}
          ProfileCard={AddedMemberCard}
          {...GroupChatMembersListProps}
        />
      }
      action={
        <LoadingButton
          onClick={() => onSubmit()}
          disabled={isMutationInFlight || isEditButtonDisabled}
          loading={isMutationInFlight || isPending}
        >
          Confirm
        </LoadingButton>
      }
      onClose={handleClose}
      open={open}
    />
  )
}

export default AddMembersDialog
