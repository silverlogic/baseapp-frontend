'use client'

import { forwardRef, useMemo } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { ConnectionHandler } from 'react-relay'

import {
  DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
  SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA,
  SocialUpsertForm,
} from '../../../__shared__/common'
import {
  SocialInput as DefaultSocialInput,
  useFormMentions,
  withMentionsInSocialInputProps,
} from '../../../__shared__/web'
import { MESSAGE_TYPE, useSendMessageMutation } from '../../common'
import useMessageDraft from '../../common/useMessageDraft'
import { LOCAL_STORAGE_MESSAGE_DRAFT_STORAGE } from './constants'
import { SendMessageProps } from './types'

let nextClientMutationId = 0

/**
 * ### SendMessage Component
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 *
 * This component reuses the `SocialInput` component, adding a layer of `GraphQL` mutation and `form` setup.
 *
 * It leverages the `useSendMessageMutation` mutation for submitting messages and integrates form validation
 * using `react-hook-form` and Zod for schema validation.
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
 * import { useMyCustomMutation } from './myCustomMutation';
 * import SocialInput from './SocialInput';
 *
 * const MyCustomSendMessage = () => {
 *   const form = useForm({
 *     resolver: zodResolver(myCustomSchema),
 *     defaultValues: { body: '' },
 *   });
 *   const [commitMutation, isMutationInFlight] = useMyCustomMutation();
 *
 *   const onSubmit = (data) => {
 *     commitMutation({
 *       variables: { input: { content: data.body } },
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
const SendMessage = forwardRef<HTMLInputElement, SendMessageProps>(
  (
    { roomId, SocialInput = DefaultSocialInput, SocialInputProps = {}, disableMentions = true },
    ref,
  ) => {
    const intl = useIntl()
    const { currentProfile } = useCurrentProfile()
    const { sendToast } = useNotification()
    const sendErrorToast = () =>
      sendToast(
        intl.formatMessage({
          id: 'messages.sendMessage.errorToast',
          defaultMessage: 'Your last message could not be sent. Please try again.',
        }),
        { type: 'error' },
      )

    const form = useForm<SocialUpsertForm>({
      defaultValues: DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
      resolver: zodResolver(SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA),
    })
    const { setValue } = form
    // the unsent message is kept per room in localStorage, so it survives switching rooms and reloads
    const { clearDraft } = useMessageDraft({
      form,
      roomId,
      profileId: currentProfile?.id,
      storage: LOCAL_STORAGE_MESSAGE_DRAFT_STORAGE,
    })
    const [commitMutation, isMutationInFlight] = useSendMessageMutation()

    const { mentions } = useFormMentions<SocialUpsertForm>({
      setValue,
      disabled: disableMentions,
    })

    const mergedSocialInputProps = useMemo(
      () => withMentionsInSocialInputProps(SocialInputProps, mentions),
      [SocialInputProps, mentions],
    )

    const onSubmit = (data: SocialUpsertForm) => {
      if (isMutationInFlight || !currentProfile) return

      nextClientMutationId += 1
      const clientMutationId = nextClientMutationId.toString()

      const connectionID = ConnectionHandler.getConnectionID(roomId, 'chatRoom_allMessages')
      const content = data.body

      commitMutation({
        variables: {
          input: {
            content,
            profileId: currentProfile?.id,
            roomId,
            clientMutationId,
          },
          connections: [connectionID],
        },
        optimisticResponse: {
          chatRoomSendMessage: {
            message: {
              node: {
                id: `client:new_message:${Date.now()}`,
                content,
                created: new Date(Date.now()).toISOString(),
                deleted: false,
                extraData: null,
                messageType: MESSAGE_TYPE.user,
                inReplyTo: null,
                isRead: true,
                profile: {
                  id: currentProfile.id,
                },
                verb: 'SENT_MESSAGE',
              },
            },
            errors: [],
          },
        },
        onCompleted: (response, errors) => {
          if (errors) {
            // TODO: handle errors
            sendErrorToast()
          }
          const mutationErrors = response?.chatRoomSendMessage?.errors
          if (mutationErrors?.length) {
            setFormRelayErrors(form, mutationErrors)
            sendErrorToast()
          }
        },
        // TODO: handle errors
        onError: sendErrorToast,
      })
      form.reset()
      clearDraft()
    }

    return (
      <Box paddingRight={2}>
        <SocialInput
          ref={ref}
          form={form}
          submit={onSubmit}
          isLoading={isMutationInFlight}
          {...mergedSocialInputProps}
        />
      </Box>
    )
  },
)

export default SendMessage
