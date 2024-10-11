'use client'

import { forwardRef } from 'react'

import { setFormRelayErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ConnectionHandler } from 'react-relay'

import DefaultSocialTextFieldForm from '../SocialTextFieldForm'
import { DEFAULT_FORM_VALUES, VALIDATION_SCHEMA } from '../constants'
import { useSendMessageMutation } from '../graphql/mutations/SendMessage'
import { SocialUpsertForm } from '../types'
import { SendMessageProps } from './types'

let nextClientMutationId = 0

const SendMessage = forwardRef<HTMLInputElement, SendMessageProps>(
  (
    {
      profileId,
      roomId,
      SocialTextFieldForm = DefaultSocialTextFieldForm,
      SocialTextFieldFormProps = {},
    },
    ref,
  ) => {
    // TODO: Add message reply

    const form = useForm<SocialUpsertForm>({
      defaultValues: DEFAULT_FORM_VALUES,
      resolver: zodResolver(VALIDATION_SCHEMA),
    })
    const [commitMutation, isMutationInFlight] = useSendMessageMutation()

    const onSubmit = (data: SocialUpsertForm) => {
      if (isMutationInFlight) return

      nextClientMutationId += 1
      const clientMutationId = nextClientMutationId.toString()

      const connectionID = ConnectionHandler.getConnectionID(roomId, 'chatRoom_allMessages')

      commitMutation({
        variables: {
          input: {
            content: data.body,
            profileId,
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
      <SocialTextFieldForm
        ref={ref}
        form={form}
        submit={onSubmit}
        isLoading={isMutationInFlight}
        {...SocialTextFieldFormProps}
      />
    )
  },
)

export default SendMessage
