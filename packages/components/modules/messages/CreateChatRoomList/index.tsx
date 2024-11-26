'use client'

import { FC, useMemo, useTransition } from 'react'

import {
  AvatarWithPlaceholder,
  Searchbar as DefaultSearchbar,
  LoadingState,
} from '@baseapp-frontend/design-system'

import { Box, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { Virtuoso } from 'react-virtuoso'

import useCurrentProfile from '../../profiles/context/useCurrentProfile'
import { useAllProfilesList } from '../../profiles/graphql/queries/AllProfilesList'
import { useCreateChatRoomMutation } from '../graphql/mutations/CreateChatRoom'
import DefaultChatRoomListCard from './ChatRoomListCard'
import {
  CreateChatRoomListContainer,
  GroupChatContainer,
  MainContainer,
  SearchbarContainer,
} from './styled'
import { CreateChatRoomListProps } from './types'

const CreateChatRoomList: FC<CreateChatRoomListProps> = ({
  allProfilesRef,
  ChatRoomListCard = DefaultChatRoomListCard,
  ChatRoomListCardProps = {},
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

  const currentProfile = useCurrentProfile()

  const theme = useTheme()

  const [commit, isMutationInFlight] = useCreateChatRoomMutation()

  const memoizedItems = useMemo(
    () => allProfiles?.edges.filter((edge: any) => edge?.node).map((edge: any) => edge?.node) || [],
    [allProfiles],
  )

  const [isPending, startTransition] = useTransition()

  const renderLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return (
      <LoadingState
        sx={{ paddingTop: 3, paddingBottom: 1 }}
        CircularProgressProps={{ size: 15 }}
        aria-label="loading more comments"
      />
    )
  }

  const renderItem = (item: any) => {
    if (!item) return null

    return (
      <ChatRoomListCard
        item={item}
        setIsInExistingChatRoomsView={setIsInExistingChatRoomsView}
        isMutationInFlight={isMutationInFlight}
        commit={commit}
        currentProfile={currentProfile}
        {...ChatRoomListCardProps}
      />
    )
  }

  return (
    <MainContainer>
      <SearchbarContainer>
        {/* @ts-ignore TODO: Check typing */}
        <Searchbar
          isPending={isPending}
          startTransition={startTransition}
          refetch={refetch}
          {...SearchbarProps}
        />
      </SearchbarContainer>
      {/* TODO: Group chat creation click handler */}
      <GroupChatContainer onClick={() => {}}>
        <AvatarWithPlaceholder
          width={48}
          height={48}
          sx={{
            bgcolor: theme.palette.primary.main,
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
      <CreateChatRoomListContainer>
        <Virtuoso
          data={memoizedItems}
          overscan={1}
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
      </CreateChatRoomListContainer>
    </MainContainer>
  )
}

export default CreateChatRoomList
