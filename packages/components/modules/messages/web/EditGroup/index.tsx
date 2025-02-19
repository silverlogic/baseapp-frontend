'use client'

import { FC, useMemo, useState, useTransition } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { CheckMarkIcon, CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'
import { filterDirtyValues, setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { usePaginationFragment, usePreloadedQuery } from 'react-relay'

import { ChatRoomParticipantsPaginationQuery } from '../../../../__generated__/ChatRoomParticipantsPaginationQuery.graphql'
import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../../__generated__/GroupDetailsQuery.graphql'
import { MembersListFragment$key } from '../../../../__generated__/MembersListFragment.graphql'
import { ProfileNode } from '../../../profiles/common'
import {
  GroupDetailsQuery,
  MembersListFragment,
  useGroupNameAndAvatar,
  useRoomListSubscription,
  useUpdateChatRoomMutation,
} from '../../common'
import EditGroupTitleAndImage from '../__shared__/EditGroupTitleAndImage'
import DefaultGroupChatMembersList from '../__shared__/GroupChatMembersList'
import { CREATE_OR_EDIT_GROUP_FORM_VALUE as FORM_VALUE } from '../__shared__/constants'
import AddMembersDialog from './AddMembersDialog'
import AddMembersMobile from './AddMembersMobile'
import { DEFAULT_FORM_VALIDATION, getDefaultFormValues } from './constants'
import { HeaderContainer } from './styled'
import { EditGroupProps } from './types'

const EditGroup: FC<EditGroupProps & { profileId: string }> = ({
  profileId,
  allProfilesRef,
  queryRef,
  roomId,
  GroupChatMembersList = DefaultGroupChatMembersList,
  GroupChatMembersListProps = {},
  onCancellation,
  onRemovalFromGroup,
  onValidSubmission,
}) => {
  const { sendToast } = useNotification()
  const [open, setOpen] = useState(false)
  const smDown = useResponsive('down', 'sm')
  const { chatRoom: group } = usePreloadedQuery<GroupDetailsQueryType>(GroupDetailsQuery, queryRef)
  const { avatar, title } = useGroupNameAndAvatar(group)
  useRoomListSubscription({ profileId, connections: [], onRemoval: onRemovalFromGroup })

  const {
    data: membersList,
    loadNext,
    isLoadingNext,
    hasNext,
    refetch,
  } = usePaginationFragment<ChatRoomParticipantsPaginationQuery, MembersListFragment$key>(
    MembersListFragment,
    group,
  )

  const participants = useMemo(
    () =>
      membersList?.participants?.edges?.map(
        (edge: any) => edge?.node?.profile && edge.node.profile,
      ) as ProfileNode[],
    [membersList],
  )

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
    delete dirtyValues.participants

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
  const [isPending, startTransition] = useTransition()
  const handleAddMemberSuccess = () => {
    setOpen(false)
    startTransition(() => {
      refetch?.({})
    })
  }

  if (smDown && open)
    return (
      <AddMembersMobile
        allProfilesRef={allProfilesRef}
        onClose={() => setOpen(false)}
        handleSubmitSuccess={handleAddMemberSuccess}
        profileId={profileId}
        roomId={roomId}
        isPending={isPending}
        existingMembers={participants}
      />
    )

  return (
    <Box>
      <AddMembersDialog
        open={open}
        allProfilesRef={allProfilesRef}
        onClose={() => setOpen(false)}
        handleSubmitSuccess={handleAddMemberSuccess}
        profileId={profileId}
        roomId={roomId}
        isPending={isPending}
        existingMembers={participants}
      />
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
      <GroupChatMembersList
        FORM_VALUE={FORM_VALUE}
        setValue={setValue}
        watch={watch}
        currentParticipants={participants}
        refetch={refetch}
        membersLoadNext={loadNext}
        membersHasNext={hasNext}
        membersIsLoadingNext={isLoadingNext}
        MembersListProps={{
          allowAddMember: true,
          onAddMemberClick: () => setOpen(true),
          ...(GroupChatMembersListProps?.MembersListProps ?? {}),
        }}
        {...GroupChatMembersListProps}
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
