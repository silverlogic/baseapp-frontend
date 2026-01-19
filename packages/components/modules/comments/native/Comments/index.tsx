import { FC, useCallback, useRef, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { BottomDrawer } from '@baseapp-frontend/design-system/components/native/drawers'
import {
  EditIcon,
  PinIcon,
  ShareIcon,
  TrashIcon,
} from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'
import { setFormRelayErrors } from '@baseapp-frontend/utils'

import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TextInput as NativeTextInput, Pressable, ScrollView } from 'react-native'
import { ConnectionHandler, useFragment } from 'react-relay'

import { CommentItem_comment$data } from '../../../../__generated__/CommentItem_comment.graphql'
import {
  DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
  SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA,
  SocialUpsertForm,
} from '../../../__shared__/common'
import { SocialInputDrawer as DefaultSocialInputDrawer } from '../../../__shared__/native'
import {
  CommentsFragmentQuery,
  useCommentCreateMutation,
  useCommentUpdateMutation,
} from '../../common'
import DefaultCommentsList from '../CommentsList'
import { createStyles } from './styles'
import { CommentsProps } from './types'

let nextClientMutationId = 0

const WithComments: FC<CommentsProps> = ({
  children,
  subscriptionsEnabled = true,
  target: targetRef,
  CommentsList = DefaultCommentsList,
  CommentsListProps = {},
  SocialInputDrawer = DefaultSocialInputDrawer,
  SocialInputDrawerProps = { DrawerProps: {}, PlaceholderProps: {} },
  drawerStyle = {},
}) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedComment, setSelectedComment] = useState<CommentItem_comment$data | undefined>(
    undefined,
  )

  const form = useForm<SocialUpsertForm>({
    defaultValues: DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
    resolver: zodResolver(SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA),
  })
  const { currentProfile } = useCurrentProfile()
  const target = useFragment(CommentsFragmentQuery, targetRef)
  const [commitCreateMutation, isCreateMutationInFlight] = useCommentCreateMutation()
  const [commitUpdateMutation, isUpdateMutationInFlight] = useCommentUpdateMutation()
  const theme = useTheme()
  const styles = createStyles(theme)
  const commentCreateRef = useRef<NativeTextInput>(null)
  const bottomDrawerRef = useRef<BottomSheetModal | undefined>(undefined)

  const body = form.watch('body')
  const id = form.watch('id')

  const { isFocused, onFocusChange, textHeight, onTextHeightChange, keyboardHeight } =
    SocialInputDrawer.useTextInputProperties()
  const showHandle = isFocused || body !== ''

  const handleEditCancel = () => {
    setIsEditMode(false)
    form.reset()
  }

  const editVariables = {
    isEditMode,
    label: 'Editing your comment',
    onEditCancel: handleEditCancel,
  }

  const onSubmit = () => {
    if (isCreateMutationInFlight || isUpdateMutationInFlight) return

    nextClientMutationId += 1
    const clientMutationId = nextClientMutationId.toString()

    const connectionID = ConnectionHandler.getConnectionID(target.id, 'CommentsList_comments')
    if (editVariables.isEditMode) {
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
            if (commentCreateRef && 'current' in commentCreateRef) commentCreateRef.current?.blur()
          }
        },
      })
      handleEditCancel()
      return
    }

    commitCreateMutation({
      variables: {
        input: {
          body,
          targetObjectId: target.id,
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
          if (commentCreateRef && 'current' in commentCreateRef) commentCreateRef.current?.blur()
        }
      },
      onError: console.error,
    })
  }

  const handleEdit = useCallback(
    (comment: CommentItem_comment$data) => {
      setIsEditMode(true)
      form.setValue('body', comment.body ?? '')
      form.setValue('id', comment.id ?? '')
    },
    [form],
  )

  const handleLongPress = useCallback((comment: CommentItem_comment$data) => {
    bottomDrawerRef.current?.present()
    setSelectedComment(comment)
  }, [])

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      // Sheet is closed
    }
  }, [])

  const handleMenuAction = useCallback(
    (_action: string) => {
      bottomDrawerRef.current?.close()
      if (_action === 'edit') {
        handleEdit(selectedComment as CommentItem_comment$data)
      }
      setSelectedComment(undefined)
    },
    [selectedComment, handleEdit],
  )

  if (!target.isCommentsEnabled) {
    return <View style={styles.contentContainer}>{children}</View>
  }

  return (
    <View style={[styles.rootContainer, styles.transparent]}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.transparent}>{children}</View>
        <CommentsList
          target={target}
          subscriptionsEnabled={subscriptionsEnabled}
          onLongPress={handleLongPress}
          {...CommentsListProps}
        />
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
        ref={commentCreateRef}
        style={drawerStyle}
        submit={onSubmit}
        editVariables={editVariables}
        {...SocialInputDrawerProps.DrawerProps}
      />
      {selectedComment && (
        <BottomDrawer
          bottomDrawerRef={bottomDrawerRef}
          handleSheetChanges={handleSheetChanges}
          snapPoints={['30%']}
        >
          <View style={styles.bottomDrawerActionContainer}>
            <Pressable
              onPress={() => handleMenuAction('share')}
              style={styles.bottomDrawerPressable}
            >
              <ShareIcon width={20} height={20} color={theme.colors.object.high} />
              <Text variant="body2" color="high">
                Share Comment
              </Text>
            </Pressable>
            {selectedComment.canPin && (
              <Pressable
                onPress={() => handleMenuAction('pin')}
                style={styles.bottomDrawerPressable}
              >
                <PinIcon width={20} height={20} color={theme.colors.object.high} />
                <Text variant="body2" color="high">
                  Pin Comment
                </Text>
              </Pressable>
            )}
            {selectedComment.canChange && (
              <Pressable
                onPress={() => handleMenuAction('edit')}
                style={styles.bottomDrawerPressable}
              >
                <EditIcon width={20} height={20} color={theme.colors.object.high} />
                <Text variant="body2" color="high">
                  Edit Comment
                </Text>
              </Pressable>
            )}
          </View>
          {selectedComment.canDelete && (
            <View style={styles.bottomDrawerDivider}>
              <Pressable
                onPress={() => handleMenuAction('delete')}
                style={styles.bottomDrawerPressable}
              >
                <TrashIcon width={20} height={20} color={theme.colors.error.main} />
                <Text variant="body2" style={{ color: theme.colors.error.main }}>
                  Delete Comment
                </Text>
              </Pressable>
            </View>
          )}
        </BottomDrawer>
      )}
    </View>
  )
}

export default WithComments
