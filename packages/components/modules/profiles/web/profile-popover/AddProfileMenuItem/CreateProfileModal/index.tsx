import { FC } from 'react'

import { CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { TextField } from '@baseapp-frontend/design-system/components/web/inputs'
import { setFormRelayErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { ConnectionHandler } from 'react-relay'
import slugify from 'slugify'

import { useOrganizationCreateMutation } from '../../../../common'
import { schema } from './constants'
import { Form } from './styled'
import { CreateProfileModalProps, OrganizationCreateForm } from './types'

let nextClientMutationId = 0

const CreateProfileModal: FC<CreateProfileModalProps> = ({
  addNewProfileLabel = 'New organization',
  termsAndConditionsUrl = '',
  addNewProfileDescription = 'Create an organization and invite multiple members to manage and collaborate.',
  submitLabel = 'Create Organization',
  onClose,
  open,
  setOpen,
  userId,
}) => {
  const form = useForm<OrganizationCreateForm>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      urlPath: '',
    },
    resolver: zodResolver(schema),
  })

  const [commitMutation, isMutationInFlight] = useOrganizationCreateMutation()

  const handleClose = () => {
    setOpen(false)
    form.reset()
    onClose?.()
  }

  const parseErrorMessage = (
    error: Error,
  ): { field: 'name' | 'urlPath' | 'root'; message: string } => {
    const errorMessage = error.message.toLowerCase()

    if (errorMessage.includes('duplicate key') && errorMessage.includes('urlpath')) {
      return {
        field: 'urlPath',
        message: 'This URL path is already taken. Please choose a different one.',
      }
    }
    if (errorMessage.includes('duplicate key') && errorMessage.includes('name')) {
      return {
        field: 'name',
        message: 'An organization with this name already exists. Please choose a different name.',
      }
    }
    if (errorMessage.includes('invalid') && errorMessage.includes('urlpath')) {
      return {
        field: 'urlPath',
        message:
          'Invalid URL path format. Please use only lowercase letters, numbers, and hyphens.',
      }
    }
    return {
      field: 'root',
      message:
        'Unable to create organization. Please try again or contact support if the problem persists.',
    }
  }

  const onSubmit = (data: OrganizationCreateForm) => {
    if (isMutationInFlight) return

    nextClientMutationId += 1
    const clientMutationId = nextClientMutationId.toString()

    const connections = ConnectionHandler.getConnectionID(userId, 'ProfilesListFragment_profiles')

    commitMutation({
      variables: {
        input: {
          name: data.name,
          urlPath: data.urlPath,
          clientMutationId,
        },
        connections: [connections],
      },

      onCompleted: (response, errors) => {
        if (errors) {
          console.error(errors)
          return
        }
        const mutationErrors = response?.organizationCreate?.errors
        setFormRelayErrors(form, mutationErrors)

        if (!mutationErrors?.length) {
          handleClose()
        }
      },
      onError: (error) => {
        console.error('Organization creation error:', error)
        const { field, message } = parseErrorMessage(error)

        if (field === 'root') {
          form.setError('root', {
            type: 'manual',
            message,
          })
        } else {
          form.setError(field, {
            type: 'manual',
            message,
          })
        }
      },
    })
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="organization-modal-title"
      aria-describedby="organization-modal-description"
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 2 },
          minWidth: { xs: '100%', sm: 0 },
          margin: { xs: 0, sm: 2 },
          maxWidth: { sm: 366 },
          height: { xs: '100%', sm: 'auto' },
          minHeight: { xs: '100%', sm: 'auto' },
        },
      }}
    >
      <DialogTitle id="organization-modal-title">
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}
        >
          <Typography variant="h6">{addNewProfileLabel}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          id="organization-modal-description"
        >
          <Typography color="text.secondary">{addNewProfileDescription}</Typography>

          {form.formState.errors.root && (
            <Alert severity="error" onClose={() => form.clearErrors('root')}>
              {form.formState.errors.root.message}
            </Alert>
          )}

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Name"
              name="name"
              size="medium"
              control={form.control}
              onBlur={() => {
                if (!form.getValues('urlPath')) {
                  form.setValue('urlPath', slugify(form.getValues('name').toLocaleLowerCase()))
                  form.trigger('urlPath')
                }
              }}
            />
            <TextField label="URL Path" name="urlPath" size="medium" control={form.control} />
            <Typography color="text.primary">
              Upon confirming, you agree to our{' '}
              <Link display="inline" href={termsAndConditionsUrl} target="_blank">
                Terms and Conditions.
              </Link>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="inherit" onClick={handleClose} sx={{ width: 'auto' }}>
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            color="inherit"
            sx={{ width: 'auto' }}
            type="submit"
            loading={isMutationInFlight}
            disabled={
              isMutationInFlight ||
              Object.keys(form.formState.errors).length > 0 ||
              !form.formState.isValid
            }
          >
            {submitLabel}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export default CreateProfileModal
