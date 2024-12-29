'use client'

import { ChangeEventHandler, FC, useMemo, useTransition } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import {
  CheckMarkIcon,
  CircledAvatar,
  CloseIcon,
  Searchbar as DefaultSearchbar,
  FileUploadButton,
  IconButton,
  TextField,
} from '@baseapp-frontend/design-system'
import { filterDirtyValues, setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { Box, Typography, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ConnectionHandler } from 'relay-runtime'

import { useAllProfilesList } from '../../profiles/graphql/queries/AllProfilesList'
import { useChatRoom } from '../context'
import { useCreateChatRoomMutation } from '../graphql/mutations/CreateChatRoom'
import { ProfileNode } from '../types'
import DefaultConnectionsList from './ConnectionsList'
import DefaultProfileCard from './ProfileCard'
import {
  DEFAULT_FORM_VALIDATION,
  DEFAULT_FORM_VALUES,
  DEFAULT_IMAGE_FORMATS,
  DEFAULT_IMAGE_MAX_SIZE,
  FORM_VALUE,
} from './constants'
import {
  HeaderContainer,
  ProfilesContainer,
  SearchbarContainer,
  UploadProfileContainer,
} from './styled'
import { CreatGroupUpload, CreateGroupProps } from './types'
import { getImageUrl } from './utils'

const CreateGroup: FC<CreateGroupProps> = ({
  allProfilesRef,
  ProfileCard = DefaultProfileCard,
  ProfileCardProps = {},
  Searchbar = DefaultSearchbar,
  SearchbarProps = {},
  ConnectionsList = DefaultConnectionsList,
  ConnectionsListProps = {},
  setIsInGroupChatCreation,
  setIsInExistingChatRoomsView,
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
    reset,
    handleSubmit,
    formState: { isValid, isDirty, dirtyFields },
    trigger,
  } = formReturn

  const { currentProfile } = useCurrentProfile()

  const [commit, isMutationInFlight] = useCreateChatRoomMutation()
  const { setChatRoom } = useChatRoom()

  const onSubmit = handleSubmit((data: CreatGroupUpload) => {
    const dirtyValues = filterDirtyValues({ values: data, dirtyFields })
    const { title, participants, image } = data
    const participantsIds = participants.map((member) => member.id)
    const uploadables: { image?: File | Blob } = {}
    if ('image' in dirtyValues && image && typeof image !== 'string') {
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
          setIsInExistingChatRoomsView(true)
        }
      },
    })
    reset({}, { keepValues: true })
    setIsInGroupChatCreation(false)
  })
  const watchImage = watch(FORM_VALUE.image)
  const imageUrl = getImageUrl(watchImage)
  const remotePatternsHostName = process.env.NEXT_PUBLIC_REMOTE_PATTERNS_HOSTNAME || '' // To get this working in staging/prod, change NEXT_PUBLIC_REMOTE_PATTERNS_HOSTNAME to the media host being used (e.g.: digitalocean, aws, etc)
  const hasUploadedImage = remotePatternsHostName && imageUrl.includes(remotePatternsHostName)

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

  const handleRemoveImage = (type: keyof CreatGroupUpload) => {
    clearErrors(type)
    setValue(type, null, {
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const isCreateButtonDisabled = !isValid || !isDirty || isMutationInFlight

  return (
    <>
      <Box>
        <HeaderContainer>
          <IconButton
            onClick={() => {
              setIsInGroupChatCreation(false)
            }}
            aria-label="cancel group creation"
          >
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
        <Box
          sx={{
            display: 'grid',
            gap: theme.spacing(1.5),
            padding: theme.spacing(2),
          }}
        >
          <UploadProfileContainer>
            <CircledAvatar
              src={imageUrl}
              width={144}
              height={144}
              hasError={!!getFieldState('image').error}
            />
            {getFieldState('image').error && (
              <div className="text-center">
                <Typography color="error.main" variant="caption">
                  {getFieldState('image').error!.message}
                </Typography>
              </div>
            )}
            <FileUploadButton
              control={control}
              name={FORM_VALUE.image}
              setFile={setValue}
              accept={DEFAULT_IMAGE_FORMATS}
              maxSize={DEFAULT_IMAGE_MAX_SIZE}
              label={hasUploadedImage ? 'Change Avatar' : 'Upload Avatar'}
            />
            {watchImage && (
              <LoadingButton
                variant="text"
                color="error"
                loading={isMutationInFlight}
                disabled={isMutationInFlight}
                onClick={() => handleRemoveImage(FORM_VALUE.image)}
              >
                Remove
              </LoadingButton>
            )}
          </UploadProfileContainer>
          <TextField
            label="Group Name"
            control={control}
            name={FORM_VALUE.title}
            className="h-[min-content]"
            onKeyUp={() => {
              trigger(FORM_VALUE.title)
            }}
          />
        </Box>
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
