import { FC, useRef } from 'react'

import { withSocialTextInputProvider } from '@baseapp-frontend/design-system/components/native/inputs'
import { View } from '@baseapp-frontend/design-system/components/native/views'

import { TextInput as NativeTextInput } from 'react-native'
import { useFragment } from 'react-relay'

import { CommentsFragmentQuery } from '../../common'
import DefaultCommentCreate from '../CommentCreate'
import DefaultCommentsList from '../CommentsList'
import { createStyles } from './styles'
import { CommentsProps } from './types'

const WithComment: FC<CommentsProps> = ({
  children,
  subscriptionsEnabled = true,
  target: targetRef,
  CommentsList = DefaultCommentsList,
  CommentsListProps = {},
  CommentCreate = DefaultCommentCreate,
  CommentCreateProps = {},
}) => {
  const commentCreateRef = useRef<NativeTextInput>(null)
  const target = useFragment(CommentsFragmentQuery, targetRef)

  const styles = createStyles()

  if (!target.isCommentsEnabled) {
    return <View style={styles.contentContainer}>{children}</View>
  }

  return (
    <View style={[styles.rootContainer, styles.transparent]}>
      <CommentCreate ref={commentCreateRef} targetObjectId={target.id} {...CommentCreateProps}>
        <View style={styles.transparent}>{children}</View>
        <CommentsList
          target={target}
          subscriptionsEnabled={subscriptionsEnabled}
          {...CommentsListProps}
        />
      </CommentCreate>
    </View>
  )
}

export default withSocialTextInputProvider(WithComment)
