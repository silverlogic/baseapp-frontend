'use client'

import { FC, useMemo, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'
import { filterDirtyValues, setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { usePaginationFragment, usePreloadedQuery } from 'react-relay'

import { ChatRoomParticipantsPaginationQuery } from '../../../../__generated__/ChatRoomParticipantsPaginationQuery.graphql'
import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../../__generated__/GroupDetailsQuery.graphql'
import { MembersListFragment$key } from '../../../../__generated__/MembersListFragment.graphql'
import { ProfileItemFragment$key } from '../../../../__generated__/ProfileItemFragment.graphql'
import { ProfileNode } from '../../../profiles/common'
import {
  GroupDetailsQuery,
  MembersListFragment,
  useCheckIsAdmin,
  useRoomListSubscription,
  useTitleAndImage,
  useUpdateChatRoomMutation,
} from '../../common'
import { CREATE_OR_EDIT_GROUP_FORM_VALUE as FORM_VALUE } from '../../common/constants'
import { CreateOrEditGroup } from '../../common/types'
import EditGroupTitleAndImage from '../__shared__/EditGroupTitleAndImage'
import DefaultGroupChatMembersList from '../__shared__/GroupChatMembersList'
import LeaveGroupDialog from '../__shared__/LeaveGroupDialog'
import AddMembersDialog from './AddMembersDialog'
import AddMembersMobile from './AddMembersMobile'
import DefaultHeader from './Header'
import { DEFAULT_FORM_VALIDATION, getDefaultFormValues } from './constants'
import { GroupChatEditProps } from './types'

const GroupChatEdit: FC<GroupChatEditProps & { profileId: string }> = ({
  allProfilesRef,
  Header = DefaultHeader,
  HeaderProps = {},
  GroupChatMembersList = DefaultGroupChatMembersList,
  GroupChatMembersListProps = {},
  onCancellation,
  onRemovalFromGroup,
  onValidSubmission,
  profileId,
  queryRef,
  roomId,
}) => {
  const { sendToast } = useNotification()
  const [open, setOpen] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState<ProfileItemFragment$key | null>(null)
  const smDown = useResponsive('down', 'sm')
  const { chatRoom: group } = usePreloadedQuery<GroupDetailsQueryType>(GroupDetailsQuery, queryRef)
  const { image: chatImage, title } = useTitleAndImage(group)

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
  const { isSoleAdmin } = useCheckIsAdmin(membersList?.participants)
  const formReturn = useForm<CreateOrEditGroup>({
    defaultValues: getDefaultFormValues(title || '', chatImage),
    resolver: zodResolver(DEFAULT_FORM_VALIDATION),
    mode: 'onBlur',
  })

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { isValid, isDirty, dirtyFields },
  } = formReturn

  const [commit, isMutationInFlight] = useUpdateChatRoomMutation()

  const onSubmit = handleSubmit((data: CreateOrEditGroup) => {
    if (!roomId) return

    const dirtyValues = filterDirtyValues({ values: data, dirtyFields })
    const { image } = data
    const uploadables: { image?: File | Blob } = {}
    if ('image' in dirtyValues) {
      if (image && (image instanceof File || image instanceof Blob)) {
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

  const isEditButtonDisabled = !isValid || !isDirty

  const handleRemoveMember = (profile: ProfileItemFragment$key) => {
    setMemberToRemove(profile)
  }

  const handleAddMemberSuccess = () => {
    setOpen(false)
  }
  if (smDown && open)
    return (
      <AddMembersMobile
        allProfilesRef={allProfilesRef}
        onClose={() => setOpen(false)}
        handleSubmitSuccess={handleAddMemberSuccess}
        profileId={profileId}
        roomId={roomId}
        existingMembers={participants}
      />
    )

  return (
    <Box>
      {roomId && memberToRemove && (
        <LeaveGroupDialog
          open={!!memberToRemove}
          onClose={() => setMemberToRemove(null)}
          profileId={profileId}
          removingParticipantFragmentRef={memberToRemove}
          roomId={roomId}
          isSoleAdmin={isSoleAdmin}
        />
      )}
      <AddMembersDialog
        open={open}
        allProfilesRef={allProfilesRef}
        onClose={() => setOpen(false)}
        handleSubmitSuccess={handleAddMemberSuccess}
        profileId={profileId}
        roomId={roomId}
        existingMembers={participants}
      />
      <Header
        isEditButtonDisabled={isEditButtonDisabled}
        isMutationInFlight={isMutationInFlight}
        onCancellation={onCancellation}
        onSubmit={onSubmit}
        {...HeaderProps}
      />
      <EditGroupTitleAndImage
        form={formReturn}
        FORM_VALUE={FORM_VALUE}
        isMutationInFlight={isMutationInFlight}
      />
      <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
        <GroupChatMembersList
          FORM_VALUE={FORM_VALUE}
          setValue={setValue}
          watch={watch}
          currentParticipants={participants}
          onRemoveMember={handleRemoveMember}
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
    </Box>
  )
}

const WrappedEditGroup: FC<GroupChatEditProps> = (props) => {
  const { currentProfile } = useCurrentProfile()
  if (!currentProfile?.id) {
    return null
  }
  return <GroupChatEdit profileId={currentProfile.id} {...props} />
}

export default WrappedEditGroup
