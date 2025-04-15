'use client'

import { FC, useCallback } from 'react'

import { TextField } from '@baseapp-frontend/design-system/components/web/inputs'
import { setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useContentPostCreateMutation } from '../../common/graphql/mutations/ContentPostCreate'
import ContentFeedImage from '../ContentFeedImage'
import {
  CONTENT_POST_CREATE_FORM_VALIDATION,
  DEFAULT_CONTENT_POST_CREATE_FORM_VALUES,
} from './constants'
import { ButtonContainer, HeaderContainer, RootContainer } from './styled'
import { ContentPostCreateForm, NewContentPostProps, UploadableContentPostFiles } from './types'

const NewContentPost: FC<NewContentPostProps> = () => {
  const router = useRouter()
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useContentPostCreateMutation()

  const formReturn = useForm({
    defaultValues: DEFAULT_CONTENT_POST_CREATE_FORM_VALUES,
    resolver: zodResolver(CONTENT_POST_CREATE_FORM_VALIDATION),
    mode: 'onBlur',
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = formReturn

  const onSubmit = handleSubmit((data: ContentPostCreateForm) => {
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
        },
      },
      uploadables,
      onCompleted(response) {
        const errors = response.contentPostCreate?.errors
        if (errors) {
          sendToast('Something went wrong', { type: 'error' })
          setFormRelayErrors(formReturn, errors)
        } else {
          reset({ content: '' })
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
    <RootContainer>
      <form onSubmit={onSubmit}>
        <HeaderContainer>
          <Typography component="h4" variant="h4">
            New Post
          </Typography>
          <ButtonContainer>
            <Button variant="outlined" color="inherit" onClick={onCancel} disableRipple>
              Cancel
            </Button>
            <LoadingButton
              color="inherit"
              type="submit"
              loading={isMutationInFlight}
              disabled={!isDirty || !isValid || isMutationInFlight}
              sx={{ maxWidth: 'fit-content', justifySelf: 'end' }}
            >
              Publish
            </LoadingButton>
          </ButtonContainer>
        </HeaderContainer>
        <ContentFeedImage form={formReturn} />
        <Box>
          <TextField
            name="content"
            type="text"
            placeholder="What is on your mind?"
            multiline
            rows={4}
            control={control}
          />
        </Box>
      </form>
    </RootContainer>
  )
}

export default NewContentPost
