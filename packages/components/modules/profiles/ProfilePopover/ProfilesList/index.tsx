'use client'

import { FC, Suspense } from 'react'

import { ChevronIcon } from '@baseapp-frontend/design-system'
import { useNotification } from '@baseapp-frontend/utils'

import { Box, ButtonBase, Divider, Slide } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { ProfileItemInlineFragment$data } from '../../../../__generated__/ProfileItemInlineFragment.graphql'
import { ProfilesListQuery as ProfilesListQueryType } from '../../../../__generated__/ProfilesListQuery.graphql'
import { ProfilesListQuery } from '../../graphql/queries/ProfilesList'
import useCurrentProfile, { getMinimalProfile } from '../../useCurrentProfile'
import LoadingState from './LoadingState'
import ProfileMenuItem from './ProfileMenuItem'
import { CancelMenuItem, StyledList } from './styled'
import { ProfilesListProps } from './types'

const ProfilesList: FC<ProfilesListProps> = ({ handleCloseSubmenu, MenuItemProps }) => {
  const { me } = useLazyLoadQuery<ProfilesListQueryType>(ProfilesListQuery, {})
  const { sendToast } = useNotification()
  const { currentProfile, setCurrentProfile } = useCurrentProfile()

  const handleProfileChange = (profile: ProfileItemInlineFragment$data) => {
    if (currentProfile?.id !== profile.id) {
      setCurrentProfile(getMinimalProfile(profile))
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
        onProfileChange={handleProfileChange}
        {...MenuItemProps}
      />
    )
  })
}

const ProfilesListSuspended: FC<ProfilesListProps> = (props) => {
  const { openSubmenu, handleCloseSubmenu, cancelLabel = 'Cancel', listMaxHeight = 300 } = props

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
          <StyledList
            disablePadding
            maxHeight={listMaxHeight}
            aria-label="List of available profiles"
          >
            <Suspense fallback={<LoadingState />}>
              <ProfilesList {...props} />
            </Suspense>
          </StyledList>
        </Box>
      </Box>
    </Slide>
  )
}

export default ProfilesListSuspended
