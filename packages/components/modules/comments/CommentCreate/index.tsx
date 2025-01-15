'use client'

import { forwardRef } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { TextareaField } from '@baseapp-frontend/design-system'
import { setFormRelayErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ConnectionHandler } from 'react-relay'

import DefaultSocialInput from '../../__shared__/SocialInput'
import {
  DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
  SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA,
} from '../../__shared__/constants'
import { SocialUpsertForm } from '../../__shared__/types'
import { useCommentReply } from '../context'
import { useCommentCreateMutation } from '../graphql/mutations/CommentCreate'
import { CommentCreateProps } from './types'

let nextClientMutationId = 0

/**
 * ### CommentCreate Component
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 *
 * This component reuses the `SocialInput` component, adding a layer of `GraphQL` mutation and `form` setup for creating comments.
 *
 * It integrates the `useCommentCreateMutation` mutation for submitting new comments and leverages `react-hook-form` and Zod for form validation.
 * Additionally, it supports replying to existing comments by utilizing the `useCommentReply` context to track the comment being replied to.
 *
 * ### Extending the Component
 * If you need to customize the form validation schema or the GraphQL query, this component serves as a base.
 * You can copy the structure and replace the query or validation logic to fit your specific requirements.
 *
 * #### Example:
 * ```ts
 * import { useForm } from 'react-hook-form';
 * import { zodResolver } from '@hookform/resolvers/zod';
 * import { myCustomSchema } from './myCustomSchema';
 * import { useMyCustomCreateMutation } from './myCustomMutation';
 * import SocialInput from './SocialInput';
 *
 * const MyCustomCommentCreate = ({ targetObjectId, profileId }) => {
 *   const form = useForm({
 *     resolver: zodResolver(myCustomSchema),
 *     defaultValues: { body: '' },
 *   });
 *   const [commitMutation, isMutationInFlight] = useMyCustomCreateMutation();
 *
 *   const onSubmit = (data) => {
 *     commitMutation({
 *       variables: { input: { body: data.body, targetObjectId, profileId } },
 *       onCompleted: (response) => {
 *         // handle response
 *         form.reset();
 *       },
 *       onError: console.error,
 *     });
 *   };
 *
 *   return (
 *     <SocialInput
 *       form={form}
 *       submit={onSubmit}
 *       isLoading={isMutationInFlight}
 *     />
 *   );
 * };
 * ```
 */
const CommentCreate = forwardRef<HTMLInputElement, CommentCreateProps>(
  (
    { targetObjectId, autoFocusInput, SocialInput = DefaultSocialInput, SocialInputProps = {} },
    ref,
  ) => {
    const { currentProfile } = useCurrentProfile()
    const commentReply = useCommentReply()
    const isReply = !!commentReply.inReplyToId

    const form = useForm<SocialUpsertForm>({
      defaultValues: DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
      resolver: zodResolver(SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA),
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
            profileId: currentProfile?.id,
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
        SocialTextFieldProps={{
          TextField: TextareaField,
        }}
        {...SocialInputProps}
      />
    )
  },
)

export default CommentCreate
