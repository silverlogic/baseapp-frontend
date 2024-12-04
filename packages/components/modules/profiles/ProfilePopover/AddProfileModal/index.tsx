import { FC } from 'react'

import { CloseIcon, TextField } from '@baseapp-frontend/design-system'
import { setFormRelayErrors } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import {
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

import { useOrganizationCreateMutation } from '../../graphql/mutations/OrganizationCreate'
import { schema } from './constants'
import { Form } from './styled'
import { AddProfileModalProps, OrganizationCreateForm } from './types'

let nextClientMutationId = 0

const AddProfileModal: FC<AddProfileModalProps> = ({
  addNewProfileLabel = 'New organization',
  termsAndConditionsUrl = '',
  addNewProfileDescription = 'Create an organization and invite multiple members to manage and collaborate.',
  submitLabel = 'Create Organization',
  onClose,
  open,
  setOpen,
}) => {
  const form = useForm<OrganizationCreateForm>({
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

  const onSubmit = (data: OrganizationCreateForm) => {
    if (isMutationInFlight) return

    nextClientMutationId += 1
    const clientMutationId = nextClientMutationId.toString()

    commitMutation({
      variables: {
        input: {
          name: data.name,
          urlPath: data.urlPath,
          clientMutationId,
        },
      },
      updater: (store) => {
        const payload = store.getRootField('organizationCreate')
        if (!payload) {
          return
        }
        const newEdge = payload.getLinkedRecord('profile')
        const root = store.getRoot()
        const meRecord = root?.getLinkedRecord('me')

        if (!meRecord) {
          console.error('Unable to find `me` record in the store')
          return
        }

        const connection = ConnectionHandler.getConnection(
          meRecord,
          'ProfilesListFragment_profiles',
        )

        if (!connection) {
          console.error('Unable to find connection `ProfilesListFragment_profiles` in the store')
          return
        }

        ConnectionHandler.insertEdgeBefore(connection, newEdge)
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
      onError: console.error,
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
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Name"
              name="name"
              size="medium"
              control={form.control}
              onChange={() => {
                form.trigger('name')
              }}
              onBlur={() => {
                if (!form.getValues('urlPath')) {
                  form.setValue('urlPath', slugify(form.getValues('name').toLocaleLowerCase()))
                  form.trigger('urlPath')
                }
              }}
            />
            <TextField
              label="URL Path"
              name="urlPath"
              size="medium"
              control={form.control}
              onChange={() => {
                form.trigger('urlPath')
              }}
            />
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
            disabled={isMutationInFlight || Object.keys(form.formState.errors).length > 0}
          >
            {submitLabel}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export default AddProfileModal
