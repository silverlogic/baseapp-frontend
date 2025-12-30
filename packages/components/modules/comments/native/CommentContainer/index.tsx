import { forwardRef } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { setFormRelayErrors } from '@baseapp-frontend/utils'

import { TextInput as NativeTextInput, ScrollView } from 'react-native'
import { ConnectionHandler } from 'react-relay'

import { SocialInputDrawer as DefaultSocialInputDrawer } from '../../../__shared__/native'
import { useCommentCreateMutation, useCommentUpdateMutation } from '../../common'
import { createStyles } from './styles'
import { CommentContainerProps } from './types'

let nextClientMutationId = 0

const CommentContainer = forwardRef<NativeTextInput, CommentContainerProps>(
  (
    {
      children,
      drawerStyle = {},
      targetObjectId,
      form,
      editVariables,
      SocialInputDrawer = DefaultSocialInputDrawer,
      SocialInputDrawerProps = { DrawerProps: {}, PlaceholderProps: {} },
    },
    ref,
  ) => {
    const { currentProfile } = useCurrentProfile()

    const body = form.watch('body')
    const id = form.watch('id')

    const [commitCreateMutation, isCreateMutationInFlight] = useCommentCreateMutation()
    const [commitUpdateMutation, isUpdateMutationInFlight] = useCommentUpdateMutation()
    const onSubmit = () => {
      if (isCreateMutationInFlight || isUpdateMutationInFlight) return

      nextClientMutationId += 1
      const clientMutationId = nextClientMutationId.toString()

      const connectionID = ConnectionHandler.getConnectionID(
        targetObjectId,
        'CommentsList_comments',
      )
      if (editVariables?.isEditMode) {
        commitUpdateMutation({
          variables: {
            input: {
              id: id ?? '',
              body,
            },
          },
          onCompleted: (response, errors) => {
            if (errors) {
              console.error(errors)
              return
            }
            const mutationErrors = response?.commentUpdate?.errors
            setFormRelayErrors(form, mutationErrors)
            if (!mutationErrors?.length) {
              form.reset()
              if (ref && 'current' in ref) ref.current?.blur()
            }
          },
        })
        editVariables?.onEditCancel()
        return
      }

      commitCreateMutation({
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
          isLoading={isCreateMutationInFlight || isUpdateMutationInFlight}
          keyboardHeight={keyboardHeight}
          onFocusChange={onFocusChange}
          onTextHeightChange={onTextHeightChange}
          showHandle={showHandle}
          ref={ref}
          style={drawerStyle}
          submit={onSubmit}
          editVariables={editVariables}
          {...SocialInputDrawerProps.DrawerProps}
        />
      </>
    )
  },
)

export default CommentContainer
