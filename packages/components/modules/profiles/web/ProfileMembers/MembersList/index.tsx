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
import InviteMemberDialog from '../InviteMemberDialog'
import DefaultMemberItem from '../MemberItem'
import MemberListItem from '../MemberListItem'
import { MEMBER_ROLES, MEMBER_STATUSES, NUMBER_OF_MEMBERS_TO_LOAD_NEXT } from '../constants'
import { MembersListProps } from './types'

const MembersList: FC<MembersListProps> = ({
  userRef,
  MemberItem = DefaultMemberItem,
  MemberItemProps = {},
  LoadingState = DefaultLoadingState,
  LoadingStateProps = {},
  membersContainerHeight = 400,
}) => {
  const [isPending, startTransition] = useTransition()
  const [isInviteOpen, setIsInviteOpen] = useState(false)
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

  const handleInvited = () => {
    startTransition(() => {
      refetch({ q: watch('search') })
    })
  }

  const members = useMemo(
    () => data?.members?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [data?.members?.edges],
  )

  // Match MemberItem's case-insensitive search so the header count stays in sync
  // with the owner row it actually renders.
  const isOwnerVisible = ownerProfile?.name
    ?.toLowerCase()
    .includes(watch('search').toLowerCase())

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
      MemberItemComponentProps={MemberItemProps}
      searchQuery={watch('search')}
    />
  )

  return (
    <>
      <InviteMemberDialog
        open={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onInvited={handleInvited}
      />
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          mb: 4,
        }}
      >
        <Typography variant="subtitle2">
          {resultsCount === 1 ? `${resultsCount} member` : `${resultsCount} members`}
        </Typography>
        {data?.canAddMember && (
          <Button
            variant="contained"
            color="inherit"
            onClick={() => setIsInviteOpen(true)}
            sx={{ maxWidth: 'fit-content', whiteSpace: 'nowrap' }}
          >
            Add Member
          </Button>
        )}
      </Box>
      {members.length === 0 ? (
        <MemberItem
          member={data}
          memberRole={MEMBER_ROLES.owner}
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
    </>
  )
}

export default MembersList
