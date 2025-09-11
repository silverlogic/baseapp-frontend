import { FC, useMemo, useState, useTransition } from 'react'

import { LoadingState as DefaultLoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { Searchbar } from '@baseapp-frontend/design-system/components/web/inputs'

import { Box, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useFragment, usePaginationFragment } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'

import { MemberItemFragment$key } from '../../../../../__generated__/MemberItemFragment.graphql'
import { ProfileItemFragment$key } from '../../../../../__generated__/ProfileItemFragment.graphql'
import { ProfileItemFragment, UserMembersListFragment } from '../../../common'
import DefaultMemberItem from '../MemberItem'
import MemberListItem from '../MemberListItem'
import { MEMBER_STATUSES, NUMBER_OF_MEMBERS_TO_LOAD_NEXT } from '../constants'
import AddMembersDialog from './AddMembersDialog'
import { MembersListProps } from './types'

const MembersList: FC<MembersListProps> = ({
  userRef,
  MemberItem = DefaultMemberItem,
  MemberItemProps = {},
  LoadingState = DefaultLoadingState,
  LoadingStateProps = {},
  membersContainerHeight = 400,
}) => {
  const [isAddMembersModalOpen, setIsAddMembersModalOpen] = useState(false)

  const [isPending, startTransition] = useTransition()
  const { control, reset, watch } = useForm({ defaultValues: { search: '' } })
  const { data, loadNext, hasNext, isLoadingNext, refetch } = usePaginationFragment(
    UserMembersListFragment,
    userRef,
  )
  const ownerProfile = useFragment<ProfileItemFragment$key>(ProfileItemFragment, data)

  const handleSearch = (value: string) => {
    startTransition(() => {
      refetch({ q: value })
    })
  }

  const handleSearchClear = () => {
    startTransition(() => {
      reset()
      handleSearch('')
    })
  }

  const members = useMemo(
    () => data?.members?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [data?.members?.edges],
  )

  const isOwnerVisible = ownerProfile?.name?.includes(watch('search'))

  const resultsCount = isOwnerVisible ? members.length + 1 : members.length

  const renderLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return (
      <LoadingState
        sx={{ paddingTop: 3, paddingBottom: 1 }}
        CircularProgressProps={{ size: 15 }}
        {...LoadingStateProps}
      />
    )
  }

  const renderMemberItem = (member: MemberItemFragment$key, index: number) => (
    <MemberListItem
      member={member}
      data={data}
      prevMember={members[index - 1]}
      nextMember={members[index + 1]}
      MemberItemComponent={MemberItem}
      memberItemComponentProps={MemberItemProps}
      searchQuery={watch('search')}
    />
  )

  return (
    <>
      <Searchbar
        variant="outlined"
        size="small"
        isPending={isPending}
        onChange={(e) => handleSearch(e.target.value)}
        onClear={() => handleSearchClear()}
        name="search"
        control={control}
        sx={{ mb: 4 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="subtitle2">
          {resultsCount === 1 ? `${resultsCount} member` : `${resultsCount} members`}
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          size="small"
          sx={{ width: 'auto' }}
          onClick={() => setIsAddMembersModalOpen(true)}
        >
          Add members
        </Button>
      </Box>
      {resultsCount === 1 && isOwnerVisible ? (
        <MemberItem
          member={data}
          memberRole="owner"
          status={MEMBER_STATUSES.active}
          searchQuery={watch('search')}
        />
      ) : (
        <Virtuoso
          style={{ height: membersContainerHeight }}
          data={members}
          itemContent={(_index, member) => member && renderMemberItem(member, _index)}
          components={{
            Footer: renderLoadingState,
          }}
          endReached={() => {
            if (hasNext) {
              loadNext(NUMBER_OF_MEMBERS_TO_LOAD_NEXT)
            }
          }}
        />
      )}
      <AddMembersDialog
        isOpen={isAddMembersModalOpen}
        onClose={() => setIsAddMembersModalOpen(false)}
        profileId={ownerProfile?.id}
        refetchMembers={refetch}
        LoadingStateProps={LoadingStateProps}
      />
    </>
  )
}

export default MembersList
