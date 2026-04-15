'use client'

import { FC } from 'react'

import { Typography } from '@mui/material'

import IconButton from '../../buttons/IconButton'
import CloseIcon from '../../icons/CloseIcon'
import CommentReplyIcon from '../../icons/CommentReplyIcon'
import TypographyWithEllipsis from '../../typographies/TypographyWithEllipsis'
import DefaultMarkdownEditorField from '../MarkdownEditorField'
import DefaultTextareaField from '../TextareaField'
import {
  ActionsContainer as DefaultActionsContainer,
  Container as DefaultContainer,
  OutsideReplyContainer as DefaultOutsideReplyContainer,
  ReplyContainer as DefaultReplyContainer,
} from './styled'
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
  mode = 'plain-text',
  isReply,
  replyTargetName,
  onCancelReply,
  ActionsContainer = DefaultActionsContainer,
  Container = DefaultContainer,
  OutsideReplyContainer = DefaultOutsideReplyContainer,
  ReplyContainer = DefaultReplyContainer,
  MarkdownEditorField = DefaultMarkdownEditorField,
  MarkdownEditorFieldProps,
  TextareaField = DefaultTextareaField,
  ...props
}) => {
  const renderField = () => {
    if (mode === 'rich-text') {
      return (
        <MarkdownEditorField
          {...(props as SocialTextFieldProps['MarkdownEditorFieldProps'])}
          hasBorder={false}
          {...MarkdownEditorFieldProps}
        />
      )
    }
    return <TextareaField {...props} />
  }

  return (
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
      {renderField()}
      {children && <ActionsContainer>{children}</ActionsContainer>}
    </Container>
  )
}

export default SocialTextField
