'use client'

import { ChangeEventHandler, FC, useTransition } from 'react'

import { Searchbar as DefaultSearchbar } from '@baseapp-frontend/design-system/components/web/inputs'

import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'

import { ProfileNode } from '../types'
import DefaultProfileCard from './ProfileCard'
import DefaultProfilesList from './ProfilesList'
import {
  ProfilesContainer as DefaultProfilesContainer,
  SearchbarContainer as DefaultSearchbarContainer,
} from './styled'
import { GroupChatMembersListProps } from './types'

const GroupChatMembersList: FC<GroupChatMembersListProps> = ({
  FORM_VALUE,
  setValue,
  refetch,
  connections,
  currentParticipants,
  connectionsLoadNext,
  connectionsHasNext,
  connectionsIsLoadingNext,
  membersLoadNext,
  membersHasNext,
  membersIsLoadingNext,
  onRemoveMember,
  ProfilesContainer = DefaultProfilesContainer,
  ProfileCard = DefaultProfileCard,
  ProfileCardProps = {},
  Searchbar = DefaultSearchbar,
  SearchbarProps = {},
  SearchbarContainer = DefaultSearchbarContainer,
  ConnectionsList = DefaultProfilesList,
  ConnectionsListProps = {},
  MembersList = DefaultProfilesList,
  MembersListProps = {},
}) => {
  const [isPending, startTransition] = useTransition()
  const {
    control: searchControl,
    reset: searchReset,
    watch: searchWatch,
  } = useForm({ defaultValues: { search: '' } })

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value || ''
    startTransition(() => {
      refetch?.({ q: value })
    })
  }

  const handleSearchClear = () => {
    startTransition(() => {
      searchReset()
      refetch?.({ q: '' })
    })
  }

  const handleAddMember = (profile: ProfileNode) => {
    setValue(FORM_VALUE.participants, [...currentParticipants, profile], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const handleRemoveMember = (profile: ProfileNode) => {
    if (onRemoveMember) {
      onRemoveMember(profile)
    } else {
      setValue(
        FORM_VALUE.participants,
        currentParticipants.filter((member: ProfileNode) => member?.id !== profile?.id),
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        },
      )
    }
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

  return (
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
        <MembersList
          profiles={currentParticipants}
          renderItem={(profile) => renderItem(profile, true)}
          loadNext={membersLoadNext}
          hasNext={membersHasNext}
          isLoadingNext={membersIsLoadingNext}
          label="Selected group members"
          title="Members"
          {...MembersListProps}
        />
        {connections && (
          <ConnectionsList
            profiles={connections}
            renderItem={(profile) => renderItem(profile)}
            loadNext={connectionsLoadNext}
            hasNext={connectionsHasNext}
            isLoadingNext={connectionsIsLoadingNext}
            isPending={isPending}
            searchValue={searchWatch('search')}
            {...ConnectionsListProps}
          />
        )}
      </Box>
    </ProfilesContainer>
  )
}

export default GroupChatMembersList
