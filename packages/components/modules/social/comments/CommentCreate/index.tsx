'use client'

import { forwardRef } from 'react'

import { setFormRelayErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ConnectionHandler } from 'react-relay'

import DefaultSocialInput from '../../SocialInput'
import { DEFAULT_FORM_VALUES, VALIDATION_SCHEMA } from '../../constants'
import { useCommentCreateMutation } from '../../graphql/mutations/CommentCreate'
import { SocialUpsertForm } from '../../types'
import { useCommentReply } from '../context'
import { CommentCreateProps } from './types'

let nextClientMutationId = 0

const CommentCreate = forwardRef<HTMLInputElement, CommentCreateProps>(
  (
    {
      targetObjectId,
      profileId,
      autoFocusInput,
      SocialInput = DefaultSocialInput,
      SocialInputProps = {},
    },
    ref,
  ) => {
    const commentReply = useCommentReply()
    const isReply = !!commentReply.inReplyToId

    const form = useForm<SocialUpsertForm>({
      defaultValues: DEFAULT_FORM_VALUES,
      resolver: zodResolver(VALIDATION_SCHEMA),
    })
    const [commitMutation, isMutationInFlight] = useCommentCreateMutation()

    const onSubmit = (data: SocialUpsertForm) => {
      if (isMutationInFlight) return

      nextClientMutationId += 1
      const clientMutationId = nextClientMutationId.toString()

      const connectionID = ConnectionHandler.getConnectionID(
        commentReply.inReplyToId ?? targetObjectId,
        'CommentsList_comments',
      )

      commitMutation({
        variables: {
          input: {
            body: data.body,
            targetObjectId,
            inReplyToId: commentReply.inReplyToId,
            profileId,
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
    }

    return (
      <SocialInput
        ref={ref}
        placeholder="Comment..."
        autoFocusInput={autoFocusInput}
        form={form}
        formId="comment-create"
        submit={onSubmit}
        isLoading={isMutationInFlight}
        isReply={isReply}
        replyTargetName={commentReply.name}
        onCancelReply={commentReply.resetCommentReply}
        SubmitActionsProps={{
          ariaLabel: 'create comment',
        }}
        {...SocialInputProps}
      />
    )
  },
)

export default CommentCreate
