import { FC } from 'react'

import { CircledAvatar } from '@baseapp-frontend/design-system/components/web/avatars'
import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import {
  NewGroupIcon,
  ProfileNoCircleIcon,
} from '@baseapp-frontend/design-system/components/web/icons'
import { TypographyWithEllipsis } from '@baseapp-frontend/design-system/components/web/typographies'

import { Box, Divider, Typography } from '@mui/material'

import { formatHandle } from '../../../../__shared__/common/utils'
import { useSingleChatDetails } from '../../../common'
import {
  ButtonContainer,
  HeaderContainer,
  Subheader,
  SubheaderContainer,
  TitleContainer,
} from './styled'
import { BodyProps } from './types'

const Body: FC<BodyProps> = ({ avatarSize = 144, chatRoomRef }) => {
  const { title, image, username, biography, id } = useSingleChatDetails(chatRoomRef)

  const profilePath = username ?? (id ? `/profile/${id}` : undefined)

  return (
    <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <HeaderContainer>
        <CircledAvatar src={image} width={avatarSize} height={avatarSize} hasError={false} />
        <TitleContainer>
          <TypographyWithEllipsis variant="subtitle1" color="text.primary">
            {title}
          </TypographyWithEllipsis>
          {username && (
            <TypographyWithEllipsis variant="body2" color="text.secondary">
              {formatHandle(username)}
            </TypographyWithEllipsis>
          )}
        </TitleContainer>
      </HeaderContainer>
      <SubheaderContainer>
        <ButtonContainer>
          <IconButton
            size="small"
            aria-label="go to profile"
            onClick={() => window.open(profilePath, '_blank', 'noopener,noreferrer')}
            disabled={!profilePath}
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
            {biography?.split('\n').map((line, index, lines) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < lines.length - 1 && <br />}
              </span>
            ))}
          </Typography>
        </Subheader>
      </SubheaderContainer>
    </Box>
  )
}

export default Body
