'use client'

import { FC, useMemo } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import {
  CheckMarkIcon,
  CloseIcon,
  Searchbar as DefaultSearchbar,
  IconButton,
} from '@baseapp-frontend/design-system'
import { filterDirtyValues, setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { usePaginationFragment, usePreloadedQuery } from 'react-relay'

import { ChatRoomParticipantsPaginationQuery } from '../../../__generated__/ChatRoomParticipantsPaginationQuery.graphql'
import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../__generated__/GroupDetailsQuery.graphql'
import { MembersListFragment$key } from '../../../__generated__/MembersListFragment.graphql'
import { EditGroupTitleAndImage } from '../__shared__'
import GroupChatMembersList from '../__shared__/GroupChatMembersList'
import DefaultProfileCard from '../__shared__/GroupChatMembersList/ProfileCard'
import DefaultProfilesList from '../__shared__/GroupChatMembersList/ProfilesList'
import {
  DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALIDATION as DEFAULT_FORM_VALIDATION,
  CREATE_OR_EDIT_GROUP_FORM_VALUE as FORM_VALUE,
} from '../__shared__/constants'
import { ProfileNode } from '../__shared__/types'
import { MembersListFragment } from '../graphql/fragments/MembersList'
import { useUpdateChatRoomMutation } from '../graphql/mutations/UpdateChatRoom'
import { GroupDetailsQuery } from '../graphql/queries/GroupDetailsQuery'
import useRoomListSubscription from '../graphql/subscriptions/useRoomListSubscription'
import { useGroupNameAndAvatar } from '../utils'
import { getDefaultFormValues } from './constants'
import { HeaderContainer } from './styled'
import { EditGroupProps } from './types'

const EditGroup: FC<EditGroupProps & { profileId: string }> = ({
  profileId,
  queryRef,
  roomId,
  ProfileCard = DefaultProfileCard,
  ProfileCardProps = {},
  Searchbar = DefaultSearchbar,
  SearchbarProps = {},
  MembersList = DefaultProfilesList,
  MembersListProps = {},
  onCancellation,
  onRemovalFromGroup,
  onValidSubmission,
}) => {
  const { sendToast } = useNotification()
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
      <GroupChatMembersList
        FORM_VALUE={FORM_VALUE}
        setValue={setValue}
        watch={watch}
        currentParticipants={participants}
        refetch={refetch}
        membersLoadNext={loadNext}
        membersHasNext={hasNext}
        membersIsLoadingNext={isLoadingNext}
        Searchbar={Searchbar}
        SearchbarProps={SearchbarProps}
        ProfileCard={ProfileCard}
        ProfileCardProps={ProfileCardProps}
        MembersList={MembersList}
        MembersListProps={MembersListProps}
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
