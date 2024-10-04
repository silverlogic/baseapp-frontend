'use client'

import { FC, Suspense } from 'react'

import { ChevronIcon } from '@baseapp-frontend/design-system'

import { Box, ButtonBase, Divider, List, Slide } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { ProfileItemFragment$data } from '../../../__generated__/ProfileItemFragment.graphql'
import { ProfilesListQuery as ProfilesListQueryType } from '../../../__generated__/ProfilesListQuery.graphql'
import ProfileMenuItem from '../ProfileMenuItem'
import { ProfilesListQuery } from '../graphql/queries/ProfilesList'
import useCurrentProfile from '../hooks/useCurrentProfile'
import { ProfileMenuItemSkeleton } from './styled'

// TODO: move to types.d.ts
interface ProfilesSubmenusListProps {
  openSubmenu: boolean
  handleCloseSubmenu: () => void
  cancelLabel?: string
}

const ProfilesSubmenusList: FC<ProfilesSubmenusListProps> = ({ handleCloseSubmenu }) => {
  const { me } = useLazyLoadQuery<ProfilesListQueryType>(ProfilesListQuery, {})
  const { currentProfile, setCurrentProfile } = useCurrentProfile()

  const handleProfileChange = (profile: ProfileItemFragment$data) => {
    setCurrentProfile({ profile })
    handleCloseSubmenu()
  }

  return me?.profiles?.map((profileRef, index) => {
    if (!profileRef) return null
    return (
      <ProfileMenuItem
        key={index} // eslint-disable-line react/no-array-index-key
        profileRef={profileRef}
        currentProfile={currentProfile}
        onProfileChange={handleProfileChange}
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
  const { openSubmenu, handleCloseSubmenu, cancelLabel = 'Cancel' } = props

  return (
    <Slide direction={openSubmenu ? 'left' : 'right'} in={openSubmenu} mountOnEnter unmountOnExit>
      <Box>
        <Box sx={{ p: 1 }}>
          <ButtonBase
            sx={{ p: 1, gap: 1, justifyContent: 'start', width: '100%' }}
            disableRipple
            onClick={() => handleCloseSubmenu()}
          >
            <ChevronIcon position="left" />
            {cancelLabel}
          </ButtonBase>
        </Box>
        <Divider sx={{ borderStyle: 'solid' }} />
        <Box sx={{ p: 1 }}>
          <List disablePadding>
            <Suspense fallback={<LoadingState />}>
              <ProfilesSubmenusList {...props} />
            </Suspense>
          </List>
        </Box>
      </Box>
    </Slide>
  )
}

export default ProfilesSubmenusListSuspended
