'use client'

import { FC, useEffect, useRef } from 'react'

import { MarkdownEditor } from '@baseapp-frontend/design-system/components/web/inputs'
import { setFormRelayErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  SOCIAL_UPSERT_FORM,
  SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA,
  SocialUpsertForm,
} from '../../../__shared__/common'
import { SocialInput as DefaultSocialInput, UpdateSubmitActions } from '../../../__shared__/web'
import { useMessageUpdateMutation } from '../../common/graphql/mutations/MessageUpdate'
import { MessageUpdateProps } from './types'

/**
 * ### MessageUpdate Component
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 *
 * This component reuses the `SocialInput` component, adding a layer of `GraphQL` mutation and `form` setup to handle message updates.
 *
 * It leverages the `useMessageUpdateMutation` mutation for updating messages and integrates form validation using
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
 * const MyCustomMessageUpdate = ({ message, onCancel }) => {
 *   const form = useForm({
 *     resolver: zodResolver(myCustomSchema),
 *     defaultValues: { body: message.content ?? '' },
 *   });
 *   const [commitUpdate, isMutationInFlight] = useMyCustomUpdateMutation();
 *
 *   const onSubmit = (data) => {
 *     commitUpdate({
 *       variables: { input: { id: message.id, content: data.body } },
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
const MessageUpdate: FC<MessageUpdateProps> = ({
  message,
  onCancel,
  SocialInput = DefaultSocialInput,
  SocialInputProps = {},
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const form = useForm<SocialUpsertForm>({
    defaultValues: { body: message.content ?? '' },
    resolver: zodResolver(SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA),
  })

  const [commitUpdate, isMutationInFlight] = useMessageUpdateMutation()

  const onSubmit = async (data: SocialUpsertForm) => {
    if (isMutationInFlight) return

    commitUpdate({
      variables: {
        input: {
          id: message.id,
          content: data?.body,
        },
      },
      onCompleted: (response, errors) => {
        if (errors) {
          // TODO: handle errors
          console.error(errors)
          return
        }
        const mutationErrors = response?.chatRoomEditMessage?.errors
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
    form.setValue(SOCIAL_UPSERT_FORM.body, message.content ?? '')
  }

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
      submit={onSubmit}
      isLoading={isMutationInFlight}
      form={form}
      formId="message-update"
      autoFocusInput
      SubmitActions={UpdateSubmitActions}
      SubmitActionsProps={{
        handleEditCancel,
        formId: 'message-update',
        disabled: isMutationInFlight,
        ariaLabel: 'save message edit',
        cancelAriaLabel: 'cancel message edit',
      }}
      SocialTextFieldProps={{
        TextField: MarkdownEditor,
      }}
      {...SocialInputProps}
    />
  )
}

export default MessageUpdate
