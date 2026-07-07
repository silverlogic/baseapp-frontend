import { FC, useEffect, useMemo, useRef, useState, useTransition } from 'react'

import { LoadingState as DefaultLoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { Searchbar } from '@baseapp-frontend/design-system/components/web/inputs'

import { Box, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ConnectionHandler, useFragment, usePaginationFragment } from 'react-relay'

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
}) => {
  const [isPending, startTransition] = useTransition()
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const { control, reset, watch } = useForm({ defaultValues: { search: '' } })
  const { data, loadNext, hasNext, isLoadingNext, refetch } = usePaginationFragment(
    UserMembersListFragment,
    userRef,
  )
  const ownerProfile = useFragment<ProfileItemFragment$key>(
    ProfileItemFragment,
    data?.owner?.profile,
  )

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

  const memberEdges = useMemo(
    () => data?.members?.edges?.filter((edge) => edge?.node) ?? [],
    [data?.members?.edges],
  )
  const members = useMemo(() => memberEdges.map((edge) => edge?.node), [memberEdges])

  const membersConnectionId = ConnectionHandler.getConnectionID(
    data.id,
    'UserMembersFragment_members',
    { orderBy: 'status', q: watch('search') },
  )

  // Load the next page when the sentinel at the bottom of the list scrolls into view.
  // The list is rendered plainly so it grows the page (no fixed-height inner scroller and
  // no virtualization settle), so we watch the document viewport rather than a container.
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const sentinel = loadMoreRef.current
    if (!sentinel || !hasNext) return undefined

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && hasNext && !isLoadingNext) {
        loadNext(NUMBER_OF_MEMBERS_TO_LOAD_NEXT)
      }
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNext, isLoadingNext, loadNext])

  // Match MemberItem's case-insensitive search so the header count stays in sync
  // with the owner row it actually renders.
  const isOwnerVisible = ownerProfile?.name?.toLowerCase().includes(watch('search').toLowerCase())

  const resultsCount = isOwnerVisible ? members.length + 1 : members.length

  return (
    <>
      <InviteMemberDialog
        open={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        connections={[membersConnectionId]}
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
          member={data?.owner?.profile}
          memberRole={MEMBER_ROLES.owner}
          status={MEMBER_STATUSES.active}
          searchQuery={watch('search')}
        />
      ) : (
        <>
          {members.map((member, index) =>
            member ? (
              <MemberListItem
                key={memberEdges[index]?.cursor ?? index}
                member={member}
                data={data}
                prevMember={members[index - 1]}
                nextMember={members[index + 1]}
                MemberItemComponent={MemberItem}
                MemberItemComponentProps={MemberItemProps}
                searchQuery={watch('search')}
              />
            ) : null,
          )}
          {isLoadingNext && (
            <LoadingState
              sx={{ paddingTop: 3, paddingBottom: 1 }}
              CircularProgressProps={{ size: 15 }}
              {...LoadingStateProps}
            />
          )}
          {hasNext && <div ref={loadMoreRef} aria-hidden />}
        </>
      )}
    </>
  )
}

export default MembersList
