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
  LoadingState,
  TextField,
} from '@baseapp-frontend/design-system'
import { filterDirtyValues } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { Box, Typography, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Virtuoso } from 'react-virtuoso'

import { useAllProfilesList } from '../../profiles/graphql/queries/AllProfilesList'
import { ProfileNode } from '../CreateChatRoomList/types'
import SearchNotFoundState from '../SearchNotFoundState'
import { useChatRoom } from '../context'
import { useCreateChatRoomMutation } from '../graphql/mutations/CreateChatRoom'
import DefaultChatRoomListItem from './ChatRoomListItem'
import EmptyProfilesListState from './EmptyProfilesListState'
import {
  DEFAULT_FORM_VALIDATION,
  DEFAULT_FORM_VALUES,
  DEFAULT_IMAGE_FORMATS,
  DEFAULT_IMAGE_MAX_SIZE,
  FORM_VALUE,
} from './constants'
import { MainContainer, SearchbarContainer } from './styled'
import { CreateGroupProps } from './types'

const getImageUrl = (image?: string | File | Blob | string[] | MediaSource | null) => {
  if (typeof image === 'string') return image
  if (image instanceof Blob) return URL.createObjectURL(image)
  return ''
}

const CreateGroup: FC<CreateGroupProps> = ({
  allProfilesRef,
  // TODO: Check if this is the correct way to get the remotePatternsHostName
  remotePatternsHostName = process.env.NEXT_PUBLIC_REMOTE_PATTERNS_HOSTNAME || '', // To get this working in staging/prod, change NEXT_PUBLIC_REMOTE_PATTERNS_HOSTNAME to the media host being used (e.g.: digitalocean, aws, etc)
  ChatRoomListItem = DefaultChatRoomListItem,
  ChatRoomListItemProps = {},
  Searchbar = DefaultSearchbar,
  SearchbarProps = {},
  VirtuosoProps = {},
  setIsInGroupChatCreation,
  setIsInExistingChatRoomsView,
}) => {
  const theme = useTheme()
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

  const {
    control,
    setValue,
    watch,
    getFieldState,
    clearErrors,
    reset,
    handleSubmit,
    formState: { isValid, isDirty, dirtyFields },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(DEFAULT_FORM_VALIDATION),
    mode: 'onBlur',
  })

  const { currentProfile } = useCurrentProfile()

  const [commit, isMutationInFlight] = useCreateChatRoomMutation()
  const { setChatRoom } = useChatRoom()

  const onSubmit = handleSubmit((data: any) => {
    const dirtyValues = filterDirtyValues({ values: data, dirtyFields })
    const { title, participants, image } = data
    const participantsIds = participants.map((member: any) => member.id)
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
      },
      uploadables,
      onCompleted: (response) => {
        setChatRoom({ id: response?.chatRoomCreate?.room?.node?.id })
        setIsInExistingChatRoomsView(true)
      },
    })
    reset({}, { keepValues: true })
    setIsInGroupChatCreation(false)
  })
  const watchImage = watch(FORM_VALUE.image)
  const imageUrl = getImageUrl(watchImage)
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

  const participants = watch(FORM_VALUE.participants) as any[]

  const profiles = useMemo(
    () =>
      allProfiles?.edges
        .filter(
          (edge: any) =>
            edge?.node &&
            edge?.node.id !== currentProfile?.id &&
            !participants.some((member) => member.id === edge.node.id),
        )
        .map((edge: any) => edge?.node) || [],
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
      participants.filter((member) => member.id !== profile?.id),
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      },
    )
  }

  const renderLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return (
      <LoadingState
        sx={{ paddingTop: 3, paddingBottom: 1 }}
        CircularProgressProps={{ size: 15 }}
        aria-label="loading more profiles"
      />
    )
  }

  const renderItem = (profile: ProfileNode, isMember = false) => {
    if (!profile) return null
    return (
      <ChatRoomListItem
        profile={profile}
        handleAddMember={handleAddMember}
        handleRemoveMember={handleRemoveMember}
        isMember={isMember}
        {...ChatRoomListItemProps}
      />
    )
  }

  const renderContacts = () => {
    const emptyProfilesList = profiles.length === 0
    const searchValue = searchWatch('search')

    if (!isPending && searchValue && emptyProfilesList) return <SearchNotFoundState />

    if (!isPending && emptyProfilesList) return <EmptyProfilesListState />

    return (
      <Virtuoso
        data={profiles}
        itemContent={(_index, item) => renderItem(item)}
        style={{ scrollbarWidth: 'none' }}
        components={{
          Footer: renderLoadingState,
        }}
        endReached={() => {
          if (hasNext) {
            loadNext(5)
          }
        }}
        {...VirtuosoProps}
      />
    )
  }

  const handleRemoveImage = (type: any) => {
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
        <Box
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            width: '100%',
            padding: theme.spacing(2),
          }}
        >
          <Box display="grid" width="100%" gridTemplateColumns="24px auto 24px" gap={1.5}>
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
          </Box>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gap: theme.spacing(1.5),
            padding: theme.spacing(2),
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateRows: '1fr min-content',
              justifyContent: 'center',
              gap: theme.spacing(2),
              padding: theme.spacing(1.5),
            }}
          >
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
          </Box>
          <TextField
            label="Group Name"
            control={control}
            name={FORM_VALUE.title}
            className="h-[min-content]"
          />
        </Box>
      </Box>
      <MainContainer>
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
        <MainContainer>
          <Box>
            <Box>Members</Box>
            {participants.map((member) => renderItem(member, true))}
          </Box>
          <Box>contacts</Box>
          {renderContacts()}
        </MainContainer>
      </MainContainer>
    </>
  )
}

export default CreateGroup
