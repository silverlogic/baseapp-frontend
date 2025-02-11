'use client'

import { FC } from 'react'

import { Typography } from '@mui/material'

import IconButton from '../../buttons/IconButton'
import CloseIcon from '../../icons/CloseIcon'
import CommentReplyIcon from '../../icons/CommentReplyIcon'
import TypographyWithEllipsis from '../../typographies/TypographyWithEllipsis'
import TextareaField from '../TextareaField'
import { Container, OutsideReplyContainer, ReplyContainer } from './styled'
import { SocialTextFieldProps } from './types'

/**
 * This is a TextField component made for comments creation.
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * Developers can freely edit this to suit the project's needs.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 */
const SocialTextField: FC<SocialTextFieldProps> = ({
  children,
  isReply,
  replyTargetName,
  onCancelReply,
  ...props
}) => (
  <Container>
    {isReply && (
      <OutsideReplyContainer>
        <div className="flex w-full justify-between rounded-md bg-background-neutral px-2 py-1">
          <ReplyContainer>
            <CommentReplyIcon />
            <Typography variant="body2" color="text.secondary">
              Replying to
            </Typography>
            <TypographyWithEllipsis maxWidth={170} variant="body2" color="primary.light">
              {replyTargetName}
            </TypographyWithEllipsis>
          </ReplyContainer>
          <IconButton onClick={onCancelReply} aria-label="cancel reply">
            <CloseIcon />
          </IconButton>
        </div>
      </OutsideReplyContainer>
    )}
    <TextareaField {...props} />
    <div className="flex justify-between px-3 pb-3">{children}</div>
  </Container>
)

export default SocialTextField
