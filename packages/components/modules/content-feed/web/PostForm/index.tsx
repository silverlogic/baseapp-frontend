'use client'

import { FC } from 'react'

import { TextField } from '@baseapp-frontend/design-system/components/web/inputs'

import { LoadingButton } from '@mui/lab'
import { Box, Button, FormControlLabel, Switch, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

import PostImageDropzone from '../PostImageDropzone'
import { ButtonContainer, HeaderContainer, RootContainer } from '../styled'
import { PostFormProps } from './types'

const PostForm: FC<PostFormProps> = ({ form, onSubmit, onCancel, isSaving }) => {
  const isReactionsEnabled = form.watch('isReactionsEnabled')
  const {
    formState: { isDirty, isValid },
  } = form

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
              loading={isSaving}
              disabled={!isDirty || !isValid || isSaving}
              sx={{ maxWidth: 'fit-content', justifySelf: 'end' }}
            >
              Publish
            </LoadingButton>
          </ButtonContainer>
        </HeaderContainer>
        <PostImageDropzone form={form} />
        <Box>
          <TextField
            name="content"
            type="text"
            placeholder="What is on your mind?"
            multiline
            rows={4}
            control={form.control}
          />
        </Box>
        <Controller
          name="isReactionsEnabled"
          control={form.control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  {...field}
                  checked={!isReactionsEnabled}
                  onChange={(e: { target: { checked: boolean } }) =>
                    field.onChange(!e.target.checked)
                  }
                />
              }
              label="Disable Reactions to this post"
            />
          )}
        />
      </form>
    </RootContainer>
  )
}

export default PostForm
