'use client'

import { FC, useEffect, useRef } from 'react'

import { setFormRelayErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import DefaultSocialInput from '../../SocialInput'
import { FORM_VALUE, VALIDATION_SCHEMA } from '../../constants'
import { useCommentUpdateMutation } from '../../graphql/mutations/CommentUpdate'
import { SocialUpsertForm } from '../../types'
import CommentUpdateSubmitActions from './CommentUpdateSubmitActions'
import { CommentUpdateProps } from './types'

const CommentUpdate: FC<CommentUpdateProps> = ({
  comment,
  onCancel,
  SocialInput = DefaultSocialInput,
  SocialInputProps = {},
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const form = useForm<SocialUpsertForm>({
    defaultValues: { body: comment.body ?? '' },
    resolver: zodResolver(VALIDATION_SCHEMA),
  })

  const [commitUpdate, isMutationInFlight] = useCommentUpdateMutation()

  const onSubmit = async (data: SocialUpsertForm) => {
    if (isMutationInFlight) return

    commitUpdate({
      variables: {
        input: {
          id: comment.id,
          body: data?.body,
        },
      },
      onCompleted: (response, errors) => {
        if (errors) {
          // TODO: handle errors
          console.error(errors)
          return
        }
        const mutationErrors = response?.commentUpdate?.errors
        setFormRelayErrors(form, mutationErrors)

        if (!mutationErrors?.length) {
          onCancel()
          form.reset()
        }
      },
      // TODO: handle errors
      onError: console.error,
    })
  }

  const handleEditCancel = () => {
    onCancel()
    form.setValue(FORM_VALUE.body, comment.body ?? '')
  }

  useEffect(() => {
    if (inputRef.current) {
      const { length } = inputRef.current.value
      inputRef.current.setSelectionRange(length, length)
      inputRef.current.focus()
    }
  }, [inputRef])

  return (
    <SocialInput
      ref={inputRef}
      submit={onSubmit}
      isLoading={isMutationInFlight}
      form={form}
      formId="comment-update"
      autoFocusInput
      SubmitActions={CommentUpdateSubmitActions}
      SubmitActionsProps={{
        handleEditCancel,
        formId: 'comment-update',
        disabled: isMutationInFlight,
      }}
      {...SocialInputProps}
    />
  )
}

export default CommentUpdate
