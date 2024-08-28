'use client'

import { FC, KeyboardEventHandler, useEffect, useRef } from 'react'

import {
  CheckMarkIcon,
  CloseIcon,
  CommentTextField as DefaultCommentTextField,
  IconButton,
} from '@baseapp-frontend/design-system'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { CommentUpdateInput } from '../../../__generated__/CommentUpdateMutation.graphql'
import DefaultCommentUpsertActions from '../CommentUpsertActions'
import { FORM_VALUE, VALIDATION_SCHEMA } from '../constants'
import { useCommentUpdateMutation } from '../graphql/mutations/CommentUpdate'
import { setFormRelayErrors } from '../utils'
import { CommentUpdateProps } from './types'

const CommentUpdate: FC<CommentUpdateProps> = ({
  comment,
  onCancel,
  CommentTextField = DefaultCommentTextField,
  CommentTextFieldProps,
  CommentUpsertActions = DefaultCommentUpsertActions,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const form = useForm<CommentUpdateInput>({
    defaultValues: { body: comment.body ?? '' },
    resolver: zodResolver(VALIDATION_SCHEMA),
  })

  const [commitUpdate, isMutationInFlight] = useCommentUpdateMutation()

  const onSubmit = async (data: CommentUpdateInput) => {
    if (isMutationInFlight) return null

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

    return null
  }

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      form.handleSubmit(onSubmit)(event)
    }
  }

  const handleEditCancel = () => {
    onCancel()
    form.setValue(FORM_VALUE.body, comment.body ?? '')
  }

  const isEditButtonDisabled =
    isMutationInFlight || !form.formState.isValid || !form.formState.isDirty

  useEffect(() => {
    if (inputRef.current) {
      const { length } = inputRef.current.value
      inputRef.current.setSelectionRange(length, length)
      inputRef.current.focus()
    }
  }, [inputRef])

  return (
    <form id="comment-update" onSubmit={form.handleSubmit(onSubmit)}>
      <CommentTextField
        inputRef={inputRef}
        name={FORM_VALUE.body}
        control={form.control}
        onKeyDown={handleKeyDown}
        autoFocus
        {...CommentTextFieldProps}
      >
        <CommentUpsertActions />
        <div className="grid grid-cols-[max-content_max-content] gap-2">
          <IconButton onClick={handleEditCancel} aria-label="cancel comment edit">
            <CloseIcon />
          </IconButton>
          <IconButton
            type="submit"
            form="comment-update"
            disabled={isEditButtonDisabled}
            aria-label="save comment edit"
          >
            <CheckMarkIcon />
          </IconButton>
        </div>
      </CommentTextField>
    </form>
  )
}

export default CommentUpdate
