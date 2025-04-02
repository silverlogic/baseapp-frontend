'use client'

import { FC } from 'react'

import { CircledAvatar } from '@baseapp-frontend/design-system/components/web/avatars'
import { TypographyWithEllipsis } from '@baseapp-frontend/design-system/components/web/typographies'

import { Box, Typography, useTheme } from '@mui/material'

import { getParticipantCountString } from '../../../common'
import { GroupHeaderContainer, GroupTitleContainer, MembersContainer } from './styled'
import { BodyProps } from './types'

const Body: FC<BodyProps> = ({
  avatar,
  avatarSize = 144,
  children,
  participantsCount,
  participantsCountStyle = {},
  title,
  titleProps = {},
}) => {
  const theme = useTheme()

  return (
    <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <GroupHeaderContainer>
        <CircledAvatar src={avatar} width={avatarSize} height={avatarSize} hasError={false} />
        <GroupTitleContainer>
          <TypographyWithEllipsis variant="subtitle1" color="text.primary" {...titleProps}>
            {title}
          </TypographyWithEllipsis>
          <Typography variant="body2" color="text.secondary" {...participantsCountStyle}>
            {getParticipantCountString(participantsCount)}
          </Typography>
        </GroupTitleContainer>
      </GroupHeaderContainer>
      <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
        <Box role="list" aria-label="group members">
          <Typography
            variant="subtitle2"
            color="text.primary"
            sx={{
              padding: theme.spacing(2),
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            Members
          </Typography>
        </Box>
        <MembersContainer>{children}</MembersContainer>
      </Box>
    </Box>
  )
}

export default Body
