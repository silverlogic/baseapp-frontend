import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { CircledAvatar } from '@baseapp-frontend/design-system/components/web/avatars'
import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import {
  NewGroupIcon,
  ProfileNoCircleIcon,
} from '@baseapp-frontend/design-system/components/web/icons'
import { TypographyWithEllipsis } from '@baseapp-frontend/design-system/components/web/typographies'

import { Box, Divider, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileSummaryFragment$key } from '../../../../../__generated__/ProfileSummaryFragment.graphql'
import { ProfileSummaryFragment } from '../../../common/graphql/fragments/ProfileSummary'
import {
  ButtonContainer,
  HeaderContainer,
  Subheader,
  SubheaderContainer,
  TitleContainer,
} from './styled'
import { BodyProps } from './types'

const Body: FC<BodyProps> = ({ avatarSize = 144, chatRoomRef }) => {
  const { currentProfile } = useCurrentProfile()
  const profileSummary = useFragment<ProfileSummaryFragment$key>(
    ProfileSummaryFragment,
    chatRoomRef,
  )
  const getSingleChatDetails = () => {
    const details = profileSummary?.participants?.edges?.map((edge) => {
      if (edge?.node?.profile?.id !== currentProfile?.id) {
        return {
          name: edge?.node?.profile?.name,
          avatar: edge?.node?.profile?.image?.url,
          username: edge?.node?.profile?.urlPath?.path,
          biography: edge?.node?.profile?.biography,
          pk: edge?.node?.profile?.pk,
        }
      }
      return null
    })
    return details?.find((detail) => detail !== null)
  }

  const { name, avatar, username, biography, pk } = getSingleChatDetails() || {}
  const formattedUsername = username ? username.replace(/^\/+/, '') : ''
  const profilePath = username ?? (pk ? `/profile/${pk}` : undefined)

  return (
    <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <HeaderContainer>
        <CircledAvatar src={avatar} width={avatarSize} height={avatarSize} hasError={false} />
        <TitleContainer>
          <TypographyWithEllipsis variant="subtitle1" color="text.primary">
            {name}
          </TypographyWithEllipsis>
          {formattedUsername && (
            <TypographyWithEllipsis variant="body2" color="text.secondary">
              {`@${formattedUsername}`}
            </TypographyWithEllipsis>
          )}
        </TitleContainer>
      </HeaderContainer>
      <SubheaderContainer>
        <ButtonContainer>
          <IconButton
            size="small"
            aria-label="go to profile"
            onClick={() => window.open(profilePath, '_blank')}
            sx={{ maxWidth: 'fit-content', gap: '8px' }}
          >
            <ProfileNoCircleIcon sx={{ fontSize: '18px' }} />
            <Typography variant="subtitle2" color="text.primary">
              Go to profile
            </Typography>
          </IconButton>

          <IconButton
            size="small"
            aria-label="add contact to a group"
            sx={{ maxWidth: 'fit-content', gap: '8px' }}
          >
            <NewGroupIcon sx={{ fontSize: '18px', color: 'text.primary' }} />
            <Typography variant="subtitle2" color="text.primary">
              Add contact to a group
            </Typography>
          </IconButton>
        </ButtonContainer>
        <Subheader>
          <Typography variant="subtitle2" color="text.primary">
            About
          </Typography>
        </Subheader>
        <Divider />
        <Subheader>
          <Typography variant="caption" color="text.secondary">
            {biography?.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < biography.split('\n').length - 1 && <br />}
              </span>
            ))}
          </Typography>
        </Subheader>
      </SubheaderContainer>
    </Box>
  )
}

export default Body
