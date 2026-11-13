import { FC, useState } from 'react'

import { CircledAvatar } from '@baseapp-frontend/design-system/components/web/avatars'
import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import {
  NewGroupIcon,
  ProfileNoCircleIcon,
} from '@baseapp-frontend/design-system/components/web/icons'
import { TypographyWithEllipsis } from '@baseapp-frontend/design-system/components/web/typographies'

import { Box, Divider, Typography } from '@mui/material'
import { FormattedMessage, useIntl } from 'react-intl'

import { formatHandle } from '../../../../__shared__/common/utils'
import { useSingleChatDetails } from '../../../common'
import AddContactToGroupDialog from '../../AddContactToGroupDialog'
import { SHARED_MESSAGES } from '../../__shared__/constants'
import {
  ButtonContainer,
  HeaderContainer,
  Subheader,
  SubheaderContainer,
  TitleContainer,
} from './styled'
import { BodyProps } from './types'

const Body: FC<BodyProps> = ({ avatarSize = 144, chatRoomRef }) => {
  const intl = useIntl()
  const { title, image, username, biography, id, isDeletedUser } = useSingleChatDetails(chatRoomRef)
  const [isAddToGroupOpen, setIsAddToGroupOpen] = useState(false)

  const profilePath = username ?? (id ? `/profile/${id}` : undefined)

  return (
    <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <HeaderContainer>
        <CircledAvatar
          src={image ?? undefined}
          width={avatarSize}
          height={avatarSize}
          hasError={false}
        />
        <TitleContainer>
          <TypographyWithEllipsis variant="subtitle1" color="text.primary">
            {isDeletedUser ? intl.formatMessage(SHARED_MESSAGES.deletedUser) : title}
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
            aria-label={intl.formatMessage({
              id: 'messages.profileSummary.goToProfileAriaLabel',
              defaultMessage: 'go to profile',
            })}
            onClick={() => window.open(profilePath, '_blank', 'noopener,noreferrer')}
            disabled={!profilePath}
          >
            <ProfileNoCircleIcon sx={{ fontSize: '18px' }} />
            <Typography variant="subtitle2" color="text.primary">
              <FormattedMessage
                id="messages.profileSummary.goToProfile"
                defaultMessage="Go to profile"
              />
            </Typography>
          </IconButton>

          <IconButton
            size="small"
            aria-label={intl.formatMessage({
              id: 'messages.profileSummary.addToGroupAriaLabel',
              defaultMessage: 'add contact to a group',
            })}
            sx={{ maxWidth: 'fit-content', gap: '8px' }}
            onClick={() => setIsAddToGroupOpen(true)}
            disabled={!id}
          >
            <NewGroupIcon sx={{ fontSize: '18px', color: 'text.primary' }} />
            <Typography variant="subtitle2" color="text.primary">
              <FormattedMessage
                id="messages.profileSummary.addToGroup"
                defaultMessage="Add contact to a group"
              />
            </Typography>
          </IconButton>
        </ButtonContainer>
        {id && (
          <AddContactToGroupDialog
            contactProfileId={id}
            open={isAddToGroupOpen}
            onClose={() => setIsAddToGroupOpen(false)}
          />
        )}
        <Subheader>
          <Typography variant="subtitle2" color="text.primary">
            <FormattedMessage id="messages.profileSummary.about" defaultMessage="About" />
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
