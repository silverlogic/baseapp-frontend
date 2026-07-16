'use client'

import { FC, useEffect, useMemo, useRef } from 'react'

import { SocialUpsertForm } from '../../../__shared__/common'
import {
  SocialInput as DefaultSocialInput,
  UpdateSubmitActions,
  useFormMentions,
  withMentionsInSocialInputProps,
} from '../../../__shared__/web'
import { toCommentEditTarget, useCommentUpdateForm } from '../../common'
import { CommentUpdateProps } from './types'

/**
 * ### CommentUpdate Component
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 *
 * This component reuses the `SocialInput` component, adding the platform UI around the shared
 * `useCommentUpdateForm` hook, which owns the `GraphQL` mutation and `form` setup for updating
 * comments (validated with `react-hook-form` + Zod).
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
 * import { useMyCustomUpdateMutation } from './myCustomMutation';
 * import SocialInput from './SocialInput';
 *
 * const MyCustomCommentUpdate = ({ comment, onCancel }) => {
 *   const form = useForm({
 *     resolver: zodResolver(myCustomSchema),
 *     defaultValues: { body: comment.body ?? '' },
 *   });
 *   const [commitUpdate, isMutationInFlight] = useMyCustomUpdateMutation();
 *
 *   const onSubmit = (data) => {
 *     commitUpdate({
 *       variables: { input: { id: comment.id, body: data.body } },
 *       onCompleted: (response) => {
 *         // handle response
 *         form.reset();
 *         onCancel();
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
 *       SubmitActions={UpdateSubmitActions}
 *     />
 *   );
 * };
 * ```
 */
const CommentUpdate: FC<CommentUpdateProps> = ({
  comment,
  onCancel,
  SocialInput = DefaultSocialInput,
  SocialInputProps = {},
  mentionsController,
  disableMentions = true,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const target = useMemo(() => toCommentEditTarget(comment), [comment])

  const { form, submit, isLoading, cancel } = useCommentUpdateForm({
    target,
    onClose: onCancel,
  })
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

  useEffect(() => {
    if (inputRef.current) {
      const { length } = inputRef.current.value
      inputRef.current.setSelectionRange(length, length)
      inputRef.current.focus()
    }
  }, [inputRef])

  return (
    <SocialInput
      ref={inputRef}
      submit={(data: SocialUpsertForm) => submit(data, { includeMentions: isMentionsActive })}
      isLoading={isLoading}
      form={form}
      formId="comment-update"
      autoFocusInput
      SubmitActions={UpdateSubmitActions}
      SubmitActionsProps={{
        handleEditCancel: cancel,
        formId: 'comment-update',
        disabled: isLoading,
      }}
      {...mergedSocialInputProps}
    />
  )
}

export default CommentUpdate
