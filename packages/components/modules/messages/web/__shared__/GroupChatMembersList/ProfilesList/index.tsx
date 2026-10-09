'use client'

import { FC } from 'react'

import { AvatarButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { Box, Typography, useTheme } from '@mui/material'
import { useIntl } from 'react-intl'
import { Virtuoso } from 'react-virtuoso'

import { SearchNotFoundState as DefaultSearchNotFoundState } from '../../../../../__shared__/web'
import DefaultEmptyProfilesListState from '../../EmptyProfilesListState'
import { SHARED_MESSAGES } from '../../constants'
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
  label,
  title,
  EmptyProfilesListState = DefaultEmptyProfilesListState,
  SearchNotFoundState = DefaultSearchNotFoundState,
  allowAddMember = false,
  onAddMemberClick = () => {},
  removeTitle = false,
}) => {
  const theme = useTheme()
  const intl = useIntl()
  const menuLabel =
    label ??
    intl.formatMessage({
      id: 'messages.groupMembersList.profilesList.label',
      defaultMessage: 'Available connections',
    })
  const menuTitle =
    title ??
    intl.formatMessage({
      id: 'messages.groupMembersList.profilesList.title',
      defaultMessage: 'Connections',
    })
  const renderLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return (
      <LoadingState
        sx={{ paddingTop: 3, paddingBottom: 1 }}
        CircularProgressProps={{ size: 15 }}
        aria-label={intl.formatMessage(SHARED_MESSAGES.loadingMoreProfiles)}
      />
    )
  }
  const isPaginated = loadNext
  const emptyProfilesList = profiles.length === 0

  if (!isPending && searchValue && emptyProfilesList && isPaginated) return <SearchNotFoundState />

  if (!isPending && emptyProfilesList && isPaginated) return <EmptyProfilesListState />

  return (
    <>
      <menu aria-label={menuLabel}>
        {!removeTitle && (
          <Typography
            variant="subtitle2"
            color="text.primary"
            sx={{
              padding: menuTitle === '' ? 0 : theme.spacing(2),
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            {menuTitle}
          </Typography>
        )}
      </menu>
      {allowAddMember && (
        <AvatarButton
          onClick={onAddMemberClick}
          caption={intl.formatMessage(SHARED_MESSAGES.addMember)}
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
