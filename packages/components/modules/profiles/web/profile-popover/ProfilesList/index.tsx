'use client'

import { FC, Suspense, useMemo } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useNotification } from '@baseapp-frontend/utils'

import { Box, ButtonBase, Divider, Slide } from '@mui/material'
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'

import {
  ProfileItemFragment$data,
  ProfileItemFragment$key,
} from '../../../../../__generated__/ProfileItemFragment.graphql'
import { ProfilesListFragment$key } from '../../../../../__generated__/ProfilesListFragment.graphql'
import { ProfilesListQuery as ProfilesListQueryType } from '../../../../../__generated__/ProfilesListQuery.graphql'
import { ProfilesListFragment, ProfilesListQuery } from '../../../common'
import EmptyState from './EmptyState'
import LoadingState from './LoadingState'
import ProfileMenuItem from './ProfileMenuItem'
import { CancelMenuItem, StyledList } from './styled'
import { ProfilesListProps } from './types'

const ProfilesList: FC<ProfilesListProps> = ({
  handleCloseSubmenu,
  MenuItemProps,
  LoadingStateProps = {},
  listMaxHeight = 300,
}) => {
  const options = { count: 10 }
  const { me } = useLazyLoadQuery<ProfilesListQueryType>(ProfilesListQuery, options, {
    fetchPolicy: 'store-and-network',
  })

  const { sendToast } = useNotification()
  const { currentProfile, setCurrentProfile } = useCurrentProfile()

  const handleProfileChange = (profile: ProfileItemFragment$data) => {
    if (currentProfile?.id !== profile.id) {
      // TODO: handle the absolute image path on the backend
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/v1', '')
      const absoluteImagePath = profile.image ? `${baseUrl}${profile.image?.url}` : null

      setCurrentProfile({
        id: profile.id,
        name: profile.name ?? null,
        image: absoluteImagePath,
        urlPath: profile.urlPath?.path ?? null,
      })
      sendToast(`Switched to ${profile.name}`)
      handleCloseSubmenu()
    }
  }

  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment<
    ProfilesListQueryType,
    ProfilesListFragment$key
  >(ProfilesListFragment, me)

  const profiles = useMemo(
    () => data?.profiles?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [data?.profiles?.edges],
  )

  const renderVirtuosoLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return (
      <LoadingState
        sx={{ paddingTop: 3 }}
        CircularProgressProps={{ size: 15 }}
        {...LoadingStateProps}
      />
    )
  }

  const renderProfileItem = (
    profile: ProfileItemFragment$key | null | undefined,
    index: number,
  ) => {
    if (!profile) return null

    return (
      <ProfileMenuItem
        profileRef={profile}
        key={`profile-${index}`}
        onProfileChange={handleProfileChange}
        {...MenuItemProps}
      />
    )
  }

  const renderContent = () => {
    if (profiles.length === 0) return <EmptyState />

    const minHeight = profiles.length * 56 > listMaxHeight ? listMaxHeight : profiles.length * 56

    return (
      <Box sx={{ backgroundColor: 'common.white' }}>
        <Virtuoso
          data={profiles}
          style={{ height: 'auto', minHeight }}
          itemContent={(index, profile) => renderProfileItem(profile, index)}
          components={{
            Footer: renderVirtuosoLoadingState,
          }}
          endReached={() => {
            if (hasNext) {
              loadNext(10)
            }
          }}
        />
      </Box>
    )
  }

  return (
    <Box>
      <StyledList disablePadding maxHeight={listMaxHeight} aria-label="List of available profiles">
        {renderContent()}
      </StyledList>
    </Box>
  )
}

const ProfilesListSuspended: FC<ProfilesListProps> = (props) => {
  const { openSubmenu, handleCloseSubmenu, cancelLabel = 'Cancel' } = props

  return (
    <Slide direction={openSubmenu ? 'left' : 'right'} in={openSubmenu} mountOnEnter unmountOnExit>
      <Box>
        <Box sx={{ p: 1 }}>
          <CancelMenuItem tabIndex={0} component={ButtonBase} onClick={() => handleCloseSubmenu()}>
            <ChevronIcon position="left" color="action" />
            {cancelLabel}
          </CancelMenuItem>
        </Box>
        <Divider sx={{ borderStyle: 'solid' }} />
        <Box sx={{ p: 1 }}>
          <Suspense fallback={<LoadingState />}>
            <ProfilesList {...props} />
          </Suspense>
        </Box>
      </Box>
    </Slide>
  )
}

export default ProfilesListSuspended
