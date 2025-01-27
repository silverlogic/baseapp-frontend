'use client'

import { FC } from 'react'

import { AvatarButton, LoadingState } from '@baseapp-frontend/design-system'

import { Box, Typography, useTheme } from '@mui/material'
import { Virtuoso } from 'react-virtuoso'

import DefaultSearchNotFoundState from '../../../../__shared__/SearchNotFoundState'
import DefaultEmptyProfilesListState from '../../../EmptyProfilesListState'
import { ProfileNode } from '../../types'
import { ProfilesListProps } from './types'

const ProfilesList: FC<ProfilesListProps> = ({
  searchValue,
  profiles = [],
  isPending,
  isLoadingNext,
  hasNext,
  loadNext,
  renderItem,
  VirtuosoProps = {},
  NormalListProps = {},
  label = 'Available connections',
  title = 'Connections',
  EmptyProfilesListState = DefaultEmptyProfilesListState,
  SearchNotFoundState = DefaultSearchNotFoundState,
  allowAddMember = false,
  onAddMemberClick = () => {},
  removeTitle = false,
}) => {
  const theme = useTheme()
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
  const isPaginated = loadNext
  const emptyProfilesList = profiles.length === 0

  if (!isPending && searchValue && emptyProfilesList && isPaginated) return <SearchNotFoundState />

  if (!isPending && emptyProfilesList && isPaginated) return <EmptyProfilesListState />

  return (
    <>
      <menu aria-label={label}>
        {!removeTitle && (
          <Typography
            variant="subtitle2"
            color="text.primary"
            sx={{
              padding: title === '' ? 0 : theme.spacing(2),
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            {title}
          </Typography>
        )}
      </menu>
      {allowAddMember && (
        <AvatarButton
          onClick={onAddMemberClick}
          caption="Add Member"
          imageString="/svg/avatar-add-member.svg"
        />
      )}
      {isPaginated ? (
        <Virtuoso
          data={profiles}
          itemContent={(_index, item) => renderItem(item)}
          style={{ scrollbarWidth: 'none', maxHeight: '250px' }}
          components={{
            Footer: renderLoadingState,
          }}
          endReached={() => {
            if (hasNext) {
              loadNext?.(5)
            }
          }}
          {...VirtuosoProps}
        />
      ) : (
        <Box maxHeight={250} overflow="auto" sx={{ scrollbarWidth: 'none' }} {...NormalListProps}>
          {profiles.map((member: ProfileNode) => renderItem(member, true))}
        </Box>
      )}
    </>
  )
}

export default ProfilesList
