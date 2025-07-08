import { forwardRef } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { setFormRelayErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TextInput as NativeTextInput, ScrollView } from 'react-native'
import { ConnectionHandler } from 'react-relay'

import {
  DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
  SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA,
  SocialUpsertForm,
} from '../../../__shared__/common'
import { SocialInputDrawer as DefaultSocialInputDrawer } from '../../../__shared__/native'
import { useCommentCreateMutation } from '../../common'
import { createStyles } from './styles'
import { CommentCreateProps } from './types'

let nextClientMutationId = 0

const CommentCreate = forwardRef<NativeTextInput, CommentCreateProps>(
  (
    {
      children,
      drawerStyle = {},
      targetObjectId,
      SocialInputDrawer = DefaultSocialInputDrawer,
      SocialInputDrawerProps = { DrawerProps: {}, PlaceholderProps: {} },
    },
    ref,
  ) => {
    const { currentProfile } = useCurrentProfile()

    const form = useForm<SocialUpsertForm>({
      defaultValues: DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
      resolver: zodResolver(SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA),
    })
    const body = form.watch('body')

    const [commitMutation, isMutationInFlight] = useCommentCreateMutation()
    const onSubmit = () => {
      if (isMutationInFlight) return

      nextClientMutationId += 1
      const clientMutationId = nextClientMutationId.toString()

      const connectionID = ConnectionHandler.getConnectionID(
        targetObjectId,
        'CommentsList_comments',
      )

      commitMutation({
        variables: {
          input: {
            body,
            targetObjectId,
            profileId: currentProfile?.id,
            clientMutationId,
          },
          connections: [connectionID],
        },
        onCompleted: (response, errors) => {
          if (errors) {
            console.error(errors)
            return
          }
          const mutationErrors = response?.commentCreate?.errors
          setFormRelayErrors(form, mutationErrors)

          if (!mutationErrors?.length) {
            form.reset()
            if (ref && 'current' in ref) ref.current?.blur()
          }
        },
        onError: console.error,
      })
    }

    const styles = createStyles()
    const { isFocused, onFocusChange, textHeight, onTextHeightChange, keyboardHeight } =
      SocialInputDrawer.useTextInputProperties()
    const showHandle = isFocused || body !== ''

    return (
      <>
        <ScrollView style={styles.contentContainer}>
          {children}
          <SocialInputDrawer.Placeholder
            keyboardHeight={keyboardHeight}
            showHandle={showHandle}
            textHeight={textHeight}
            {...SocialInputDrawerProps.PlaceholderProps}
          />
        </ScrollView>
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

export default CommentCreate
