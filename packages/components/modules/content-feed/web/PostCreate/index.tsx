'use client'

import { FC, useCallback } from 'react'

import { setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useContentPostCreateMutation } from '../../common'
import PostForm from '../PostForm'
import {
  CONTENT_POST_CREATE_FORM_VALIDATION,
  DEFAULT_CONTENT_POST_CREATE_FORM_VALUES,
} from '../PostForm/constants'
import { ContentPostCreateForm, UploadableContentPostFiles } from '../PostForm/types'

const PostCreate: FC = () => {
  const router = useRouter()
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useContentPostCreateMutation()

  const form = useForm<ContentPostCreateForm>({
    defaultValues: DEFAULT_CONTENT_POST_CREATE_FORM_VALUES,
    resolver: zodResolver(CONTENT_POST_CREATE_FORM_VALIDATION),
    mode: 'onBlur',
  })

  const onSubmit = form.handleSubmit((data: ContentPostCreateForm) => {
    const uploadables: UploadableContentPostFiles = {}

    if (data.images) {
      data.images.forEach((image, index) => {
        uploadables[`images.${index}`] = image as File
      })
    }

    commitMutation({
      variables: {
        input: {
          content: data.content,
          isReactionsEnabled: data.isReactionsEnabled,
        },
      },
      uploadables,
      onCompleted(response) {
        const errors = response.contentPostCreate?.errors
        if (errors) {
          sendToast('Something went wrong', { type: 'error' })
          setFormRelayErrors(form, errors)
        } else {
          form.reset({ content: '', isReactionsEnabled: true })
          sendToast('Post Created Successfully', { type: 'success' })
          router.push(`/posts/${response.contentPostCreate?.contentPost?.node?.id}`)
        }
      },
    })
  })

  const onCancel = useCallback(() => {
    router.push('/posts')
  }, [router])

  return (
    <PostForm form={form} isSaving={isMutationInFlight} onSubmit={onSubmit} onCancel={onCancel} />
  )
}

export default PostCreate
