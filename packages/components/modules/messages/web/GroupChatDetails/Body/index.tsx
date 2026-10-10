'use client'

import { FC } from 'react'

import { CircledAvatar } from '@baseapp-frontend/design-system/components/web/avatars'
import { TypographyWithEllipsis } from '@baseapp-frontend/design-system/components/web/typographies'

import { Box, Typography, useTheme } from '@mui/material'
import { useIntl } from 'react-intl'

import { SHARED_MESSAGES } from '../../__shared__/constants'
import { getParticipantCountLabel } from '../../__shared__/utils'
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
  const intl = useIntl()

  return (
    <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <GroupHeaderContainer>
        <CircledAvatar
          src={avatar ?? undefined}
          width={avatarSize}
          height={avatarSize}
          hasError={false}
        />
        <GroupTitleContainer>
          <TypographyWithEllipsis variant="subtitle1" color="text.primary" {...titleProps}>
            {title}
          </TypographyWithEllipsis>
          <Typography variant="body2" color="text.secondary" {...participantsCountStyle}>
            {getParticipantCountLabel(intl, participantsCount)}
          </Typography>
        </GroupTitleContainer>
      </GroupHeaderContainer>
      <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
        <Box>
          <Typography
            variant="subtitle2"
            color="text.primary"
            sx={{
              padding: theme.spacing(2),
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            {intl.formatMessage(SHARED_MESSAGES.members)}
          </Typography>
        </Box>
        <MembersContainer
          role="group"
          aria-label={intl.formatMessage({
            id: 'messages.groupChatDetails.membersAriaLabel',
            defaultMessage: 'group members',
          })}
        >
          {children}
        </MembersContainer>
      </Box>
    </Box>
  )
}

export default Body
