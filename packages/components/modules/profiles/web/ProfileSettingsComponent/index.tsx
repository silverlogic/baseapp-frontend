'use client'

import { FC, useEffect, useMemo } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { CircledAvatar } from '@baseapp-frontend/design-system/components/web/avatars'
import { FileUploadButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { UsernameIcon } from '@baseapp-frontend/design-system/components/web/icons'
import {
  PhoneNumberField,
  TextField,
  TextareaField,
} from '@baseapp-frontend/design-system/components/web/inputs'
import { filterDirtyValues, setFormRelayErrors, useNotification } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '@mui/lab/LoadingButton'
import { Card, CardContent, InputAdornment, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { useFragment } from 'react-relay'

import {
  DEFAULT_BANNER_IMAGE_FORMATS,
  DEFAULT_BANNER_IMAGE_MAX_SIZE,
  DEFAULT_IMAGE_FORMATS,
  DEFAULT_IMAGE_MAX_SIZE,
  PROFILE_FORM_VALUE,
  ProfileComponentFragment,
  ProfileUpdateForm,
  UploadablesObj,
  getImageUrl,
  getProfileDefaultValues,
  useProfileMutation,
} from '../../common'
import { PROFILE_SETTINGS_MESSAGES, getProfileFormValidationSchema } from './constants'
import {
  AvatarUploadContainer,
  Banner,
  BannerButtonsContainer,
  BannerUploadContainer,
  ErrorContainer,
  FieldsContainer,
  FooterActions,
  Form,
  TwoColumnGrid,
} from './styled'
import { ProfileSettingsComponentProps } from './types'

const ProfileSettingsComponent: FC<ProfileSettingsComponentProps> = ({ profile: profileRef }) => {
  const profile = useFragment(ProfileComponentFragment, profileRef)

  const { sendToast } = useNotification()
  const { updateProfileIfActive } = useCurrentProfile()
  const intl = useIntl()
  const validationSchema = useMemo(() => getProfileFormValidationSchema(intl), [intl])

  const formReturn = useForm({
    defaultValues: getProfileDefaultValues({ profile, removeSlashInUsername: true }),
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
  })

  const {
    clearErrors,
    control,
    getFieldState,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isDirty, dirtyFields, isValid },
  } = formReturn

  const [commitMutation, isMutationInFlight] = useProfileMutation()

  const watchImage = watch(PROFILE_FORM_VALUE.image)
  const watchBannerImage = watch(PROFILE_FORM_VALUE.bannerImage)
  const imageUrl = getImageUrl(watchImage)
  const bannerImageUrl = getImageUrl(watchBannerImage)

  // To get this working in staging/prod, change NEXT_PUBLIC_REMOTE_PATTERNS_HOSTNAME to the media host being used (e.g.: digitalocean, aws, etc)
  const hasUploadedImage = imageUrl.includes(process.env.NEXT_PUBLIC_REMOTE_PATTERNS_HOSTNAME ?? '')
  const hasUploadedBannerImage = bannerImageUrl.includes(
    process.env.NEXT_PUBLIC_REMOTE_PATTERNS_HOSTNAME ?? '',
  )

  const onSubmit = async (data: ProfileUpdateForm) => {
    const dirtyValues = filterDirtyValues({ values: data, dirtyFields })
    const { id, image, bannerImage } = data
    const uploadables: UploadablesObj = {}
    if ('image' in dirtyValues && image && typeof image !== 'string') {
      uploadables.image = image
      delete dirtyValues.image
    }
    if ('bannerImage' in dirtyValues && bannerImage && typeof bannerImage !== 'string') {
      uploadables.bannerImage = bannerImage
      delete dirtyValues.bannerImage
    }

    commitMutation({
      variables: {
        input: { id, ...dirtyValues },
      },
      uploadables,
      onCompleted: (response: any) => {
        const errors = response?.profileUpdate?.errors
        if (errors) {
          sendToast(
            intl.formatMessage({
              id: 'profiles.settings.updateError',
              defaultMessage: 'Something went wrong',
            }),
            { type: 'error' },
          )
          setFormRelayErrors(formReturn, errors)
        } else {
          sendToast(
            intl.formatMessage({
              id: 'profiles.settings.updateSuccess',
              defaultMessage: 'Profile updated',
            }),
            { type: 'success' },
          )
        }
      },
    })
    reset({}, { keepValues: true })
  }

  useEffect(() => {
    if (profile) {
      const newProfile = {
        id: profile.id,
        name: profile.name ?? null,
        urlPath: profile.urlPath?.path ?? null,
        image: profile?.image ?? null,
      }
      updateProfileIfActive(newProfile)
    }
  }, [profile?.id, profile?.name, profile?.urlPath?.path, profile?.image])

  const handleRemoveImage = (type: any) => {
    clearErrors(type)
    setValue(type, null, {
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  return (
    <Card sx={{ maxWidth: '600px' }}>
      <CardContent>
        <Form
          // @ts-ignore TODO: check typing issue with zodResolver
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Typography component="h4" variant="h4" mb={1}>
              <FormattedMessage id="profiles.settings.title" defaultMessage="Profile" />
            </Typography>
            <Typography component="p" variant="body2" color="text.secondary">
              <FormattedMessage
                id="profiles.settings.subtitle"
                defaultMessage="Manage your personal information you and other people see."
              />
            </Typography>
          </div>
          <TwoColumnGrid>
            <Card variant="outlined" sx={{ boxShadow: 'none' }}>
              <CardContent>
                <AvatarUploadContainer>
                  <CircledAvatar
                    src={imageUrl}
                    width={144}
                    height={144}
                    hasError={!!getFieldState('image').error}
                    alt={intl.formatMessage({
                      id: 'profiles.settings.avatarAlt',
                      defaultMessage: 'Avatar image',
                    })}
                  />
                  {getFieldState('image').error && (
                    <ErrorContainer>
                      <Typography color="error.main" variant="caption">
                        {getFieldState('image').error!.message}
                      </Typography>
                    </ErrorContainer>
                  )}
                  <FileUploadButton
                    control={control}
                    name={PROFILE_FORM_VALUE.image ?? undefined}
                    setFile={setValue}
                    accept={DEFAULT_IMAGE_FORMATS}
                    maxSize={DEFAULT_IMAGE_MAX_SIZE}
                    label={
                      hasUploadedImage
                        ? intl.formatMessage({
                            id: 'profiles.settings.changeImage',
                            defaultMessage: 'Change Image',
                          })
                        : intl.formatMessage({
                            id: 'profiles.settings.uploadImage',
                            defaultMessage: 'Upload Image',
                          })
                    }
                  />
                  {watchImage && (
                    <LoadingButton
                      variant="text"
                      color="error"
                      loading={isMutationInFlight}
                      disabled={isMutationInFlight}
                      onClick={() => handleRemoveImage(PROFILE_FORM_VALUE.image)}
                      aria-label={intl.formatMessage({
                        id: 'profiles.settings.removeAvatarAriaLabel',
                        defaultMessage: 'Remove avatar button',
                      })}
                    >
                      {intl.formatMessage(PROFILE_SETTINGS_MESSAGES.remove)}
                    </LoadingButton>
                  )}
                </AvatarUploadContainer>
              </CardContent>
            </Card>
            <FieldsContainer>
              <TextField
                label={intl.formatMessage({ id: 'profiles.settings.name', defaultMessage: 'Name' })}
                control={control}
                name={PROFILE_FORM_VALUE.name}
                sx={{ height: 'min-content' }}
              />
              <TextField
                label={intl.formatMessage({
                  id: 'profiles.settings.username',
                  defaultMessage: 'Username',
                })}
                control={control}
                name={PROFILE_FORM_VALUE.urlPath}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <UsernameIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <PhoneNumberField
                label={intl.formatMessage({
                  id: 'profiles.settings.phoneNumber',
                  defaultMessage: 'Phone number',
                })}
                control={control}
                name={PROFILE_FORM_VALUE.phoneNumber}
              />
            </FieldsContainer>
          </TwoColumnGrid>
          <TextareaField
            label={intl.formatMessage({ id: 'profiles.settings.bio', defaultMessage: 'Bio' })}
            control={control}
            name={PROFILE_FORM_VALUE.biography}
            hideBorder={false}
          />
          <Card variant="outlined" sx={{ boxShadow: 'none' }}>
            <CardContent sx={{ padding: '16px' }}>
              <BannerUploadContainer>
                <Banner
                  src={bannerImageUrl || '/png/profile-banner-edit-page-fallback.png'}
                  fallbackSrc="/png/profile-banner-edit-page-fallback.png"
                  alt={intl.formatMessage({
                    id: 'profiles.profile.bannerAlt',
                    defaultMessage: 'Home Banner',
                  })}
                  width={868}
                  height={
                    290 /* Some css height: auto takes precedence,
                    so also set as style below */
                  }
                  style={{ height: '290px', objectFit: 'cover' }}
                />
                {getFieldState('bannerImage').error && (
                  <ErrorContainer>
                    <Typography color="error.main" variant="caption">
                      {getFieldState('bannerImage').error!.message}
                    </Typography>
                  </ErrorContainer>
                )}
                <BannerButtonsContainer enableRemove={!!watchBannerImage}>
                  <FileUploadButton
                    control={control}
                    name={PROFILE_FORM_VALUE.bannerImage ?? undefined}
                    setFile={setValue}
                    accept={DEFAULT_BANNER_IMAGE_FORMATS}
                    maxSize={DEFAULT_BANNER_IMAGE_MAX_SIZE}
                    label={
                      hasUploadedBannerImage
                        ? intl.formatMessage({
                            id: 'profiles.settings.changeBanner',
                            defaultMessage: 'Change Banner',
                          })
                        : intl.formatMessage({
                            id: 'profiles.settings.uploadBanner',
                            defaultMessage: 'Upload Banner',
                          })
                    }
                    sx={{ maxWidth: 'fit-content', justifySelf: 'end' }}
                  />
                  {watchBannerImage && (
                    <LoadingButton
                      variant="text"
                      color="error"
                      onClick={() => handleRemoveImage(PROFILE_FORM_VALUE.bannerImage)}
                      loading={isMutationInFlight}
                      disabled={isMutationInFlight}
                      sx={{ maxWidth: 'fit-content' }}
                      aria-label={intl.formatMessage({
                        id: 'profiles.settings.removeBannerAriaLabel',
                        defaultMessage: 'Remove banner button',
                      })}
                    >
                      {intl.formatMessage(PROFILE_SETTINGS_MESSAGES.remove)}
                    </LoadingButton>
                  )}
                </BannerButtonsContainer>
              </BannerUploadContainer>
            </CardContent>
          </Card>
          <FooterActions>
            <LoadingButton
              color="inherit"
              type="submit"
              loading={isMutationInFlight}
              disabled={!isDirty || !isValid || isMutationInFlight}
              sx={{ maxWidth: 'fit-content', justifySelf: 'end' }}
            >
              <FormattedMessage id="profiles.settings.saveChanges" defaultMessage="Save Changes" />
            </LoadingButton>
          </FooterActions>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ProfileSettingsComponent
