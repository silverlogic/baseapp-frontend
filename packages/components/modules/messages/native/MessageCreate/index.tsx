import { forwardRef } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { MESSAGE_TYPE, useSendMessageMutation } from '@baseapp-frontend/components/messages/common'
import { setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TextInput as NativeTextInput } from 'react-native'
import { ConnectionHandler } from 'react-relay'

import { SocialUpsertForm } from '../../../__shared__/common'
import {
  DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
  SOCIAL_UPSERT_FORM,
  SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA,
} from '../../../__shared__/common/constants'
import DefaultSocialInputDrawer from '../SocialInputDrawer'
import { CommentCreateProps } from './types'

let nextClientMutationId = 0

const MessageCreate = forwardRef<NativeTextInput, CommentCreateProps>(
  (
    {
      drawerStyle = {},
      targetObjectId,
      SocialInputDrawer = DefaultSocialInputDrawer,
      SocialInputDrawerProps = { DrawerProps: {}, PlaceholderProps: {} },
    },
    ref,
  ) => {
    const { currentProfile } = useCurrentProfile()
    const { sendToast } = useNotification()

    const form = useForm<SocialUpsertForm>({
      defaultValues: DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
      resolver: zodResolver(SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA),
    })
    const [commitMutation, isMutationInFlight] = useSendMessageMutation()
    const body = form.watch(SOCIAL_UPSERT_FORM.body)

    const { onFocusChange, textHeight, onTextHeightChange, keyboardHeight } =
      SocialInputDrawer.useTextInputProperties()
    const showHandle = false
    if (!targetObjectId) {
      return null
    }

    const onSubmit = () => {
      if (isMutationInFlight || !currentProfile || !body) return

      nextClientMutationId += 1
      const clientMutationId = nextClientMutationId.toString()

      const connectionID = ConnectionHandler.getConnectionID(targetObjectId, 'chatRoom_allMessages')
      const content = body

      commitMutation({
        variables: {
          input: {
            content,
            profileId: currentProfile.id,
            roomId: targetObjectId,
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
                pk: 0, // This property is required, so we need to provide something to keep typescript happy
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
            sendToast('Your last message could not be sent. Please try again.', { type: 'error' })
          }
          const mutationErrors = response?.chatRoomSendMessage?.errors

          if (mutationErrors && mutationErrors.length > 0) {
            setFormRelayErrors(form, mutationErrors)
            sendToast('Your last message could not be sent. Please try again.', { type: 'error' })
          }
        },
        onError: () => {
          sendToast('Your last message could not be sent. Please try again.', { type: 'error' })
        },
      })
      form.reset()
    }

    return (
      <>
        <SocialInputDrawer.Placeholder
          keyboardHeight={keyboardHeight}
          showHandle={showHandle}
          textHeight={textHeight}
        />
        <SocialInputDrawer.Drawer
          form={form}
          isLoading={isMutationInFlight}
          keyboardHeight={keyboardHeight}
          onFocusChange={onFocusChange}
          onTextHeightChange={onTextHeightChange}
          showHandle={showHandle}
          ref={ref}
          style={drawerStyle}
          submit={onSubmit}
          {...SocialInputDrawerProps.DrawerProps}
        />
      </>
    )
  },
)

export default MessageCreate
