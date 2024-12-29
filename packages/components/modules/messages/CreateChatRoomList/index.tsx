'use client'

import { ChangeEventHandler, FC, useMemo, useTransition } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import {
  AvatarWithPlaceholder,
  Searchbar as DefaultSearchbar,
  LoadingState,
} from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Virtuoso } from 'react-virtuoso'

import { useAllProfilesList } from '../../profiles/graphql/queries/AllProfilesList'
import EmptyProfilesListState from '../EmptyProfilesListState'
import SearchNotFoundState from '../SearchNotFoundState'
import { ProfileEdge, ProfileNode } from '../types'
import DefaultChatRoomListItem from './ChatRoomListItem'
import { GroupChatContainer, MainContainer, SearchbarContainer } from './styled'
import { CreateChatRoomListProps } from './types'

const CreateChatRoomList: FC<CreateChatRoomListProps> = ({
  allProfilesRef,
  ChatRoomListItem = DefaultChatRoomListItem,
  ChatRoomListItemProps = {},
  Searchbar = DefaultSearchbar,
  SearchbarProps = {},
  VirtuosoProps = {},
  setIsInExistingChatRoomsView,
  setIsInGroupChatCreation,
}) => {
  const {
    data: { allProfiles },
    loadNext,
    isLoadingNext,
    hasNext,
    refetch,
  } = useAllProfilesList(allProfilesRef)
  const [isPending, startTransition] = useTransition()
  const { control, reset, watch } = useForm({ defaultValues: { search: '' } })

  const { currentProfile } = useCurrentProfile()

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value || ''
    startTransition(() => {
      refetch({ q: value })
    })
  }

  const handleSearchClear = () => {
    startTransition(() => {
      reset()
      refetch({ q: '' })
    })
  }

  const profiles = useMemo(
    () =>
      allProfiles?.edges
        .filter((edge: ProfileEdge) => edge?.node && edge.node.id !== currentProfile?.id)
        .map((edge: ProfileEdge) => edge?.node) || [],
    [allProfiles, currentProfile?.id],
  )

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

  const renderItem = (profile: ProfileNode) => {
    if (!profile) return null

    return (
      <ChatRoomListItem
        profile={profile}
        setIsInExistingChatRoomsView={setIsInExistingChatRoomsView}
        {...ChatRoomListItemProps}
      />
    )
  }

  const renderListContent = () => {
    const emptyProfilesList = profiles.length === 0
    const searchValue = watch('search')

    if (!isPending && searchValue && emptyProfilesList) return <SearchNotFoundState />

    if (!isPending && emptyProfilesList) return <EmptyProfilesListState />

    return (
      <Virtuoso
        data={profiles}
        itemContent={(_index, item) => renderItem(item)}
        // TODO: look for a better way to calculate the height, it doesn't consider different types of headers
        style={{ scrollbarWidth: 'none', maxHeight: 'calc(100vh - 72px - 57px - 61px - 72px)' }}
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

  return (
    <MainContainer>
      <SearchbarContainer>
        <Searchbar
          name="search"
          onChange={handleSearchChange}
          onClear={handleSearchClear}
          control={control}
          isPending={isPending}
          {...SearchbarProps}
        />
      </SearchbarContainer>
      {/* TODO: Group chat creation click handler */}
      <GroupChatContainer
        onClick={() => {
          setIsInGroupChatCreation(true)
        }}
      >
        <AvatarWithPlaceholder
          width={48}
          height={48}
          sx={{
            bgcolor: 'primary.main',
            alignSelf: 'flex-start',
            justifySelf: 'center',
          }}
        >
          <Image
            src="/svg/avatar-group-chat.svg"
            alt="Avatar Group Fallback"
            width={24}
            height={24}
          />
        </AvatarWithPlaceholder>
        <Typography component="span" variant="subtitle2" sx={{ alignSelf: 'center' }}>
          New Group
        </Typography>
      </GroupChatContainer>
      {renderListContent()}
    </MainContainer>
  )
}

export default CreateChatRoomList
