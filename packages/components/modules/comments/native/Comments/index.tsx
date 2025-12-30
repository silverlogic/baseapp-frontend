import { FC, useRef, useState } from 'react'

import { View } from '@baseapp-frontend/design-system/components/native/views'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TextInput as NativeTextInput } from 'react-native'
import { useFragment } from 'react-relay'

import { CommentItem_comment$data } from '../../../../__generated__/CommentItem_comment.graphql'
import {
  DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
  SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA,
  SocialUpsertForm,
} from '../../../__shared__/common'
import { CommentsFragmentQuery } from '../../common'
import DefaultCommentContainer from '../CommentContainer'
import DefaultCommentsList from '../CommentsList'
import { createStyles } from './styles'
import { CommentsProps } from './types'

const WithComments: FC<CommentsProps> = ({
  children,
  subscriptionsEnabled = true,
  target: targetRef,
  CommentsList = DefaultCommentsList,
  CommentsListProps = {},
  CommentContainer = DefaultCommentContainer,
  CommentContainerProps = {},
}) => {
  const [isEditMode, setIsEditMode] = useState(false)

  const form = useForm<SocialUpsertForm>({
    defaultValues: DEFAULT_SOCIAL_UPSERT_FORM_VALUES,
    resolver: zodResolver(SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA),
  })

  const handleEdit = (comment: CommentItem_comment$data) => {
    setIsEditMode(true)
    form.setValue('body', comment.body ?? '')
    form.setValue('id', comment.id ?? '')
  }

  const handleEditCancel = () => {
    setIsEditMode(false)
    form.reset()
  }

  const commentCreateRef = useRef<NativeTextInput>(null)
  const target = useFragment(CommentsFragmentQuery, targetRef)

  const styles = createStyles()

  if (!target.isCommentsEnabled) {
    return <View style={styles.contentContainer}>{children}</View>
  }

  return (
    <View style={[styles.rootContainer, styles.transparent]}>
      <CommentContainer
        ref={commentCreateRef}
        targetObjectId={target.id}
        form={form}
        editVariables={{
          isEditMode,
          label: 'Editing your comment',
          onEditCancel: handleEditCancel,
        }}
        {...CommentContainerProps}
      >
        <View style={styles.transparent}>{children}</View>
        <CommentsList
          target={target}
          subscriptionsEnabled={subscriptionsEnabled}
          onEdit={handleEdit}
          {...CommentsListProps}
        />
      </CommentContainer>
    </View>
  )
}

export default WithComments
