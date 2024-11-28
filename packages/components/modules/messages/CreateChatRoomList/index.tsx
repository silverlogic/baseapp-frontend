'use client'

import { ChangeEventHandler, FC, useMemo, useTransition } from 'react'

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
import SearchNotFoundState from '../SearchNotFoundState'
import DefaultChatRoomListItem from './ChatRoomListItem'
import EmptyProfilesListState from './EmptyProfilesListState'
import { GroupChatContainer, MainContainer, SearchbarContainer } from './styled'
import { CreateChatRoomListProps, ProfileNode } from './types'

const CreateChatRoomList: FC<CreateChatRoomListProps> = ({
  allProfilesRef,
  ChatRoomListItem = DefaultChatRoomListItem,
  ChatRoomListItemProps = {},
  Searchbar = DefaultSearchbar,
  SearchbarProps = {},
  VirtuosoProps = {},
  setIsInExistingChatRoomsView,
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
    () => allProfiles?.edges.filter((edge: any) => edge?.node).map((edge: any) => edge?.node) || [],
    [allProfiles],
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
      <GroupChatContainer onClick={() => {}}>
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
