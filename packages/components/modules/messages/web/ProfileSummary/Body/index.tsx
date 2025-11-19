import { FC } from 'react'

import { CircledAvatar } from '@baseapp-frontend/design-system/components/web/avatars'
import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import {
  NewGroupIcon,
  ProfileNoCircleIcon,
} from '@baseapp-frontend/design-system/components/web/icons'
import { TypographyWithEllipsis } from '@baseapp-frontend/design-system/components/web/typographies'

import { Box, Divider, Typography } from '@mui/material'

import {
  ButtonContainer,
  HeaderContainer,
  Subheader,
  SubheaderContainer,
  TitleContainer,
} from './styled'
import { BodyProps } from './types'

const Body: FC<BodyProps> = ({ avatar, avatarSize = 144, biography, username, name, pk }) => {
  const formattedUsername = username ? username.replace(/^\/+/, '') : ''
  const profilePath = username ?? `/profile/${pk}`
  return (
    <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <HeaderContainer>
        <CircledAvatar src={avatar} width={avatarSize} height={avatarSize} hasError={false} />
        <TitleContainer>
          <TypographyWithEllipsis variant="subtitle1" color="text.primary">
            {name}
          </TypographyWithEllipsis>
          <TypographyWithEllipsis variant="body2" color="text.secondary">
            {`@${formattedUsername}`}
          </TypographyWithEllipsis>
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
            aria-label="edit group chat"
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
