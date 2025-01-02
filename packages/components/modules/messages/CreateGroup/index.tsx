'use client'

import { ChangeEventHandler, FC, useMemo, useTransition } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import {
  CheckMarkIcon,
  CloseIcon,
  Searchbar as DefaultSearchbar,
  IconButton,
} from '@baseapp-frontend/design-system'
import { filterDirtyValues, setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ConnectionHandler } from 'relay-runtime'

import { useAllProfilesList } from '../../profiles/graphql/queries/AllProfilesList'
import { EditGroupTitleAndImage } from '../__shared__'
import { useChatRoom } from '../context'
import { useCreateChatRoomMutation } from '../graphql/mutations/CreateChatRoom'
import { ProfileNode } from '../types'
import DefaultConnectionsList from './ConnectionsList'
import DefaultProfileCard from './ProfileCard'
import { DEFAULT_FORM_VALIDATION, DEFAULT_FORM_VALUES, FORM_VALUE } from './constants'
import { HeaderContainer, ProfilesContainer, SearchbarContainer } from './styled'
import { CreateGroupProps, CreateGroupUpload } from './types'

const CreateGroup: FC<CreateGroupProps> = ({
  allProfilesRef,
  ProfileCard = DefaultProfileCard,
  ProfileCardProps = {},
  Searchbar = DefaultSearchbar,
  SearchbarProps = {},
  ConnectionsList = DefaultConnectionsList,
  ConnectionsListProps = {},
  onValidSubmission,
  onBackButtonClicked,
}) => {
  const theme = useTheme()
  const { sendToast } = useNotification()
  const {
    data: { allProfiles },
    loadNext,
    isLoadingNext,
    hasNext,
    refetch,
  } = useAllProfilesList(allProfilesRef)
  const [isPending, startTransition] = useTransition()
  const {
    control: searchControl,
    reset: searchReset,
    watch: searchWatch,
  } = useForm({ defaultValues: { search: '' } })

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

  const onSubmit = handleSubmit((data: CreateGroupUpload) => {
    const dirtyValues = filterDirtyValues({ values: data, dirtyFields })
    const { title, participants, image } = data
    const participantsIds = (participants || []).map((member) => member.id)
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

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value || ''
    startTransition(() => {
      refetch({ q: value })
    })
  }

  const handleSearchClear = () => {
    startTransition(() => {
      searchReset()
      refetch({ q: '' })
    })
  }

  const participants = watch(FORM_VALUE.participants) as ProfileNode[]

  const profiles = useMemo(
    () =>
      allProfiles?.edges
        .filter(
          (edge) =>
            edge?.node &&
            edge?.node.id !== currentProfile?.id &&
            !participants.some((member) => member?.id === edge?.node?.id),
        )
        .map((edge) => edge?.node) || [],
    [allProfiles, participants, currentProfile?.id],
  )

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
      participants.filter((member) => member?.id !== profile?.id),
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      },
    )
  }

  const renderItem = (profile: ProfileNode, isMember = false) => {
    if (!profile) return null
    return (
      <ProfileCard
        profile={profile}
        handleAddMember={handleAddMember}
        handleRemoveMember={handleRemoveMember}
        isMember={isMember}
        {...ProfileCardProps}
      />
    )
  }

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
      <ProfilesContainer>
        <SearchbarContainer>
          <Searchbar
            name="search"
            onChange={handleSearchChange}
            onClear={handleSearchClear}
            control={searchControl}
            isPending={isPending}
            {...SearchbarProps}
          />
        </SearchbarContainer>
        <Box height="100%" width="100%">
          <Box role="list" aria-label="Selected group members">
            <Typography
              variant="subtitle2"
              color="text.primary"
              sx={{
                padding: theme.spacing(2),
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              Members
            </Typography>
            <Box maxHeight={250} overflow="auto" sx={{ scrollbarWidth: 'none' }}>
              {participants.map((member) => renderItem(member, true))}
            </Box>
          </Box>
          <Box
            role="list"
            aria-label="Available contacts"
            sx={{
              padding: theme.spacing(2),
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="subtitle2" color="text.primary">
              Connections
            </Typography>
          </Box>
          <ConnectionsList
            profiles={profiles}
            renderItem={renderItem}
            loadNext={loadNext}
            hasNext={hasNext}
            isLoadingNext={isLoadingNext}
            isPending={isPending}
            searchValue={searchWatch('search')}
            {...ConnectionsListProps}
          />
        </Box>
      </ProfilesContainer>
    </>
  )
}

export default CreateGroup
