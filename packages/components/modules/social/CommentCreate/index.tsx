'use client'

import { KeyboardEventHandler, forwardRef } from 'react'

import {
  CommentTextField as DefaultCommentTextField,
  SendMessageIcon as DefaultSendMessageIcon,
  IconButton,
} from '@baseapp-frontend/design-system'
import { setFormRelayErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ConnectionHandler } from 'react-relay'

import { CommentCreateInput } from '../../../__generated__/CommentCreateMutation.graphql'
import DefaultCommentUpsertActions from '../CommentUpsertActions'
import { DEFAULT_FORM_VALUES, FORM_VALUE, VALIDATION_SCHEMA } from '../constants'
import { useCommentReply } from '../context/comments'
import { useCommentCreateMutation } from '../graphql/mutations/CommentCreate'
import { CommentCreateProps } from './types'

let nextClientMutationId = 0

const CommentCreate = forwardRef<HTMLInputElement, CommentCreateProps>(
  (
    {
      targetObjectId,
      placeholder = 'Comment...',
      profileId,
      autoFocusInput,
      CommentTextFieldProps,
      CommentTextField = DefaultCommentTextField,
      CommentUpsertActions = DefaultCommentUpsertActions,
      SendMessageIcon = DefaultSendMessageIcon,
    },
    ref,
  ) => {
    const commentReply = useCommentReply()
    const isReply = !!commentReply.inReplyToId

    const form = useForm<CommentCreateInput>({
      defaultValues: DEFAULT_FORM_VALUES,
      resolver: zodResolver(VALIDATION_SCHEMA),
    })
    const [commitMutation, isMutationInFlight] = useCommentCreateMutation()

    const onSubmit = (data: CommentCreateInput) => {
      if (isMutationInFlight) return null

      nextClientMutationId += 1
      const clientMutationId = nextClientMutationId.toString()

      const connectionID = ConnectionHandler.getConnectionID(
        commentReply.inReplyToId ?? targetObjectId,
        'CommentsList_comments',
      )

      commitMutation({
        variables: {
          input: {
            ...data,
            targetObjectId,
            inReplyToId: commentReply.inReplyToId,
            profileObjectId: profileId,
            clientMutationId,
          },
          connections: [connectionID],
        },
        onCompleted: (response, errors) => {
          if (errors) {
            // TODO: handle errors
            console.error(errors)
            return
          }
          const mutationErrors = response?.commentCreate?.errors
          setFormRelayErrors(form, mutationErrors)

          if (!mutationErrors?.length) {
            commentReply.resetCommentReply()
            form.reset()
            if (commentReply.commentItemRef?.current) {
              commentReply.commentItemRef.current.scrollIntoView({
                block: 'nearest',
                inline: 'start',
                behavior: 'smooth',
              })
            }
          }
        },
        // TODO: handle errors
        onError: console.error,
      })

      return null
    }

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        form.handleSubmit(onSubmit)(event)
      }
    }

    const isCreateButtonDisabled = isMutationInFlight || !form.formState.isValid

    return (
      <form
        id="comment-create"
        onSubmit={form.handleSubmit(onSubmit)}
        className="sticky bottom-0 z-10 bg-common-white pb-4"
      >
        <CommentTextField
          inputRef={ref}
          name={FORM_VALUE.body}
          control={form.control}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocusInput}
          isReply={isReply}
          replyTargetName={commentReply.name}
          onCancelReply={commentReply.resetCommentReply}
          {...CommentTextFieldProps}
        >
          <CommentUpsertActions />
          <IconButton
            type="submit"
            form="comment-create"
            disabled={isCreateButtonDisabled}
            aria-label="create comment"
          >
            <SendMessageIcon />
          </IconButton>
        </CommentTextField>
      </form>
    )
  },
)

export default CommentCreate
