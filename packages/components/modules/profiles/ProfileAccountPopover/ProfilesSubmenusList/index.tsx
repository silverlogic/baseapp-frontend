'use client'

import { FC, Suspense } from 'react'

import { ChevronIcon } from '@baseapp-frontend/design-system'
import { useNotification } from '@baseapp-frontend/utils'

import { Box, ButtonBase, Divider, Slide } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { ProfileItemFragment$data } from '../../../../__generated__/ProfileItemFragment.graphql'
import { ProfilesListQuery as ProfilesListQueryType } from '../../../../__generated__/ProfilesListQuery.graphql'
import useCurrentProfile from '../../context/useCurrentProfile'
import { ProfilesListQuery } from '../../graphql/queries/ProfilesList'
import ProfileMenuItem from '../ProfileMenuItem'
import { ProfileMenuItemSkeleton, ProfilesList } from './styled'
import { ProfilesSubmenusListProps } from './types'

const ProfilesSubmenusList: FC<ProfilesSubmenusListProps> = ({
  handleCloseSubmenu,
  MenuItemProps,
}) => {
  const { me } = useLazyLoadQuery<ProfilesListQueryType>(ProfilesListQuery, {})
  const { sendToast } = useNotification()
  const { profile: currentProfile, setCurrentProfile } = useCurrentProfile()

  const handleProfileChange = (profile: ProfileItemFragment$data) => {
    if (currentProfile?.id !== profile.id) {
      setCurrentProfile({ profile })
      sendToast(`Switched to ${profile.name}`)
      handleCloseSubmenu()
    }
  }

  return me?.profiles?.map((profileRef, index) => {
    if (!profileRef) return null
    return (
      <ProfileMenuItem
        key={index} // eslint-disable-line react/no-array-index-key
        profileRef={profileRef}
        currentProfile={currentProfile}
        onProfileChange={handleProfileChange}
        {...MenuItemProps}
      />
    )
  })
}

const LoadingState: FC = () => (
  <>
    <ProfileMenuItemSkeleton variant="rectangular" sx={{ mb: 0.5 }} />
    <ProfileMenuItemSkeleton variant="rectangular" />
  </>
)

const ProfilesSubmenusListSuspended: FC<ProfilesSubmenusListProps> = (props) => {
  const { openSubmenu, handleCloseSubmenu, cancelLabel = 'Cancel', listMaxHeight = 300 } = props

  return (
    <Slide direction={openSubmenu ? 'left' : 'right'} in={openSubmenu} mountOnEnter unmountOnExit>
      <Box>
        <Box sx={{ p: 1 }}>
          <ButtonBase
            sx={{ p: 1, gap: 1, justifyContent: 'start', width: '100%' }}
            disableRipple
            onClick={() => handleCloseSubmenu()}
          >
            <ChevronIcon position="left" color="action" />
            {cancelLabel}
          </ButtonBase>
        </Box>
        <Divider sx={{ borderStyle: 'solid' }} />
        <Box sx={{ p: 1 }}>
          <ProfilesList disablePadding maxHeight={listMaxHeight}>
            <Suspense fallback={<LoadingState />}>
              <ProfilesSubmenusList {...props} />
            </Suspense>
          </ProfilesList>
        </Box>
      </Box>
    </Slide>
  )
}

export default ProfilesSubmenusListSuspended
