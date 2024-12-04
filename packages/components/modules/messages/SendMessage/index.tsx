'use client'

import { forwardRef } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
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
import { useSendMessageMutation } from '../graphql/mutations/SendMessage'
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
  ({ roomId, SocialInput = DefaultSocialInput, SocialInputProps = {} }, ref) => {
    const { currentProfile } = useCurrentProfile()

    const form = useForm<SocialUpsertForm>({
      defaultValues: DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
      resolver: zodResolver(SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA),
    })
    const [commitMutation, isMutationInFlight] = useSendMessageMutation()

    const onSubmit = (data: SocialUpsertForm) => {
      if (isMutationInFlight || !currentProfile) return

      nextClientMutationId += 1
      const clientMutationId = nextClientMutationId.toString()

      const connectionID = ConnectionHandler.getConnectionID(roomId, 'chatRoom_allMessages')

      commitMutation({
        variables: {
          input: {
            content: data.body,
            profileId: currentProfile?.id,
            roomId,
            clientMutationId,
          },
          connections: [connectionID],
        },
        onCompleted: (response, errors) => {
          if (errors) {
            // TODO: handle errors
            console.error(errors)
          }
          const mutationErrors = response?.chatRoomSendMessage?.errors
          setFormRelayErrors(form, mutationErrors)

          if (!mutationErrors?.length) {
            form.reset()
          }
        },
        // TODO: handle errors
        onError: console.error,
      })
    }

    return (
      <SocialInput
        ref={ref}
        form={form}
        submit={onSubmit}
        isLoading={isMutationInFlight}
        {...SocialInputProps}
      />
    )
  },
)

export default SendMessage
