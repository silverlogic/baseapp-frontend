import { FC, useCallback, useEffect, useRef, useTransition } from 'react'

import { View } from '@baseapp-frontend/design-system/components/native/views'

import { TextInput as NativeTextInput, ScrollView } from 'react-native'
import { useFragment } from 'react-relay'

import { SocialInputDrawer as DefaultSocialInputDrawer } from '../../../__shared__/native'
import { CommentsFragmentQuery, DEFAULT_MAX_THREAD_DEPTH, useCommentReply } from '../../common'
import DefaultCommentsList from '../CommentsList'
import CommentActionsProvider from '../context/CommentActionsProvider'
import { createStyles } from './styles'
import { BaseCommentsProps } from './types'
import useCommentComposer from './useCommentComposer'

/**
 * The assembled native comments thread WITHOUT the `CommentReplyProvider`, mirroring the web
 * `BaseComments`. Use it directly when a parent component owns the provider (and can call
 * `useCommentReply` itself); otherwise use `Comments`, which wraps it with the provider.
 */
const BaseComments: FC<BaseCommentsProps> = ({
  children,
  subscriptionsEnabled = true,
  target: targetRef,
  CommentsList = DefaultCommentsList,
  CommentsListProps = {},
  SocialInputDrawer = DefaultSocialInputDrawer,
  SocialInputDrawerProps = { DrawerProps: {}, PlaceholderProps: {} },
  drawerStyle = {},
  maxThreadDepth = DEFAULT_MAX_THREAD_DEPTH,
  ListHeaderComponent,
}) => {
  const target = useFragment(CommentsFragmentQuery, targetRef)
  const styles = createStyles()
  const commentCreateRef = useRef<NativeTextInput>(null)
  const commentsListRefetchRef = useRef<(() => void) | null>(null)
  const [, startTransition] = useTransition()
  const { resetCommentReply, resetCommentEdit } = useCommentReply()

  const { isFocused, onFocusChange, textHeight, onTextHeightChange, keyboardHeight } =
    SocialInputDrawer.useTextInputProperties()

  const { form, submit, isLoading, editVariables, replyVariables } = useCommentComposer({
    targetObjectId: target.id,
    onSubmitSuccess: () => commentCreateRef.current?.blur(),
  })

  const body = form.watch('body')
  const showHandle = isFocused || body !== ''

  // Clear any pending reply/edit state when the thread unmounts (mirrors web BaseComments).
  useEffect(
    () => () => {
      resetCommentReply()
      resetCommentEdit()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const handlePinToggled = useCallback(() => {
    startTransition(() => {
      commentsListRefetchRef.current?.()
    })
  }, [startTransition])

  if (!target.isCommentsEnabled) {
    return (
      <ScrollView contentContainerStyle={styles.disabledContentContainer}>
        {ListHeaderComponent}
        {children}
      </ScrollView>
    )
  }

  return (
    <CommentActionsProvider onPinToggled={handlePinToggled}>
      <View style={[styles.rootContainer, styles.transparent]}>
        <View style={styles.contentContainer}>
          {children ? <View style={styles.transparent}>{children}</View> : null}
          <CommentsList
            target={target}
            subscriptionsEnabled={subscriptionsEnabled}
            maxThreadDepth={maxThreadDepth}
            ListHeaderComponent={ListHeaderComponent}
            onRefetchReady={(refetch) => {
              commentsListRefetchRef.current = refetch
            }}
            {...CommentsListProps}
          />
          <SocialInputDrawer.Placeholder
            keyboardHeight={keyboardHeight}
            showHandle={showHandle}
            textHeight={textHeight}
            {...SocialInputDrawerProps.PlaceholderProps}
          />
        </View>
        <SocialInputDrawer.Drawer
          form={form}
          isLoading={isLoading}
          keyboardHeight={keyboardHeight}
          onFocusChange={onFocusChange}
          onTextHeightChange={onTextHeightChange}
          showHandle={showHandle}
          ref={commentCreateRef}
          style={drawerStyle}
          submit={submit}
          editVariables={editVariables}
          replyVariables={replyVariables}
          {...SocialInputDrawerProps.DrawerProps}
        />
      </View>
    </CommentActionsProvider>
  )
}

export default BaseComments
