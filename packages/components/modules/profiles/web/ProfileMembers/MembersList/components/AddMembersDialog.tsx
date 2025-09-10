import React, { FC, useMemo, useRef, useState, useTransition } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { AddIcon, CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { AutoCompleteField } from '@baseapp-frontend/design-system/components/web/inputs'
import { useNotification } from '@baseapp-frontend/utils'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay'

import { UsersListFragment$key } from '../../../../../../__generated__/UsersListFragment.graphql'
import { UsersListPaginationQuery as UsersListPaginationQueryType } from '../../../../../../__generated__/UsersListPaginationQuery.graphql'
import { UsersListFragment } from '../../../../common'
import { useProfileUserRoleCreateMutation } from '../../../../common/graphql/mutations/ProfileUserRoleCreate'
import { UsersListPaginationQuery } from '../../../../common/graphql/queries/UsersList'
import MemberPersonalInfo from '../../components/MemberPersonalInfo'
import { MEMBER_STATUSES } from '../../constants'
import { UserListItemContainer } from '../../styled'
import UserCard from './UserCard'
import VirtuosoListBox from './VirtuosoListBox'
import { AddMembersDialogProps, NewEmail, User } from './types'

const AddMembersDialog: FC<AddMembersDialogProps> = ({
  isOpen,
  onClose,
  profileId,
  refetchMembers,
  LoadingStateProps,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [selectedEmails, setSelectedEmails] = useState<NewEmail[]>([])
  const autocompleteRef = useRef<HTMLInputElement>(null)

  const [commitMutation, isMutationInFlight] = useProfileUserRoleCreateMutation()
  const { sendToast } = useNotification()
  const [isPending, startTransition] = useTransition()
  const { control, reset, watch } = useForm({ defaultValues: { search: '' } })
  const searchQuery = watch('search')

  const usersQueryData = useLazyLoadQuery<UsersListPaginationQueryType>(UsersListPaginationQuery, {
    q: '',
  })
  const { data, refetch, isLoadingNext, hasNext, loadNext } = usePaginationFragment<
    UsersListPaginationQueryType,
    UsersListFragment$key
  >(UsersListFragment, usersQueryData)

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

  const users = useMemo(
    () => data?.users?.edges?.map((edge) => edge?.node) || [],
    [data?.users?.edges],
  )
  const filteredUsers = useMemo(
    () =>
      users
        .filter((user) => !selectedUsers.some((selectedUser) => selectedUser?.id === user?.id))
        .filter((user) => user?.profile?.id !== profileId),
    [users, selectedUsers, profileId],
  )
  const autocompleteOptions = useMemo(() => {
    const baseOptions = filteredUsers
    const inputValue = searchQuery?.trim()
    if (!inputValue) {
      return baseOptions
    }
    const filtered = baseOptions.filter(
      (option) =>
        option?.fullName?.toLowerCase().includes(inputValue.toLowerCase()) ||
        option?.email?.toLowerCase().includes(inputValue.toLowerCase()),
    )
    if (inputValue.includes('@') && filtered.length === 0) {
      return [{ email: inputValue, isNewEmail: true }]
    }
    return filtered
  }, [filteredUsers, searchQuery])

  const isEmailAlreadySelected = (currentEmail: NewEmail) =>
    selectedEmails.some((selectedEmail) => selectedEmail?.email === currentEmail?.email)

  const onSelectUser = (event: any, newValue: User | NewEmail) => {
    handleSearchClear()
    if ('isNewEmail' in newValue) {
      if (isEmailAlreadySelected(newValue)) {
        sendToast('Email already added', { type: 'warning' })
        return
      }
      setSelectedEmails([...selectedEmails, newValue])
    } else {
      setSelectedUsers([...selectedUsers, newValue as User])
    }
  }

  const handleInvite = () => {
    const usersIds = selectedUsers.map((user: User) => user?.id)
    const emailsToInvite = selectedEmails.map((email: NewEmail) => email?.email)
    commitMutation({
      variables: { input: { profileId: profileId ?? '', usersIds, emailsToInvite } },
      onCompleted: (response, errors) => {
        if (!errors) {
          sendToast('Members invited successfully', { type: 'success' })
          refetchMembers?.({ q: '' })
          setSelectedUsers([])
          handleSearchClear()
          onClose()
        }
      },
    })
  }

  const renderLoadingState = () => {
    if (!isLoadingNext) return null

    return (
      <LoadingState
        sx={{ paddingTop: 3, paddingBottom: 1 }}
        CircularProgressProps={{ size: 15 }}
        {...LoadingStateProps}
      />
    )
  }

  const handleItemSelection = (option: User | NewEmail) => {
    onSelectUser(null, option)
    if (autocompleteRef.current) {
      const inputElement = autocompleteRef.current.querySelector('input')
      if (inputElement) {
        inputElement.blur()
      }
    }
  }

  const renderItem = (index: number, option: User | NewEmail) => {
    const isNewEmail = 'isNewEmail' in option
    return (
      <UserListItemContainer
        key={isNewEmail ? option.email : (option as User).id}
        onClick={() => {
          handleItemSelection(option)
        }}
      >
        {isNewEmail ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {option.email}
              </Typography>
            </Box>
            <IconButton>
              <AddIcon />
            </IconButton>
          </Box>
        ) : (
          <MemberPersonalInfo
            member={(option as User)?.profile ?? undefined}
            status={(option as User)?.isActive ? MEMBER_STATUSES.active : MEMBER_STATUSES.inactive}
          />
        )}
      </UserListItemContainer>
    )
  }

  const CustomVirtuosoListBox = (props: any) =>
    VirtuosoListBox(
      props,
      autocompleteOptions,
      renderItem,
      renderLoadingState,
      hasNext,
      isLoadingNext,
      loadNext,
    )

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 3 }}
      >
        <Typography variant="h6">Add Members 1</Typography>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="body1">
          Add users to your organization or send an invitation email.
        </Typography>
        <AutoCompleteField
          ref={autocompleteRef}
          name="search"
          options={autocompleteOptions}
          control={control}
          isPending={isPending}
          ListboxComponent={CustomVirtuosoListBox}
          value={null}
          inputValue={searchQuery}
          onInputChange={(event: any, newInputValue: string) => {
            if (event?.type === 'change') {
              handleSearch(newInputValue)
            }
          }}
          renderInput={(params: any) => (
            <TextField {...params} placeholder="Invite members by name or email" hideClearButton />
          )}
          filterOptions={(options: any) => options}
        />
        <Box display="flex" flexDirection="column" gap={1}>
          {selectedUsers.map((user: User) => (
            <UserCard
              key={user?.id}
              user={user}
              onRemove={() => setSelectedUsers(selectedUsers.filter((u) => u?.id !== user?.id))}
            />
          ))}
          {selectedEmails.map((email: NewEmail) => (
            <UserCard
              key={email?.email}
              user={email}
              onRemove={() =>
                setSelectedEmails(selectedEmails.filter((e) => e?.email !== email?.email))
              }
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleInvite}
          disabled={
            (selectedUsers.length === 0 && selectedEmails.length === 0) || isMutationInFlight
          }
        >
          Invite
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddMembersDialog
