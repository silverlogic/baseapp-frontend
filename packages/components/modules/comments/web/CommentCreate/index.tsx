'use client'

import { forwardRef, useMemo } from 'react'

import { SocialUpsertForm } from '../../../__shared__/common'
import {
  SocialInput as DefaultSocialInput,
  useFormMentions,
  withMentionsInSocialInputProps,
} from '../../../__shared__/web'
import { useCommentCreateForm, useCommentReply } from '../../common'
import { CommentCreateProps } from './types'

/**
 * ### CommentCreate Component
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 *
 * This component reuses the `SocialInput` component, adding the platform UI around the shared
 * `useCommentCreateForm` hook, which owns the `GraphQL` mutation and `form` setup for creating
 * comments (validated with `react-hook-form` + Zod) and tracks the comment being replied to via
 * the `useCommentReply` context.
 *
 * To enable @-mention tagging, pass `mentionsController` from a consumer-side hook (e.g.
 * `useProfileMentionSearch()`). The controller owns search state, debouncing, and pagination.
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
    {
      targetObjectId,
      autoFocusInput,
      SocialInput = DefaultSocialInput,
      SocialInputProps = {},
      mentionsController,
      disableMentions = true,
    },
    ref,
  ) => {
    const commentReply = useCommentReply<HTMLDivElement>()

    const { form, submit, isLoading, isReply, replyTargetName, cancelReply } = useCommentCreateForm(
      {
        targetObjectId,
        onSuccess: () => {
          if (commentReply.commentItemRef?.current) {
            commentReply.commentItemRef.current.scrollIntoView({
              block: 'nearest',
              inline: 'start',
              behavior: 'smooth',
            })
          }
        },
      },
    )
    const { setValue } = form

    const { mentions, isMentionsActive } = useFormMentions<SocialUpsertForm>({
      setValue,
      controller: mentionsController,
      disabled: disableMentions,
    })

    const mergedSocialInputProps = useMemo(
      () => withMentionsInSocialInputProps(SocialInputProps, mentions),
      [SocialInputProps, mentions],
    )

    return (
      <SocialInput
        ref={ref}
        placeholder="Comment..."
        autoFocusInput={autoFocusInput}
        form={form}
        formId="comment-create"
        submit={(data: SocialUpsertForm) => submit(data, { includeMentions: isMentionsActive })}
        isLoading={isLoading}
        isReply={isReply}
        replyTargetName={replyTargetName}
        onCancelReply={cancelReply}
        SubmitActionsProps={{
          ariaLabel: 'create comment',
        }}
        {...mergedSocialInputProps}
      />
    )
  },
)

export default CommentCreate
