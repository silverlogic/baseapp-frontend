import { FC, useEffect, useMemo, useRef, useState, useTransition } from 'react'

import { LoadingState as DefaultLoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { Searchbar } from '@baseapp-frontend/design-system/components/web/inputs'

import { Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ConnectionHandler, useFragment, usePaginationFragment } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../../__generated__/ProfileItemFragment.graphql'
import { UserMembersListFragment$key } from '../../../../../__generated__/UserMembersListFragment.graphql'
import { userMembersListPaginationRefetchable } from '../../../../../__generated__/userMembersListPaginationRefetchable.graphql'
import { ProfileItemFragment, UserMembersListFragment } from '../../../common'
import DefaultInviteMemberDialog from '../InviteMemberDialog'
import DefaultMemberItem from '../MemberItem'
import MemberListItem from '../MemberListItem'
import { MEMBER_ROLES, MEMBER_STATUSES, NUMBER_OF_MEMBERS_TO_LOAD_NEXT } from '../constants'
import { CountRow } from './styled'
import { MembersListProps } from './types'

const MembersList: FC<MembersListProps> = ({
  userRef,
  membersListFragment = UserMembersListFragment,
  MemberItem = DefaultMemberItem,
  MemberItemProps = {},
  LoadingState = DefaultLoadingState,
  LoadingStateProps = {},
  InviteMemberDialog = DefaultInviteMemberDialog,
  InviteMemberDialogProps = {},
  roleOptions,
  inactiveMemberOptions,
  roleLabels,
  statusLabels,
}) => {
  const [isPending, startTransition] = useTransition()
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const { control, reset, watch } = useForm({ defaultValues: { search: '' } })
  // A project fragment selects at least what UserMembersListFragment does (see its prop docs).
  const { data, loadNext, hasNext, isLoadingNext, refetch } = usePaginationFragment<
    userMembersListPaginationRefetchable,
    UserMembersListFragment$key
  >(membersListFragment, userRef as UserMembersListFragment$key)
  // An ownerless profile (run by its admins) has no owner row.
  const ownerProfileRef = data?.owner?.profile
  const ownerProfile = useFragment<ProfileItemFragment$key>(ProfileItemFragment, ownerProfileRef)

  // List-level options reach every row; `MemberItemProps` still wins for a single prop.
  const memberItemProps = {
    ...(roleOptions && { roleOptions }),
    ...(inactiveMemberOptions && { inactiveMemberOptions }),
    ...(roleLabels && { roleLabels }),
    ...(statusLabels && { statusLabels }),
    ...MemberItemProps,
  }

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

  // The connection's own id also covers a project fragment's extra filters (`status`, say).
  const membersConnectionId =
    // eslint-disable-next-line no-underscore-dangle
    data.members?.__id ??
    ConnectionHandler.getConnectionID(data.id, 'UserMembersFragment_members', {
      orderBy: 'status',
      q: watch('search'),
    })

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
        {...InviteMemberDialogProps}
        open={isInviteOpen}
        onClose={() => {
          setIsInviteOpen(false)
          InviteMemberDialogProps.onClose?.()
        }}
        connections={[membersConnectionId, ...(InviteMemberDialogProps.connections ?? [])]}
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
      <CountRow>
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
      </CountRow>
      {members.length === 0 ? (
        ownerProfileRef && (
          <MemberItem
            member={ownerProfileRef}
            memberRole={MEMBER_ROLES.owner}
            status={MEMBER_STATUSES.active}
            searchQuery={watch('search')}
            {...memberItemProps}
          />
        )
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
                MemberItemComponentProps={memberItemProps}
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
