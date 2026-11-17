import { FC, ReactNode, useMemo } from 'react'

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
import { FormattedMessage, useIntl } from 'react-intl'
import { ConnectionHandler } from 'react-relay'
import slugify from 'slugify'

import { useOrganizationCreateMutation } from '../../../../common'
import { CREATE_PROFILE_MESSAGES as MESSAGES, getCreateProfileSchema } from './constants'
import { Form, TitleRow } from './styled'
import { CreateProfileModalProps, OrganizationCreateForm } from './types'

let nextClientMutationId = 0

const renderTermsLink = (href: string) => (chunks: ReactNode[]) => (
  <Link display="inline" href={href} target="_blank">
    {chunks}
  </Link>
)

const CreateProfileModal: FC<CreateProfileModalProps> = ({
  addNewProfileLabel,
  termsAndConditionsUrl = '',
  addNewProfileDescription,
  submitLabel,
  onClose,
  open,
  setOpen,
  userId,
}) => {
  const intl = useIntl()
  const schema = useMemo(() => getCreateProfileSchema(intl), [intl])
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
        message: intl.formatMessage(MESSAGES.urlPathTaken),
      }
    }
    if (errorMessage.includes('duplicate key') && errorMessage.includes('name')) {
      return {
        field: 'name',
        message: intl.formatMessage(MESSAGES.nameTaken),
      }
    }
    if (errorMessage.includes('invalid') && errorMessage.includes('urlpath')) {
      return {
        field: 'urlPath',
        message: intl.formatMessage(MESSAGES.urlPathInvalid),
      }
    }
    return {
      field: 'root',
      message: intl.formatMessage(MESSAGES.createFailed),
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
        <TitleRow>
          <Typography variant="h6">
            {addNewProfileLabel ?? intl.formatMessage(MESSAGES.title)}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </TitleRow>
      </DialogTitle>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          id="organization-modal-description"
        >
          <Typography color="text.secondary">
            {addNewProfileDescription ?? intl.formatMessage(MESSAGES.description)}
          </Typography>

          {form.formState.errors.root && (
            <Alert severity="error" onClose={() => form.clearErrors('root')}>
              {form.formState.errors.root.message}
            </Alert>
          )}

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label={intl.formatMessage({
                id: 'profiles.createProfile.name',
                defaultMessage: 'Name',
              })}
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
            <TextField
              label={intl.formatMessage({
                id: 'profiles.createProfile.urlPath',
                defaultMessage: 'URL Path',
              })}
              name="urlPath"
              size="medium"
              control={form.control}
            />
            <Typography color="text.primary">
              <FormattedMessage
                id="profiles.createProfile.terms"
                defaultMessage="Upon confirming, you agree to our <link>Terms and Conditions.</link>"
                values={{ link: renderTermsLink(termsAndConditionsUrl) }}
              />
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="inherit" onClick={handleClose} sx={{ width: 'auto' }}>
            <FormattedMessage id="common.cancel" defaultMessage="Cancel" />
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
            {submitLabel ?? intl.formatMessage(MESSAGES.submit)}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export default CreateProfileModal
