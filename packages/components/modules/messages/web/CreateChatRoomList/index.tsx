'use client'

import { ChangeEventHandler, FC, useMemo, useTransition } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AvatarButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { NewGroupIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { Searchbar as DefaultSearchbar } from '@baseapp-frontend/design-system/components/web/inputs'

import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Virtuoso } from 'react-virtuoso'

import { SearchNotFoundState } from '../../../__shared__/web'
import { ProfileEdge, ProfileNode, useAllProfilesList } from '../../../profiles/common'
import EmptyProfilesListState from '../__shared__/EmptyProfilesListState'
import DefaultChatRoomListItem from './ChatRoomListItem'
import { MainContainer, SearchbarContainer } from './styled'
import { CreateChatRoomListProps } from './types'

const CreateChatRoomList: FC<CreateChatRoomListProps> = ({
  allProfilesRef,
  ChatRoomListItem = DefaultChatRoomListItem,
  ChatRoomListItemProps = {},
  Searchbar = DefaultSearchbar,
  SearchbarProps = {},
  VirtuosoProps = {},
  onChatCreation,
  onGroupChatCreationButtonClicked,
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
        onChatCreation={onChatCreation}
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
      <AvatarButton
        onClick={onGroupChatCreationButtonClicked}
        caption="New Group"
        Icon={NewGroupIcon}
      />
      {renderListContent()}
    </MainContainer>
  )
}

export default CreateChatRoomList
