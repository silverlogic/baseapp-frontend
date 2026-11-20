'use client'

import { FC } from 'react'

import { FormattedMessage, useIntl } from 'react-intl'

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
  ReplyBar,
} from './styled'
import { SocialTextFieldProps } from './types'
import { renderReplyingToLabel } from './utils'

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
  mode = 'rich-text',
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
  const intl = useIntl()

  const renderField = () => {
    if (mode === 'rich-text') {
      return (
        <MarkdownEditorField
          {...(props as SocialTextFieldProps['MarkdownEditorFieldProps'])}
          hasBorder={false}
          showHelperText={false}
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
          <ReplyBar>
            <ReplyContainer>
              <CommentReplyIcon />
              <FormattedMessage
                id="designSystem.socialTextField.replyingTo"
                defaultMessage="<label>Replying to</label> {name}"
                values={{
                  label: renderReplyingToLabel,
                  name: (
                    <TypographyWithEllipsis maxWidth={170} variant="body2" color="primary.light">
                      {replyTargetName}
                    </TypographyWithEllipsis>
                  ),
                }}
              />
            </ReplyContainer>
            <IconButton
              onClick={onCancelReply}
              aria-label={intl.formatMessage({
                id: 'designSystem.socialTextField.cancelReply',
                defaultMessage: 'cancel reply',
              })}
            >
              <CloseIcon />
            </IconButton>
          </ReplyBar>
        </OutsideReplyContainer>
      )}
      {renderField()}
      {children && <ActionsContainer>{children}</ActionsContainer>}
    </Container>
  )
}

export default SocialTextField
