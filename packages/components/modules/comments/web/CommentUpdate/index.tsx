'use client'

import { FC, useEffect, useMemo, useRef } from 'react'

import { FileUpload } from '@baseapp-frontend/components/files/web'
import { setFormRelayErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA, SocialUpsertForm } from '../../../__shared__/common'
import {
  SocialInput as DefaultSocialInput,
  UpdateSubmitActions,
  useFormMentions,
  withMentionsInSocialInputProps,
} from '../../../__shared__/web'
import { useCommentUpdateMutation } from '../../common'
import { CommentUpdateProps } from './types'

/**
 * ### CommentUpdate Component
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 *
 * This component reuses the `SocialInput` component, adding a layer of `GraphQL` mutation and `form` setup to handle comment updates.
 *
 * It leverages the `useCommentUpdateMutation` mutation for updating comments and integrates form validation using
 * `react-hook-form` and Zod for schema validation.
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

  const initialValues = useMemo<SocialUpsertForm>(
    () => ({
      body: comment.body ?? '',
      mentionedProfileIds:
        comment.mentions?.edges?.flatMap((edge) =>
          edge?.node?.profile?.id ? [edge.node.profile.id] : [],
        ) ?? [],
    }),
    [comment.body, comment.mentions?.edges],
  )

  const form = useForm<SocialUpsertForm>({
    defaultValues: initialValues,
    resolver: zodResolver(SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA),
  })
  const { setValue } = form

  const [commitUpdate, isMutationInFlight] = useCommentUpdateMutation()

  const { mentions, isMentionsActive } = useFormMentions<SocialUpsertForm>({
    setValue,
    controller: mentionsController,
    disabled: disableMentions,
  })

  const mergedSocialInputProps = useMemo(
    () => withMentionsInSocialInputProps(SocialInputProps, mentions),
    [SocialInputProps, mentions],
  )

  const onSubmit = async (data: SocialUpsertForm) => {
    if (isMutationInFlight) return

    commitUpdate({
      variables: {
        input: {
          id: comment.id,
          body: data?.body,
          ...(isMentionsActive && { mentionedProfileIds: data.mentionedProfileIds }),
        },
      },
      onCompleted: (response, errors) => {
        if (errors) {
          // TODO: handle errors
          console.error(errors)
          return
        }
        const mutationErrors = response?.commentUpdate?.errors
        setFormRelayErrors(form, mutationErrors)

        if (!mutationErrors?.length) {
          onCancel()
          form.reset()
        }
      },
      // TODO: handle errors
      onError: console.error,
    })
  }

  const handleEditCancel = () => {
    onCancel()
    form.reset(initialValues)
  }

  useEffect(() => {
    if (inputRef.current) {
      const { length } = inputRef.current.value
      inputRef.current.setSelectionRange(length, length)
      inputRef.current.focus()
    }
  }, [inputRef])

  return (
    <>
      <SocialInput
        ref={inputRef}
        submit={onSubmit}
        isLoading={isMutationInFlight}
        form={form}
        formId="comment-update"
        autoFocusInput
        SubmitActions={UpdateSubmitActions}
        SubmitActionsProps={{
          handleEditCancel,
          formId: 'comment-update',
          disabled: isMutationInFlight,
        }}
        {...mergedSocialInputProps}
      />
      <FileUpload
        target={comment} // Works with any FilesInterface implementer
        maxFiles={5}
        maxFileSize={100 * 1024 * 1024} // 100MB
        acceptedFileTypes={{
          'image/*': ['.png', '.jpg'],
          'application/pdf': ['.pdf'],
        }}
        autoAttach
        onUploadComplete={(fileIds) => console.log('Uploaded:', fileIds)}
      />
    </>
  )
}

export default CommentUpdate
