import { forwardRef, useEffect, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { useSocialTextInput } from '@baseapp-frontend/design-system/components/native/inputs'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { setFormRelayErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Dimensions,
  Keyboard,
  KeyboardEvent,
  TextInput as NativeTextInput,
  Platform,
  ScrollView,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
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
      SocialInputDrawerProps = {},
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
    const { textHeight, isFocused } = useSocialTextInput()
    const showHandle = isFocused || body !== ''

    const [keyboardHeight, setKeyboardHeight] = useState(0)
    const insets = useSafeAreaInsets()
    useEffect(() => {
      const onKeyboardShow = (e: KeyboardEvent) => {
        const screenHeight = Dimensions.get('screen').height
        const safeHeight = screenHeight - insets.bottom
        const newKeyboardHeight = safeHeight - e.endCoordinates.screenY
        setKeyboardHeight(newKeyboardHeight)
      }

      const onKeyboardHide = () => {
        setKeyboardHeight(0)
      }

      const isAndroid = Platform.OS === 'android'
      const showListener = isAndroid
        ? Keyboard.addListener('keyboardDidShow', onKeyboardShow)
        : Keyboard.addListener('keyboardWillShow', onKeyboardShow)
      const hideListener = isAndroid
        ? Keyboard.addListener('keyboardDidHide', onKeyboardHide)
        : Keyboard.addListener('keyboardWillHide', onKeyboardHide)

      return () => {
        showListener.remove()
        hideListener.remove()
      }
    }, [insets])

    return (
      <>
        <ScrollView style={styles.contentContainer}>
          {children}
          <View
            style={{ height: (textHeight || 0) + (showHandle ? 38 : 0) + 88 + keyboardHeight }}
            // This space is taken by the social input drawer.
            // We add it here so that no scrollable content is hidden behind the social input drawer.
            // 38 is handle height (26) plus padding (12)
          />
        </ScrollView>
        <SocialInputDrawer
          form={form}
          isLoading={isMutationInFlight}
          keyboardHeight={keyboardHeight}
          showHandle={showHandle}
          ref={ref}
          style={drawerStyle}
          submit={onSubmit}
          {...SocialInputDrawerProps}
        />
      </>
    )
  },
)

export default CommentCreate
