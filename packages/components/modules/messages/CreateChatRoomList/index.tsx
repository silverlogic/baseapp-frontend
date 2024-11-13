'use client'

import { FC, useMemo, useTransition } from 'react'

import {
  AvatarWithPlaceholder,
  Searchbar as DefaultSearchbar,
  LoadingState,
} from '@baseapp-frontend/design-system'

import { Box, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
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
import { CreateChatRoomListProps, Edge } from './types'

const CreateChatRoomList: FC<CreateChatRoomListProps> = ({
  allProfilesRef,
  ChatRoomListCard = DefaultChatRoomListCard,
  ChatRoomListCardProps = {},
  Searchbar = DefaultSearchbar,
  SearchbarProps = {},
  VirtuosoProps = {},
  setIsInChatRoom,
  setIsInExistingChatRoomsView,
  noResultsImage = '/svg/no-search-results.svg',
  noConnectionsImage = '/svg/no-chat-connections.svg',
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
    () =>
      allProfiles?.edges
        .filter(
          (edge): edge is Edge =>
            edge?.node !== undefined &&
            edge.node !== null &&
            edge.node.id !== currentProfile.profile?.id,
        )
        .map((edge) => edge?.node) || [],
    [allProfiles],
  )

  const [isPending, startTransition] = useTransition()

  const SEARCHBAR = 'search'

  const form = useForm()

  const watchSearch = form.watch(SEARCHBAR)

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
        setIsInChatRoom={setIsInChatRoom}
        setIsInExistingChatRoomsView={setIsInExistingChatRoomsView}
        isMutationInFlight={isMutationInFlight}
        commit={commit}
        currentProfile={currentProfile}
        {...ChatRoomListCardProps}
      />
    )
  }

  const emptyStatesData = useMemo(
    () => ({
      size: watchSearch ? 224 : 196,
      image: watchSearch ? noResultsImage : noConnectionsImage,
      imageAlt: watchSearch ? 'No Results Found' : 'No Connections Found',
      title: watchSearch ? 'No results Found' : 'Search for profiles',
      subtitle: watchSearch
        ? 'Check your spelling or try another search.'
        : 'Once you connect to other profiles they will be shown here.',
    }),
    [watchSearch],
  )

  return (
    <MainContainer>
      <SearchbarContainer>
        {/* @ts-ignore TODO: Check typing */}
        <Searchbar
          isPending={isPending}
          startTransition={startTransition}
          refetch={refetch}
          form={form}
          name={SEARCHBAR}
          {...SearchbarProps}
        />
      </SearchbarContainer>
      {memoizedItems?.length === 0 ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: 'min-content auto',
            padding: theme.spacing(4),
            gap: theme.spacing(1.5),
            justifyItems: 'center',
          }}
        >
          <Image
            src={emptyStatesData.image}
            alt={emptyStatesData.imageAlt}
            width={emptyStatesData.size}
            height={emptyStatesData.size}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
              textAlign: 'center',
            }}
          >
            <Typography variant="subtitle2" component="span">
              {emptyStatesData.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {emptyStatesData.subtitle}
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
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
        </>
      )}
    </MainContainer>
  )
}

export default CreateChatRoomList
